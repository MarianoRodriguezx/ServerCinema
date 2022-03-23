import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import TUsuario from './TUsuario'
import AsientoCliente from './AsientoCliente'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public birthday: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(()=> TUsuario, {
    foreignKey: 'user_id',
    localKey: 'id'
  })
  public TUsuario: HasMany<typeof TUsuario>

  @hasMany(()=> AsientoCliente, {
    foreignKey: 'cliente',
    localKey: 'id'
  } )
  public User: HasMany<typeof AsientoCliente>
}
