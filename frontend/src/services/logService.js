import axios from 'axios'

const API_URL = 'http://localhost:5000/api/logs/'

// Logları getir
const getLogs = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filters,
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

const resetAllData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + 'reset', {}, config)
  return response.data
}

const logService = {
  getLogs,
  resetAllData,
}

export default logService 