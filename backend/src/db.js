const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'wmanagment',
});

pool.on('connect', () => {
    console.log('Polaczono z baza postgres')
})

pool.on('error', (err) => {
    console.error('Nieoczekiwany blad bazy danych: ', err);
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}