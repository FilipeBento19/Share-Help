// @/config/api.js
import axios from 'axios'

// Pega a URL da variável de ambiente ou usa localhost para desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

console.log('🔗 API configurada para:', API_URL)

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para lidar com respostas e renovar token automaticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        try {
          // ✅ CORRIGIDO: usando API_URL em vez de localhost hardcoded
          const response = await axios.post(`${API_URL}/api/token/refresh/`, {
            refresh: refreshToken
          })

          const newAccessToken = response.data.access
          localStorage.setItem('access_token', newAccessToken)

          // Atualiza o header da requisição original
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return api(originalRequest)
        } catch (refreshError) {
          // Se falhou ao renovar o token, remove tudo e redireciona para login
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('keepLoggedIn')

          // Redireciona para página de login ou perfil
          window.location.href = '/perfil'
          return Promise.reject(refreshError)
        }
      } else {
        // Não há refresh token, remove tudo
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('keepLoggedIn')
      }
    }

    return Promise.reject(error)
  }
)

export default api