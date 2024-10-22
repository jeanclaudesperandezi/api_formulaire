import db from '../config/db.js';
import bcrypt from 'bcrypt';

const User = {
  create: (username, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  },

  findByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
      if (err) return callback(err);
      if (result.length > 0) return callback(null, result[0]);
      return callback(null, null);
    });
  }
};

export default User;
