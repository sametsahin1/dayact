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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  console.log('Sending activity data:', activityData)

  try {
    const response = await axiosInstance.post('/activities', activityData, config)
    console.log('Create activity response:', response.data)
    return response.data
  } catch (error) {
    console.error('Create activity error:', error.response?.data || error.message)
    throw error
  }
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

// Complete activity
const completeActivity = async (activityId, quantity, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axiosInstance.post(`/activities/${activityId}/complete`, { quantity }, config)
  return response.data
}

const activityService = {
  getActivities,
  createActivity,
  deleteActivity,
  completeActivity,
}

export default activityService 