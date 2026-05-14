const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver
} = require('../controllers/driversController');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize(['admin', 'driver']), getDrivers);
router.get('/:id', authorize(['admin', 'driver']), getDriverById);
router.post('/', authorize('admin'), createDriver);
router.put('/:id', authorize('admin'), updateDriver);
router.delete('/:id', authorize('admin'), deleteDriver);

module.exports = router;
