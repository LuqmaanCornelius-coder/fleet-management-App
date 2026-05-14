const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingsController');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize(['admin', 'driver']), getBookings);
router.get('/:id', authorize(['admin', 'driver']), getBookingById);
router.post('/', authorize('admin'), createBooking);
router.put('/:id', authorize('admin'), updateBooking);
router.delete('/:id', authorize('admin'), deleteBooking);

module.exports = router;
