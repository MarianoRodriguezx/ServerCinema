import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DropTables extends BaseSchema {
  protected tableName = 'asiento_clientes'

  public async up () {
    this.schema.dropTable(this.tableName)
  }

  public async down () {
    
  }
}
