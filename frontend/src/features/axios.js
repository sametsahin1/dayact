import axios from 'axios'

const instance = axios.create({
  baseURL: '/apps/dayact/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// İstek interceptor'u
instance.interceptors.request.use(
  (config) => {
    // URL'in başında /api varsa kaldır
    if (config.url.startsWith('/api')) {
      config.url = config.url.substring(4)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance 