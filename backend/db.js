const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // default XAMPP password
    database: 'event_horizon'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

module.exports = db;
