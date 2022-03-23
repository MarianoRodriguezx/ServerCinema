import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Funcione from './Funcione'

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

}
