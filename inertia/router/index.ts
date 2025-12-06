import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/inicial',
      name: 'inicial',
      component: () => import('../pages/mood/Inicial.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/triste',
      name: 'triste',
      component: () => import('../pages/mood/Triste.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/poker-face',
      name: 'poker-face',
      component: () => import('../pages/mood/PokerFace.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/feliz',
      name: 'feliz',
      component: () => import('../pages/mood/Feliz.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // Initialize auth from server session on first navigation
  if (!authStore.initialized) {
    await authStore.initFromSession()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/inicial')
  } else {
    next()
  }
})

export default router
