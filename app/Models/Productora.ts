import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Pelicula from './Pelicula'

export default class Productora extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @hasMany(()=> Pelicula, {
    foreignKey: 'productora',
    localKey: 'id'
  })
  public Productora: HasMany<typeof Pelicula>
}
