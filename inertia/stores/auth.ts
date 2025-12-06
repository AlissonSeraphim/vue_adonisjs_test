import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  email: string
  fullName: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  // Initialize user from localStorage
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch {
      localStorage.removeItem('user')
    }
  }

  async function login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    const data = await response.json()
    token.value = data.token
    user.value = data.user
    
    // Persist to localStorage
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    
    return data
  }

  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json',
        },
      })
    } catch {
      // Ignore errors on logout
    }
    
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  async function fetchUser() {
    if (!token.value) return null
    
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      
      const data = await response.json()
      user.value = data.user
      localStorage.setItem('user', JSON.stringify(data.user))
      return data.user
    } catch {
      // Token invalid, clear auth
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return null
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  }
})
