import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TUsuario from 'App/Models/TUsuario'
import User from 'App/Models/User'

export default class UsuarioAdminSeeder extends BaseSeeder {
  public async run () {
    const email = 'admin@gmail.com'
    const password = 'abcDEF123!'
    const username = 'administrador'
    const birthday = '1999/11/26'

    
      const datos = {
        email: email,
        password: password,
        username: username,
        birthday: birthday

      }
    
  const user = await User.create(datos)

  const permiso = {
    puesto: 1,
    user_id: user.id
  }

  await TUsuario.create(permiso)

  }
}
