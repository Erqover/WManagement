const express = require('express');
const fs = require('fs/promises');
const path = require('path');


const router = express.Router();

//ustawienie sciezki do pliku json z danymi zapisu
const SAVES_PATH = path.join(__dirname, '../../data/saves.json');

//funkcja pomocnicza do odczytu pliku
const readSaves = async () => {
    const data = await fs.readFile(SAVES_PATH, 'utf-8');
    return JSON.parse(data);
}

//funkcja do zapisu pliku save'ow
const writeSaves = async (data) => {
    await fs.writeFile(SAVES_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

//pobieramy polaczenie z baza
//const db = require('../db');

//pobranie wszystkich slotów - GET /api/saves
router.get('/', async (req, res) => {
    try {
        const saves = await readSaves();
        res.json(saves);
    } catch (err) {
        res.status(500).json({ error: "Nie udało się odczytać zapisów" });
    }
});

//POST /api/saves/new - utworzenie / nadpisanie zapisu w slocie

router.post('/new', async (req, res) => {
    console.log(SAVES_PATH);
    try {
        const slot_id = req.body.slot_id
        const save_data = req.body.save_data;

        const saves = await readSaves();
        const slotIndex = saves.findIndex((s) => s.slot_id === Number(slot_id));

        if (slotIndex === -1) {
            return res.status(404).json({ error: "Nieprawidłowy slot" });
        }

        saves[slotIndex] = {
            ...saves[slotIndex],
            save_data: save_data,
            updated_at: new Date().toISOString()
        };
        await writeSaves(saves);
        console.log('[DEBUG] Zapisano slot:', saves[slotIndex]);
        res.json(saves[slotIndex]);
    } catch (err) {
        res.status(500).json({ error: "Bład podczas zapisywania danych" });
    }
});


//usunięcie save-a   DELETE /api/saves/:id
router.delete('/:id', async (req, res) => {
    try {
        const slotId = Number(req.params.id);
        const saves = await readSaves();
        const slotIndex = saves.findIndex((s) => s.slot_id === slotId);

        if (slotIndex === -1) {
            return res.status(404).json({ error: "Nieprawidłowy slot" });
        }

        //resetujemy dane w slocie
        saves[slotIndex] = {
            slot_id: slotId,
            save_data: { day: 1, money: 0, unlocked_tools: [] },
            updated_at: null
        };

        await writeSaves(saves);
        res.json({ message: 'Zapis usuniety pomyslnie', slot: saves[slotIndex] });
    } catch (err) {
        res.status(500).json({ error: "Bład podczas usuwania danych" });
    }

});

module.exports = router;
