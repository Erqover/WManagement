const express = require('express');
const cors = require('cors');
const savesRoutes = require('./routes/saves.routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/saves', savesRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'ChemZero Backend' });
});

app.listen(port, () => {
    console.log(`Serwer API nasluchuje na porcie ${port}`);
});
