import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Directore extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //@hasMany(()=> Pelicula, {
  //  foreignKey: 'fk_director',
  //  localKey: 'id'
  //})
  //public Director: HasMany<typeof Pelicula>
}
