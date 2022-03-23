import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Funcione from './Funcione'
import AsientoCliente from './AsientoCliente'

export default class Asiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public funcion: number

  @column()
  public asiento: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Funcione, {
    foreignKey: 'funcion'
  })
  public Funcione: BelongsTo<typeof Funcione>

  @hasMany(()=> AsientoCliente, {
    foreignKey: 'asiento',
    localKey: 'id'
  })
  public Asiento: HasMany<typeof AsientoCliente>

}
