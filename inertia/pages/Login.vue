<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

// Validation
const emailError = computed(() => {
  if (!email.value) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value) ? '' : 'E-mail inválido'
})

const passwordError = computed(() => {
  if (!password.value) return ''
  return password.value.length >= 8 ? '' : 'Senha deve ter no mínimo 8 caracteres'
})

const isFormValid = computed(() => {
  return email.value && password.value && !emailError.value && !passwordError.value
})

async function handleLogin() {
  if (!isFormValid.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    await authStore.login(email.value, password.value)
    router.push('/inicial')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Erro ao fazer login'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="emoji">:|</div>
        <h1>Bem-vindo</h1>
        <p>Entre para melhorar (ou piorar) seu humor</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            :class="{ error: emailError }"
            autocomplete="email"
          />
          <span v-if="emailError" class="error-text">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            :class="{ error: passwordError }"
            autocomplete="current-password"
          />
          <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="!isFormValid || isLoading"
          class="login-button"
        >
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.emoji {
  font-size: 64px;
  margin-bottom: 10px;
}

.login-header h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.form-group input {
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-text {
  font-size: 12px;
  color: #e74c3c;
}

.error-message {
  background: #ffeaea;
  color: #e74c3c;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.login-button {
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
