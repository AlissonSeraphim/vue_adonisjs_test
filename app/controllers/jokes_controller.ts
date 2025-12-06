import type { HttpContext } from '@adonisjs/core/http'

export default class JokesController {
  private static readonly GEEK_JOKE_API = 'https://geek-jokes.sameerkumar.website/api?format=json'

  /**
   * Get a random geek joke from the external API
   * GET /api/jokes/random
   */
  async random({ response }: HttpContext) {
    try {
      const apiResponse = await fetch(JokesController.GEEK_JOKE_API)

      if (!apiResponse.ok) {
        return response.serviceUnavailable({
          message: 'Failed to fetch joke from external API',
          error: 'Service unavailable',
        })
      }

      const data = (await apiResponse.json()) as { joke: string }

      return response.ok({
        joke: data.joke,
      })
    } catch (error) {
      return response.serviceUnavailable({
        message: 'Failed to fetch joke from external API',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}
