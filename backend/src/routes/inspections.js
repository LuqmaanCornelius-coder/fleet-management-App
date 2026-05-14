const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getInspections,
  getInspectionById,
  createInspection,
  updateInspection,
  getInspectionHistory
} = require('../controllers/inspectionsController');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize(['admin', 'driver']), getInspections);
router.get('/history', authorize(['admin', 'driver']), getInspectionHistory);
router.get('/:id', authorize(['admin', 'driver']), getInspectionById);
router.post('/', authorize(['admin', 'driver']), createInspection);
router.put('/:id', authorize(['admin', 'driver']), updateInspection);

module.exports = router;
