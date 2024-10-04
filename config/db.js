const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'jeanclaude', 
    password: 'qwerty', 
    database: 'authentification' 
});




db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err.stack);
        return;
    }
    console.log('Connection à la base de données MySQL');
});

module.exports = db;
