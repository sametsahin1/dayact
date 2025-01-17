import axiosInstance from '../axios'

// Get activities
const getActivities = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.get('/activities', config)
  return response.data
}

// Create activity
const createActivity = async (activityData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post('/activities', activityData, config)
  return response.data
}

// Delete activity
const deleteActivity = async (activityId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.delete(`/activities/${activityId}`, config)
  return response.data
}

const activityService = {
  getActivities,
  createActivity,
  deleteActivity,
}

export default activityService 