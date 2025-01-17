const config = {
  API_BASE_URL: import.meta.env.PROD 
    ? 'https://yazilimservisi.com/apps/dayact/api'
    : 'http://localhost:5001/api'
}

export default config 