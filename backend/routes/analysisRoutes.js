const express = require('express');
const router = express.Router();
const { getAnalysis } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAnalysis);

module.exports = router; 