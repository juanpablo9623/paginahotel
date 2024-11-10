const mysql = require('mysql');
const pool = mysql.createPool({ 
    host: "localhost",
    user: "root",
    password: "", 
    database: "reservas_hotel"          
    });

module.exports = pool;