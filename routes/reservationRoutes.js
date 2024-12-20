const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { validateReservation } = require('../middleware/validateReservation');
const protect = require('../middleware/authMiddleware');

// Controller methodlarının doğru bir şekilde çağrıldığından emin olun
router.get('/', protect, reservationController.getAllReservations);
router.post('/', protect, validateReservation, reservationController.createReservation);
router.put('/:id', protect, validateReservation, reservationController.updateReservation);
router.delete('/:id', protect, reservationController.deleteReservation);

module.exports = router;
