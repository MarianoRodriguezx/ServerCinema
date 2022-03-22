import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pelicula extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public categoria: number

  @column()
  public duracion: number

  @column()
  public descripcion: string

  @column()
  public director: number

  @column()
  public productora: number

  @column()
  public imagenes: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
