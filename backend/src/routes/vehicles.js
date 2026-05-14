const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehiclesController');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize(['admin', 'driver']), getVehicles);
router.get('/:id', authorize(['admin', 'driver']), getVehicleById);
router.post('/', authorize('admin'), createVehicle);
router.put('/:id', authorize('admin'), updateVehicle);
router.delete('/:id', authorize('admin'), deleteVehicle);

module.exports = router;
