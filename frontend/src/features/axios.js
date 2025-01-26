import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', {
      fullUrl: config.baseURL + config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    if (error.response) {
      // Server tarafından hata döndü
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // İstek yapıldı ama cevap alınamadı
      return Promise.reject({ message: 'No response from server' });
    } else {
      // İstek yapılırken hata oluştu
      return Promise.reject({ message: error.message });
    }
  }
);

export default axiosInstance 