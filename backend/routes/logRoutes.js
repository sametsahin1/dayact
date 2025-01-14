const express = require('express')
const router = express.Router()
const { getLogs, resetAllData } = require('../controllers/logController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getLogs)
router.post('/reset', protect, resetAllData)

module.exports = router 