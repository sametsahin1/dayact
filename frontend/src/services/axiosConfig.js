import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    console.log('Request:', config.url, config.data)
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    console.log('Response:', response.data)
    return response
  },
  (error) => {
    console.error('Response Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
) 