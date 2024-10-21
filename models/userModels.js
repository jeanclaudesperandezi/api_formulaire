const db = require('../config/db');
const bcrypt = require('bcrypt');

// Modèle pour ajouter un utilisateur
exports.addUser = async (username, password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hachage du mot de passe de manière asynchrone
        
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await db.promise().query(sql, [username, hashedPassword]); // Utilisation de `db.promise()` pour éviter les callbacks

        console.log('Utilisateur ajouté avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        throw error; // Propager l'erreur pour qu'elle soit gérée ailleurs
    }
};

// Vérifier les informations d'identification de l'utilisateur
exports.verifyUser = async (username, password) => {
    try {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const [results] = await db.promise().query(sql, [username]); // Utilisation de promesses pour interroger la base de données

        if (results.length === 0) {
            return null; // Utilisateur non trouvé
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password); // Comparaison des mots de passe de manière asynchrone
        
        return isMatch ? user : null; // Renvoie l'utilisateur si le mot de passe est correct, sinon null
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur:', error);
        throw error; // Propager l'erreur pour qu'elle soit gérée ailleurs
    }
};
