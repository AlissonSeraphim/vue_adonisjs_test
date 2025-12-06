import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class AuthController {
  /**
   * Login validator schema
   */
  private static loginValidator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(8),
    })
  )

  /**
   * Handle user login
   * POST /api/auth/login
   */
  async login({ request, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(AuthController.loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    const tokenValue = token.value!.release()

    // Persist token in session for browser reload persistence
    session.put('auth_token', tokenValue)
    session.put('auth_user', {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    })

    return response.ok({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token: tokenValue,
    })
  }

  /**
   * Handle user logout
   * POST /api/auth/logout
   */
  async logout({ auth, response, session }: HttpContext) {
    const user = auth.user!
    const authenticatedUser = auth.user as User & { currentAccessToken: { identifier: string } }

    if (authenticatedUser.currentAccessToken) {
      await User.accessTokens.delete(user, authenticatedUser.currentAccessToken.identifier)
    }

    // Clear session
    session.forget('auth_token')
    session.forget('auth_user')

    return response.ok({
      message: 'Logged out successfully',
    })
  }

  /**
   * Get current authenticated user
   * GET /api/auth/me
   */
  async me({ auth, response }: HttpContext) {
    const user = auth.user!

    return response.ok({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    })
  }

  /**
   * Get session data (token and user from session)
   * GET /api/auth/session
   */
  async session({ session, response }: HttpContext) {
    const token = session.get('auth_token')
    const user = session.get('auth_user')

    if (!token || !user) {
      return response.ok({
        authenticated: false,
        token: null,
        user: null,
      })
    }

    return response.ok({
      authenticated: true,
      token,
      user,
    })
  }
}
