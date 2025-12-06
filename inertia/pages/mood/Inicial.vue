<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleClick() {
  router.push('/triste')
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="mood-container neutral" @click="handleClick">
    <button class="logout-btn" @click.stop="handleLogout">Sair</button>
    
    <div class="mood-content">
      <div class="emoji">:|</div>
      <h1>Humor Neutro</h1>
      <p>Nem feliz, nem triste...</p>
      <p class="hint">Clique em qualquer lugar para mudar seu humor</p>
    </div>

    <div class="user-info">
      <span>Olá, {{ authStore.user?.fullName || authStore.user?.email }}</span>
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
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;
}

.mood-container.neutral {
  background: linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%);
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
}

.logout-btn:hover {
  background: white;
  color: #333;
}

.mood-content {
  text-align: center;
  color: white;
}

.emoji {
  font-size: 120px;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 48px;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

p {
  font-size: 20px;
  opacity: 0.9;
}

.hint {
  margin-top: 40px;
  font-size: 16px;
  opacity: 0.7;
}

.user-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  opacity: 0.8;
  font-size: 14px;
}
</style>
