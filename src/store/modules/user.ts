import { defineStore } from 'pinia'
import { login } from '@/api/user'

interface UserState {
  token: string | null
  name: string
  roles: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token'),
    name: 'Admin',
    roles: ['admin']
  }),
  actions: {
    async login(formData: { username: string; password: string }) {
      const { data } = await login(formData)
      this.token = data.token
      localStorage.setItem('token', data.token)
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})