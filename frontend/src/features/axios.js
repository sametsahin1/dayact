import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: window.location.origin + '/apps/dayact/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance 