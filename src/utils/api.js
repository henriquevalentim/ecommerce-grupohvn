import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ecommerce-grupohvn-api.onrender.com'
})

api.interceptors.request.use(async (config) => {
  console.log('interceptor', config)
  return config
})

export default api
