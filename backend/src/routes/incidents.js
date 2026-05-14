const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncidentStatus
} = require('../controllers/incidentsController');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize(['admin', 'driver']), getIncidents);
router.get('/:id', authorize(['admin', 'driver']), getIncidentById);
router.post('/', authorize(['admin', 'driver']), createIncident);
router.put('/:id/status', authorize(['admin', 'driver']), updateIncidentStatus);

module.exports = router;
