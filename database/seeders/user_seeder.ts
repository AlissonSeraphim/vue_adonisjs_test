import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const existingUser = await User.findBy('email', 'cliente@incuca.com.br')
    
    if (!existingUser) {
      await User.create({
        fullName: 'Cliente Incuca',
        email: 'cliente@incuca.com.br',
        password: 'seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga',
      })
    }
  }
}