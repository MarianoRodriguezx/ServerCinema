import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Asientos extends BaseSchema {
  protected tableName = 'asientos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('funcion').notNullable().unsigned().references('id').inTable('funciones')
      table.string('asiento').notNullable()

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
