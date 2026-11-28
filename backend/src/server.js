const express = require('express');
const cors = require('cors');
const savesRoutes = require('./routes/saves.routes');
const daysRoutes = require('./routes/days.routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/saves', savesRoutes);
app.use('/api/days', daysRoutes);

app.listen(port, () => {
    console.log(`Serwer API nasluchuje na porcie ${port}`);
});
