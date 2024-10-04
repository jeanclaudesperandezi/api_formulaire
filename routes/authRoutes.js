const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/api/register', authController.registerUser);


router.post('/api/login', authController.loginUser);

module.exports = router;
