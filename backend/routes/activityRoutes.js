const express = require('express')
const router = express.Router()
const {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  completeActivity,
} = require('../controllers/activityController')
const { protect } = require('../middleware/auth')

// Tüm rotalar için authentication gerekli
router.use(protect)

router
  .route('/')
  .get(getActivities)
  .post(createActivity)

router
  .route('/:id')
  .put(updateActivity)
  .delete(deleteActivity)

router.post('/:id/complete', completeActivity)

module.exports = router 