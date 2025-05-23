import { defineStore } from 'pinia'
import { api } from '@/utils/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false
  }),

  getters: {
    getUser: (state) => state.user,
    getIsLoggedIn: (state) => state.isLoggedIn
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        this.user = response.data.user
        this.isLoggedIn = true
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', this.user.email)
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || '로그인에 실패했습니다.')
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout')
        this.user = null
        this.isLoggedIn = false
        localStorage.clear()
      } catch (error) {
        console.error('로그아웃 중 오류 발생:', error)
      }
    },

    async fetchUserInfo() {
      try {
        const response = await api.get('/user/info')
        this.user = response.data
        this.isLoggedIn = true
        return response.data
      } catch (error) {
        this.user = null
        this.isLoggedIn = false
        throw error
      }
    },

    async updateProfile(userData) {
      try {
        const response = await api.put('/user/profile', userData)
        this.user = response.data
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || '프로필 업데이트에 실패했습니다.')
      }
    }
  }
}) 