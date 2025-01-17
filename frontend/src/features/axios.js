import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/apps/dayact/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Yerel geliştirme ortamında API URL'sini değiştir
    if (process.env.NODE_ENV === 'development') {
      config.baseURL = 'http://localhost:5001/apps/dayact/api'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance 