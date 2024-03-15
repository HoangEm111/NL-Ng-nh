const mysql = require('mysql2');

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "healpro"
});

con.getConnection(function (err, connection) {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully');
    // Do something with the connection if needed
    connection.release(); // Always release the connection when done with it
});

module.exports = con 