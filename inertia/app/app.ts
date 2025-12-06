/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '../router'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Wait for router to be ready before mounting
router.isReady().then(() => {
  app.mount('#app')
})