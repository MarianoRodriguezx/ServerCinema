import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AsientoClientes extends BaseSchema {
  protected tableName = 'asiento_clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('asiento').notNullable().unsigned().references('id').inTable('asientos')
      table.integer('cliente').notNullable().unsigned().references('id').inTable('users')
      table.float('precio').notNullable()

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
