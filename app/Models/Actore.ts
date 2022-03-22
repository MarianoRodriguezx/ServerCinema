import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Actore extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public alias: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //@hasMany(()=> ActorPelicula, {
  //  foreignKey: 'fk_actor',
  //  localKey: 'id'
  //})
  //public ActorPelicula: HasMany<typeof ActorPelicula>
}
