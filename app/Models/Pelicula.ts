import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'
import Directore from './Directore'
import Productora from './Productora'
import Funcione from './Funcione'

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

  @belongsTo(()=> Categoria, {
    foreignKey: 'categoria'
  })
  public Categoria: BelongsTo<typeof Categoria>

  @belongsTo(()=> Directore, {
    foreignKey: 'director'
  })
  public Directore: BelongsTo<typeof Directore>

  @belongsTo(()=> Productora, {
    foreignKey: 'productora'
  })
  public Productura: BelongsTo<typeof Productora>
   
  @hasMany(()=>Funcione, {
    foreignKey: 'pelicula',
    localKey: 'id'
  })
  public Pelicula: HasMany<typeof Funcione>
  
}
