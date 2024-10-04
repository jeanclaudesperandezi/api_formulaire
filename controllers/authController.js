const User = require('../models/userModels');
const jwt = require('jsonwebtoken');

// Clé secrète pour le JWT
const JWT_SECRET = 'votre_secret_jwt'; // Changez ceci en une valeur sécurisée

// Inscription
exports.registerUser = (req, res) => {
    const { username, password } = req.body;

    User.addUser({ username, password }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err });
        }
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    });
};

// Connexion
exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    User.verifyUser(username, password, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
        }
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.id_user, username: user.username }, JWT_SECRET, {
            expiresIn: '1h', // Durée de validité du token
        });

        res.json({ message: 'Connexion réussie', token });
    });
};
