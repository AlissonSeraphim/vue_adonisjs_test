<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleClick() {
  router.push('/inicial')
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="mood-container happy" @click="handleClick">
    <button class="logout-btn" @click.stop="handleLogout">Sair</button>
    
    <div class="mood-content">
      <div class="emoji">:D</div>
      <h1>100% Feliz!</h1>
      <p>A vida é maravilhosa!</p>
      <p class="hint">Clique para voltar ao início</p>
    </div>

    <div class="confetti">
      <span v-for="i in 30" :key="i" class="particle" :style="{ 
        left: `${Math.random() * 100}%`, 
        animationDelay: `${Math.random() * 2}s`,
        backgroundColor: ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'][i % 5]
      }"></span>
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
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}

.mood-container.happy {
  background: linear-gradient(135deg, #f1c40f 0%, #f39c12 100%);
}

.logout-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid white;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.logout-btn:hover {
  background: white;
  color: #f39c12;
}

.mood-content {
  text-align: center;
  color: white;
  z-index: 5;
}

.emoji {
  font-size: 120px;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: bounce 0.5s ease infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
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

.confetti {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  top: -20px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: confetti-fall 3s linear infinite;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
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
