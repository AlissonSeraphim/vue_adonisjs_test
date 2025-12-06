import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useJokesStore = defineStore('jokes', () => {
  const currentJoke = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRandomJoke() {
    const authStore = useAuthStore()
    
    if (!authStore.token) {
      error.value = 'Not authenticated'
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/api/jokes/random', {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch joke')
      }

      const data = await response.json()
      currentJoke.value = data.joke
      return data.joke
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      return null
    } finally {
      isLoading.value = false
    }
  }

  function clearJoke() {
    currentJoke.value = null
    error.value = null
  }

  return {
    currentJoke,
    isLoading,
    error,
    fetchRandomJoke,
    clearJoke,
  }
})
