import axios, { type AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/modules/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

service.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers!['Authorization'] = `Bearer ${userStore.token}`
  }
  return config
})

service.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      userStore.clearToken()
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default service