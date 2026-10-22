const express = require('express');
const router = express.Router();

//pobieramy polaczenie z baza

const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM game_saves ORDER BY slot_id ASC;'
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Blad pobierania slotow: ', err);
        res.status(500).json({ error: 'Błąd bazy danych' });
    }
});

//POST /api/saves/new

router.post('/new', async (req, res) => {
    const { slotId } = req.body;

    if (!slotId || slotId < 1 || slotId > 3) {
        return res
            .status(400)
            .json({ error: 'Nieprawidłowy slot (musi być 1, 2 lub 3)' });
    }

    try {
        const query = `
      INSERT INTO game_saves (slot_id, save_name, current_day, balance, upgrades, updated_at)
      VALUES ($1, $2, 1, 250, '[]'::jsonb, NOW())
      ON CONFLICT (slot_id) 
      DO UPDATE SET 
        save_name = EXCLUDED.save_name,
        current_day = 1,
        balance = 250,
        upgrades = '[]'::jsonb,
        updated_at = NOW()
      RETURNING *;
    `;
        const values = [slotId, `Inspektor #${slotId}`];
        const result = await db.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Błąd zapisu slotu:', err.message);
        res.status(500).json({ error: 'Błąd bazy danych' });
    }
});

router.delete('/:slotId', async (req, res) => {
    const { slotId } = req.params;
    try {
        await db.query('DELETE FROM game_saves WHERE slot_id = $1', [slotId]);
        res.json({ message: `Slot ${slotId} został wyczyszczony` });
    } catch (err) {
        console.error('Blad usuwania slotu:', err.message);
        res.status(500).json({ error: 'Blad bazy danych przy usuwaniu' });
    }
});

module.exports = router;
