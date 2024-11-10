const express = require('express');
const router = express.Router();
const userControllerA = require('../controllers/userControllerA');

// Ruta para iniciar sesión
router.post('/login', userControllerA.loginUser);

// Ruta para cerrar sesión
router.post('/logout', userControllerA.logoutUser);

<<<<<<< HEAD

=======
router.post('/userReserva', userControllerA.loginUser);
>>>>>>> a572031ff53ca281111583ae795811addae12ca6

module.exports = router;
