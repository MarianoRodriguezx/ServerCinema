import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Asiento from 'App/Models/Asiento'

export default class AsientosController {
  public async index({response}: HttpContextContract) {
    try{
      const asiento = await Asiento.query().preload('Funcione', (queryfunc) => {
        queryfunc.select('sala', 'pelicula')
      })

      response.status(200).json({
        message: 'consulta satisfactoria',
        data: asiento
      })
    }
    catch(error){
      response.status(200).json({
        message: 'ocurrio un error'
      })
    }
  }

  //public async create({}: HttpContextContract) {}

  //public async store({}: HttpContextContract) {}

  //public async show({}: HttpContextContract) {}

  //public async edit({}: HttpContextContract) {}

  //public async update({}: HttpContextContract) {}

  //public async destroy({}: HttpContextContract) {}
}
