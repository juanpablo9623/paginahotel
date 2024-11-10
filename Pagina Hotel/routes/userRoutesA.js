const express = require('express');
const router = express.Router();
const userControllerA = require('../controllers/userControllerA');

// Ruta para iniciar sesión
router.post('/login', userControllerA.loginUser);

// Ruta para cerrar sesión
router.post('/logout', userControllerA.logoutUser);



module.exports = router;
