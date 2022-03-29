import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, Has, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'
import Pelicula from './Pelicula'
import Asiento from './Asiento'
import AsientoCliente from './AsientoCliente'

export default class Funcione extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sala: number

  @column()
  public pelicula: number

  @column()
  public fecha: string

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

  @hasMany(()=> Asiento, {
    foreignKey: 'funcion',
    localKey: 'id'
  })
  public Asiento: HasMany<typeof Asiento>

  @hasMany(()=> AsientoCliente, {
    foreignKey: 'funcion',
    localKey: 'id'
  })
  public Funcion: HasMany<typeof AsientoCliente>

}
