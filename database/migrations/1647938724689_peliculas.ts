import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Peliculas extends BaseSchema {
  protected tableName = 'peliculas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nombre').notNullable().unique()
      table.integer('categoria').notNullable().unsigned().references('id').inTable('categorias')
      table.integer('duracion').notNullable()
      table.text('descripcion').notNullable()
      table.integer('director').notNullable().unsigned().references('id').inTable('directores')
      table.integer('productora').notNullable().unsigned().references('id').inTable('productoras')
      table.text('imagenes')

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
