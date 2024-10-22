import User from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = (req, res) => {
  const { username, password } = req.body;

  User.create(username, password, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err });
    return res.status(201).json({ message: 'Utilisateur créé avec succès' });
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur', error: err });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({ message: 'Connexion réussie', token });
  });
};
