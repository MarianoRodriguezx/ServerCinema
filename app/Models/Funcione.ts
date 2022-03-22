import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'
import Pelicula from './Pelicula'

export default class Funcione extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sala: number

  @column()
  public pelicula: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Sala, {
    foreignKey: 'sala'
  })
  public Sala: BelongsTo<typeof Sala>

  @belongsTo(()=> Pelicula, {
    foreignKey: 'pelicula'
  })
  public Pelicula: BelongsTo<typeof Pelicula>
  
}
