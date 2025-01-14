import axios from 'axios'

const API_URL = 'http://localhost:5000/api/activities/'

// Etkinlik oluştur
const createActivity = async (activityData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, activityData, config)
  return response.data
}

// Etkinlikleri getir
const getActivities = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// Etkinlik sil
const deleteActivity = async (activityId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + activityId, config)
  return response.data
}

// Etkinlik tamamla
const completeActivity = async (activityId, quantity, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL + activityId + '/complete',
    { quantity },
    config
  )
  return response.data
}

const activityService = {
  createActivity,
  getActivities,
  deleteActivity,
  completeActivity,
}

export default activityService 