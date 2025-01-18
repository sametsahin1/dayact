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
  try {
    console.log('Activity Service - Creating Activity:', activityData);
    
    // Token kontrolü ekleyelim
    if (!token) {
      throw new Error('No token provided');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // URL'yi tam olarak belirtelim
    const response = await axiosInstance.post('/apps/dayact/api/activities', activityData, config);
    
    console.log('Activity Service - Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Activity Service - Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      data: error.response?.config?.data
    });
    throw error;
  }
};

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