import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cine from './Cine'
import Funcione from './Funcione'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: number

  @column()
  public cine: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Cine, {
    foreignKey: 'cine'
  })
  public Cine: BelongsTo<typeof Cine>

  @hasMany(()=>Funcione,{
    foreignKey: 'sala',
    localKey: 'id'
  })
  public Sala: HasMany<typeof Funcione>
  
}
