const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'staff'
    },
    console.log('Connected to the staff database.')
);

module.exports = db;