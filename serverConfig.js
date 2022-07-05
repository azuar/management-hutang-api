const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'management_hutang',
    multipleStatements: true
});

module.exports = connection;