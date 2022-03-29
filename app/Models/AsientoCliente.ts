import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Asiento from './Asiento'
import User from './User'
import Funcione from './Funcione'

export default class AsientoCliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public asientos: number

  @column()
  public usuario: number

  @column()
  public total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public funcion: number

  @belongsTo(()=>User, {
    foreignKey: 'cliente'
  })
  public User: BelongsTo<typeof User>

  @belongsTo(()=> Funcione, {
    foreignKey: 'funcion'
  })
  public Funcion: BelongsTo<typeof Funcione>
}
