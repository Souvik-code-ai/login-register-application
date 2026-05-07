import axios from 'axios'

const api = axios.create({
  baseURL: 'https://d32neyt9p9wyaf.cloudfront.net/api/v3'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api