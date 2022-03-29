import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddColumnAsientoClientes extends BaseSchema {
  protected tableName = 'asiento_clientes'

  public async up () {
    this.schema.alterTable(this.tableName, (table)=> {
      table.integer('funcion').notNullable().unsigned().references('id').inTable('funciones');
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table)=>{
      table.dropColumn('funcion')
    })
  }
}
