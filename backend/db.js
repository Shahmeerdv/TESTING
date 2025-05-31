// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sham1234', // your MySQL password
    database: 'event_horizon'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

module.exports = db;