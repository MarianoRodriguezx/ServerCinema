import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Asiento from './Asiento'
import User from './User'

export default class AsientoCliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public asiento: number

  @column()
  public cliente: number

  @column()
  public precio: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public funcion: number

  @belongsTo(()=>Asiento, {
    foreignKey: 'asiento'
  })
  public Asiento: BelongsTo<typeof Asiento>

  @belongsTo(()=>User, {
    foreignKey: 'cliente'
  })
  public User: BelongsTo<typeof User>
}
