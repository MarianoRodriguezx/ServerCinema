import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateSpaceAsientosClientes extends BaseSchema {
  protected tableName = 'asiento_clientes'

  public async up () {
    this.schema.alterTable(this.tableName, (table)=> {
      table.dropColumn('asiento');
    })

    this.schema.alterTable(this.tableName, (table)=> {
      table.text('asiento')
    })
  }

  public async down () {
    
  }
}
