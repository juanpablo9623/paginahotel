const express = require('express');
const router = express.Router();
const reservacionController = require('../controllers/reservacionController');


router.post('/check-availability', reservacionController.checkAvailability);
router.post('/make-reservation', reservacionController.makeReservation);


module.exports = router;