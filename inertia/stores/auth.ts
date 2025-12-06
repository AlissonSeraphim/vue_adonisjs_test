import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  email: string
  fullName: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const initialized = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  /**
   * Initialize auth state from server session
   * This is called on app startup to restore session
   */
  async function initFromSession() {
    if (initialized.value) return

    try {
      const response = await fetch('/api/auth/session', {
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // Important: include cookies for session
      })

      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          token.value = data.token
          user.value = data.user
        }
      }
    } catch {
      // Session not available, user needs to login
    } finally {
      initialized.value = true
    }
  }

  async function login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include', // Important: include cookies for session
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    const data = await response.json()
    token.value = data.token
    user.value = data.user
    
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
        credentials: 'include',
      })
    } catch {
      // Ignore errors on logout
    }
    
    token.value = null
    user.value = null
  }

  async function fetchUser() {
    if (!token.value) return null
    
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      
      const data = await response.json()
      user.value = data.user
      return data.user
    } catch {
      // Token invalid, clear auth
      token.value = null
      user.value = null
      return null
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    initialized,
    initFromSession,
    login,
    logout,
    fetchUser,
  }
})
