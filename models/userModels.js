const db = require('../config/db');
const bcrypt = require('bcrypt');

// Ajouter un nouvel utilisateur
exports.addUser = (data, callback) => {
    const hashedPassword = bcrypt.hashSync(data.password, 10); // Hachage du mot de passe

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [data.username, hashedPassword], (err, result) => {
        if (err) return callback(err); // Renvoyer l'erreur
        callback(null, result);
    });
};

// Vérifier les informations d'identification de l'utilisateur
exports.verifyUser = (username, password, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';

    db.query(sql, [username], (err, results) => {
        if (err) return callback(err); // Renvoyer l'erreur
        if (results.length === 0) {
            return callback(null, null); // Utilisateur non trouvé
        }
        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        callback(null, isMatch ? user : null); // Renvoyer l'utilisateur ou null
    });
};

