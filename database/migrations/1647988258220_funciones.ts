import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Funciones extends BaseSchema {
  protected tableName = 'funciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('sala').notNullable().unsigned().references('id').inTable('salas')
      table.integer('pelicula').notNullable().unsigned().references('id').inTable('peliculas')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
