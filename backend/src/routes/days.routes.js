const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();
const DAYS_PATH = path.join(__dirname, '../../data/days.json');
const RULES_PATH = path.join(__dirname, '../../data/rules.json');

router.get('/:day', async (req, res) => {
    try {
        const dayNum = Number(req.params.day);

        const [daysRaw, rulesRaw] = await Promise.all([
            fs.readFile(DAYS_PATH, 'utf-8'),
            fs.readFile(RULES_PATH, 'utf-8'),
        ]);

        const days = JSON.parse(daysRaw);
        const rules = JSON.parse(rulesRaw);

        const sortedDays = [...days].sort((a, b) => a.day - b.day);
        const exactDay = sortedDays.find((d) => d.day === dayNum);
        const effectiveConfig =
            exactDay ||
            [...sortedDays].reverse().find((d) => d.day <= dayNum) ||
            sortedDays[0];

        const activeRules = effectiveConfig.rulesId
            .map((id) => rules.find((r) => r.id === id))
            .filter(Boolean);

        res.json({
            day: dayNum,
            hasBriefing: Boolean(exactDay),
            title: exactDay
                ? exactDay.title
                : `DZIEŃ ${dayNum}`,
            briefing: exactDay
                ? exactDay.briefing
                : 'Brak nowych wytycznych. Obowiązują dotychczasowe zasady',
            rules: activeRules,
        });
    } catch (err) {
        console.error('Błąd odczytu days.json:', err);
        res.status(500).json({ error: 'Nie udało się pobrać danych dnia' });
    }
});

module.exports = router;