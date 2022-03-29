import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AsientoClientes extends BaseSchema {
  protected tableName = 'asiento_clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('asientos').notNullable()
      table.integer('usuario').unsigned().notNullable().references('id').inTable('users')
      table.integer('funcion').unsigned().notNullable().references('id').inTable('funciones')
      table.float('total').notNullable()

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
