/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const JokesController = () => import('#controllers/jokes_controller')

// API Routes
router.group(() => {
  // Auth routes
  router.group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))
    router.get('/me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }))
  }).prefix('/auth')

  // Jokes routes (protected)
  router.group(() => {
    router.get('/random', [JokesController, 'random'])
  }).prefix('/jokes').use(middleware.auth({ guards: ['api'] }))
}).prefix('/api')

// SPA - Serve Vue app for all non-API routes
router.get('*', async ({ view }) => {
  return view.render('spa')
})

