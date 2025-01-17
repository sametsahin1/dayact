import axios from 'axios'
import config from '../config/config'

const instance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance 