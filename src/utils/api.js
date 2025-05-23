import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API 엔드포인트 함수들
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout')
}

export const userAPI = {
  getInfo: () => api.get('/user/info'),
  updateProfile: (userData) => api.put('/user/profile', userData)
}

export const reservationAPI = {
  create: (reservationData) => api.post('/reservations', reservationData),
  getList: () => api.get('/reservations'),
  getDetail: (id) => api.get(`/reservations/${id}`),
  cancel: (id) => api.post(`/reservations/${id}/cancel`)
} 