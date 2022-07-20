const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'mysql5044.site4now.net',
    user: 'a8a505_mhutang',
    password: 'poltek2022',
    database: 'db_a8a505_mhutang',
    multipleStatements: true
});

module.exports = connection;