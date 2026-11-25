const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const router = express.Router();

// Ustawienie ścieżki do pliku json z danymi zapisu
const SAVES_PATH = path.join(__dirname, '../../data/saves.json');

// Klucz podpisu sumy kontrolnej (można nadpisać zmienną środowiskową SAVE_CHECKSUM_SECRET)
const CHECKSUM_SECRET = process.env.SAVE_CHECKSUM_SECRET || 'chemzero-hazmat-integrity-key-v1';

// Deterministyczna serializacja obiektu (sortowanie kluczy)
const canonicalStringify = (value) => {
    if (value === null || typeof value !== 'object') {
        return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
        return `[${value.map(canonicalStringify).join(',')}]`;
    }
    const sortedKeys = Object.keys(value).sort();
    const entries = sortedKeys.map(
        (key) => `${JSON.stringify(key)}:${canonicalStringify(value[key])}`
    );
    return `{${entries.join(',')}}`;
};

// Obliczanie sumy kontrolnej HMAC-SHA256 dla slotu
const calculateSaveChecksum = ({ slot_id, save_data, updated_at }) => {
    const payload = canonicalStringify({
        slot_id: Number(slot_id),
        save_data,
        updated_at,
    });

    return crypto
        .createHmac('sha256', CHECKSUM_SECRET)
        .update(payload, 'utf8')
        .digest('hex');
};

// Weryfikacja sumy kontrolnej przy ładowaniu zapisu
const verifySaveChecksum = (slot) => {
    // Pusty / zresetowany slot nie posiada jeszcze zapisanego stanu gry
    if (!slot || !slot.updated_at) {
        return true;
    }

    if (typeof slot.checksum !== 'string' || slot.checksum.length !== 64) {
        return false;
    }

    const expectedChecksum = calculateSaveChecksum(slot);
    const actualBuffer = Buffer.from(slot.checksum, 'hex');
    const expectedBuffer = Buffer.from(expectedChecksum, 'hex');

    if (actualBuffer.length !== expectedBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
};

// Funkcja pomocnicza do odczytu pliku
const readSaves = async () => {
    const data = await fs.readFile(SAVES_PATH, 'utf-8');
    return JSON.parse(data);
};

// Funkcja do zapisu pliku save'ów
const writeSaves = async (data) => {
    await fs.writeFile(SAVES_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// Pobranie wszystkich slotów wraz z weryfikacją sumy kontrolnej - GET /api/saves
router.get('/', async (req, res) => {
    try {
        const saves = await readSaves();
        const verifiedSaves = saves.map((slot) => {
            const isValid = verifySaveChecksum(slot);
            if (!isValid) {
                console.warn(`[WARN] Wykryto niezgodność sumy kontrolnej w slocie ${slot.slot_id}`);
            }
            return {
                ...slot,
                is_valid: isValid,
            };
        });
        res.json(verifiedSaves);
    } catch (err) {
        res.status(500).json({ error: 'Nie udało się odczytać zapisów' });
    }
});

// Pobranie konkretnego slotu z blokadą w przypadku błędnej sumy - GET /api/saves/:id
router.get('/:id', async (req, res) => {
    try {
        const slotId = Number(req.params.id);
        const saves = await readSaves();
        const slot = saves.find((s) => s.slot_id === slotId);

        if (!slot) {
            return res.status(404).json({ error: 'Nieprawidłowy slot' });
        }

        if (!verifySaveChecksum(slot)) {
            return res.status(422).json({
                error: 'Nieprawidłowa suma kontrolna zapisu — plik został zmodyfikowany lub uszkodzony',
                slot_id: slotId,
                is_valid: false,
            });
        }

        res.json({ ...slot, is_valid: true });
    } catch (err) {
        res.status(500).json({ error: 'Nie udało się odczytać zapisu' });
    }
});

// POST /api/saves/new - utworzenie / nadpisanie zapisu w slocie z obliczeniem sumy kontrolnej
router.post('/new', async (req, res) => {
    try {
        const slot_id = Number(req.body.slot_id);
        const save_data = req.body.save_data;

        if (!save_data || typeof save_data !== 'object') {
            return res.status(400).json({ error: 'Nieprawidłowe dane zapisu' });
        }

        const saves = await readSaves();
        const slotIndex = saves.findIndex((s) => s.slot_id === slot_id);

        if (slotIndex === -1) {
            return res.status(404).json({ error: 'Nieprawidłowy slot' });
        }

        const updated_at = new Date().toISOString();
        const checksum = calculateSaveChecksum({
            slot_id,
            save_data,
            updated_at,
        });

        saves[slotIndex] = {
            ...saves[slotIndex],
            slot_id,
            save_data,
            updated_at,
            checksum,
        };

        await writeSaves(saves);
        console.log('[DEBUG] Zapisano slot z sumą kontrolną:', saves[slotIndex]);
        res.json({ ...saves[slotIndex], is_valid: true });
    } catch (err) {
        res.status(500).json({ error: 'Błąd podczas zapisywania danych' });
    }
});

// Usunięcie save'a - DELETE /api/saves/:id
router.delete('/:id', async (req, res) => {
    try {
        const slotId = Number(req.params.id);
        const saves = await readSaves();
        const slotIndex = saves.findIndex((s) => s.slot_id === slotId);

        if (slotIndex === -1) {
            return res.status(404).json({ error: 'Nieprawidłowy slot' });
        }

        // Resetujemy dane w slocie oraz zerujemy sumę kontrolną
        saves[slotIndex] = {
            slot_id: slotId,
            save_data: { day: 1, money: 0, unlocked_tools: [] },
            updated_at: null,
            checksum: null,
        };

        await writeSaves(saves);
        res.json({
            message: 'Zapis usunięty pomyślnie',
            slot: { ...saves[slotIndex], is_valid: true },
        });
    } catch (err) {
        res.status(500).json({ error: 'Błąd podczas usuwania danych' });
    }
});

module.exports = router;
