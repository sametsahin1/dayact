import axios from 'axios'
import config from '../config/config'

const instance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('Request URL:', config.baseURL + config.url)
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.data)
    return response
  },
  (error) => {
    console.error('Response Error:', error)
    return Promise.reject(error)
  }
)

export default instance 