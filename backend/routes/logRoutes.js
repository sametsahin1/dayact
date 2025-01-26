const express = require('express')
const router = express.Router()
const { getLogs, resetAllData } = require('../controllers/logController')
const { getAnalysis } = require('../controllers/analysisController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getLogs)
router.get('/analysis', protect, getAnalysis)
router.post('/reset', protect, resetAllData)

module.exports = router 