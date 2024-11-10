const express = require('express');
const router = express.Router();
const userControllerR = require('../controllers/userControllerR');

// Ruta para registrar un nuevo usuario
router.post('/register', userControllerR.registerUser);

module.exports = router;
