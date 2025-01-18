const express = require('express')
const router = express.Router()
const {
  getActivities,
  createActivity,
  deleteActivity,
  completeActivity,
} = require('../controllers/activityController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
  .get(protect, getActivities)
  .post(protect, createActivity)

router.route('/:id')
  .delete(protect, deleteActivity)

router.post('/:id/complete', protect, completeActivity)

module.exports = router 