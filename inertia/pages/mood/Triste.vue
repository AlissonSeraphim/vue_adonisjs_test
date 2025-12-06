<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleClick() {
  router.push('/poker-face')
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="mood-container sad" @click="handleClick">
    <button class="logout-btn" @click.stop="handleLogout">Sair</button>
    
    <div class="mood-content">
      <div class="emoji">:(</div>
      <h1>100% Triste</h1>
      <p>O mundo é um lugar sombrio...</p>
      <p class="hint">Clique para buscar uma piada e melhorar!</p>
    </div>

    <div class="rain">
      <span v-for="i in 20" :key="i" class="drop" :style="{ left: `${i * 5}%`, animationDelay: `${i * 0.1}s` }"></span>
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

.mood-container.sad {
  background: linear-gradient(135deg, #2c3e50 0%, #1a252f 100%);
}

.logout-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.mood-content {
  text-align: center;
  color: white;
  z-index: 5;
}

.emoji {
  font-size: 120px;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  animation: shake 2s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

h1 {
  font-size: 48px;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

p {
  font-size: 20px;
  opacity: 0.8;
}

.hint {
  margin-top: 40px;
  font-size: 16px;
  opacity: 0.6;
}

.rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.drop {
  position: absolute;
  top: -20px;
  width: 2px;
  height: 20px;
  background: linear-gradient(transparent, rgba(174, 194, 224, 0.5));
  animation: fall 1s linear infinite;
}

@keyframes fall {
  to {
    transform: translateY(100vh);
  }
}

.user-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  opacity: 0.6;
  font-size: 14px;
  z-index: 5;
}
</style>
