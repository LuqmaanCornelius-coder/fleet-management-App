const express = require('express');
const authRoutes = require('./auth');
const bookingRoutes = require('./bookings');
const vehicleRoutes = require('./vehicles');
const driverRoutes = require('./drivers');
const inspectionRoutes = require('./inspections');
const incidentRoutes = require('./incidents');
const reportRoutes = require('./reports');
const uploadRoutes = require('./uploads');
const profileRoutes = require('./profile');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/drivers', driverRoutes);
router.use('/inspections', inspectionRoutes);
router.use('/incidents', incidentRoutes);
router.use('/reports', reportRoutes);
router.use('/uploads', uploadRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
