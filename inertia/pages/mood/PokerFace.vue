<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useJokesStore } from '../../stores/jokes'

const router = useRouter()
const authStore = useAuthStore()
const jokesStore = useJokesStore()

const showModal = ref(true)
const happiness = ref(0) // 0 to 100
const jokesRead = ref(0)

const moodEmoji = computed(() => {
  if (happiness.value < 25) return ':|'
  if (happiness.value < 50) return ':/'
  if (happiness.value < 75) return ':)'
  return ':D'
})

const moodText = computed(() => {
  if (happiness.value < 25) return 'Poker Face'
  if (happiness.value < 50) return 'Hmm, interessante...'
  if (happiness.value < 75) return 'Ficando melhor!'
  return 'Quase lá!'
})

const canClose = computed(() => happiness.value >= 100)

const backgroundStyle = computed(() => {
  const h = happiness.value
  // Transition from gray to yellow/happy
  const r = Math.round(149 + (255 - 149) * (h / 100))
  const g = Math.round(165 + (215 - 165) * (h / 100))
  const b = Math.round(166 + (0 - 166) * (h / 100))
  return {
    background: `linear-gradient(135deg, rgb(${r}, ${g}, ${b}) 0%, rgb(${r - 30}, ${g - 30}, ${Math.max(0, b - 30)}) 100%)`
  }
})

onMounted(async () => {
  await fetchNewJoke()
})

async function fetchNewJoke() {
  await jokesStore.fetchRandomJoke()
}

function readJoke() {
  // Each joke read increases happiness by 20-35%
  const increase = 20 + Math.random() * 15
  happiness.value = Math.min(100, happiness.value + increase)
  jokesRead.value++
  
  if (happiness.value >= 100) {
    router.push('/feliz')
  }
}

async function getAnotherJoke() {
  readJoke()
  if (happiness.value < 100) {
    await fetchNewJoke()
  }
}

function closeModal() {
  if (canClose.value) {
    router.push('/feliz')
  }
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="mood-container" :style="backgroundStyle">
    <button class="logout-btn" @click.stop="handleLogout">Sair</button>
    
    <div class="mood-content">
      <div class="emoji">{{ moodEmoji }}</div>
      <h1>{{ moodText }}</h1>
      <div class="happiness-bar">
        <div class="happiness-fill" :style="{ width: `${happiness}%` }"></div>
      </div>
      <p class="happiness-text">Felicidade: {{ Math.round(happiness) }}%</p>
    </div>

    <!-- Joke Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Piada Geek #{{ jokesRead + 1 }}</h2>
          <button 
            v-if="canClose" 
            class="close-btn" 
            @click="closeModal"
          >
            ✕
          </button>
        </div>
        
        <div class="modal-body">
          <div v-if="jokesStore.isLoading" class="loading">
            Carregando piada...
          </div>
          <div v-else-if="jokesStore.error" class="error">
            {{ jokesStore.error }}
          </div>
          <p v-else class="joke-text">
            {{ jokesStore.currentJoke }}
          </p>
        </div>

        <div class="modal-footer">
          <button 
            v-if="!canClose"
            class="joke-btn"
            @click="getAnotherJoke"
            :disabled="jokesStore.isLoading"
          >
            {{ jokesStore.isLoading ? 'Carregando...' : 'Entendi! Mais uma!' }}
          </button>
          <button 
            v-else
            class="joke-btn happy"
            @click="closeModal"
          >
            Estou 100% Feliz! Fechar
          </button>
        </div>

        <div v-if="!canClose" class="modal-hint">
          Leia piadas até ficar 100% feliz para poder fechar
        </div>
      </div>
    </div>

    <div class="user-info">
      <span>{{ authStore.user?.fullName || authStore.user?.email }}</span>
    </div>
  </div>
</template>

<style scoped>
.mood-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  position: relative;
}

.logout-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 100;
}

.logout-btn:hover {
  background: white;
  color: #333;
}

.mood-content {
  text-align: center;
  color: white;
  z-index: 5;
}

.emoji {
  font-size: 100px;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.happiness-bar {
  width: 300px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
}

.happiness-fill {
  height: 100%;
  background: linear-gradient(90deg, #f39c12, #f1c40f);
  border-radius: 10px;
  transition: width 0.5s ease;
}

.happiness-text {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: white;
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  color: #333;
  font-size: 24px;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #c0392b;
  transform: scale(1.1);
}

.modal-body {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.joke-text {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  text-align: center;
}

.loading {
  color: #666;
  font-style: italic;
}

.error {
  color: #e74c3c;
}

.modal-footer {
  margin-top: 20px;
  text-align: center;
}

.joke-btn {
  padding: 14px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.joke-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.joke-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.joke-btn.happy {
  background: linear-gradient(135deg, #f39c12 0%, #e74c3c 100%);
}

.modal-hint {
  margin-top: 15px;
  font-size: 12px;
  color: #999;
  text-align: center;
}

.user-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  opacity: 0.8;
  font-size: 14px;
  z-index: 5;
}
</style>
