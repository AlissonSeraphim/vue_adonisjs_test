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
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(AuthController.loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token: token.value!.release(),
    })
  }

  /**
   * Handle user logout
   * POST /api/auth/logout
   */
  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    const authenticatedUser = auth.user as User & { currentAccessToken: { identifier: string } }

    if (authenticatedUser.currentAccessToken) {
      await User.accessTokens.delete(user, authenticatedUser.currentAccessToken.identifier)
    }

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
}
