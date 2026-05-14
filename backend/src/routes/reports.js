const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { getReportMetrics } = require('../controllers/reportsController');

const router = express.Router();

router.use(authenticate);
router.get('/dashboard', authorize(['admin']), getReportMetrics);

module.exports = router;
