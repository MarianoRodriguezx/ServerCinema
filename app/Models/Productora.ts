import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Productora extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  //@hasMany(()=> Pelicula, {
  //  foreignKey: 'fk_productora',
  //  localKey: 'id'
  //})
  //public Productora: HasMany<typeof Pelicula>
}
