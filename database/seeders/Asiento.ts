import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Asiento from 'App/Models/Asiento'

export default class AsientoSeeder extends BaseSeeder {

  public async insertar({funcion2}){
    await Asiento.createMany([
      {
        funcion: funcion2,
        asiento: 'A1'
      },
      {
        funcion: funcion2,
        asiento: 'A2'
      },
      {
        funcion: funcion2,
        asiento: 'A3'
      },
      {
        funcion: funcion2,
        asiento: 'A4'
      },
      {
        funcion: funcion2,
        asiento: 'B1'
      },
      {
        funcion: funcion2,
        asiento: 'B2'
      },
      {
        funcion: funcion2,
        asiento: 'B3'
      },
      {
        funcion: funcion2,
        asiento: 'B4'
      },
      {
        funcion: funcion2,
        asiento: 'C1'
      },
      {
        funcion: funcion2,
        asiento: 'C2'
      },
      {
        funcion: funcion2,
        asiento: 'C3'
      },
      {
        funcion: funcion2,
        asiento: 'C4'
      },
      {
        funcion: funcion2,
        asiento: 'D1'
      },
      {
        funcion: funcion2,
        asiento: 'D2'
      },
      {
        funcion: funcion2,
        asiento: 'D3'
      },
      {
        funcion: funcion2,
        asiento: 'D4'
      }
    ])
  }

  public async run(){
    
  }
}
