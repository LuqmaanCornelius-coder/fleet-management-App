const express = require('express');
const multer = require('multer');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadDocument } = require('../controllers/uploadController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.use(authenticate);
router.post('/', authorize(['admin', 'driver']), upload.single('file'), uploadDocument);

module.exports = router;
