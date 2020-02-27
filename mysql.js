const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "petshop"
});

connection.query(
    'SELECT * FROM users', (err, result, fields) => {
        console.log(fields);
        console.log(result);
    });