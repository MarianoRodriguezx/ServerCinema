import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Asientos from 'App/Models/Mongoose/Asientos'
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

  public async FiltroAsientos({params, response}){
    try{
      const asiento = await Asiento.query().preload('Funcione', (queryfunc) => {
        queryfunc.select('sala', 'pelicula')
      }).where('funcion', params.id)

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

  public async AsientosxFuncion({params,response}){
    try{
      const asientos = await Asientos.find({funcion:params.id})

      response.status(200).json({message: 'Todo Correcto', data: asientos})
    }
    catch(error){
      response.status(500).json({message: 'Ocurrio un error'})
    }
  }

  public async CambiarDisponibilidad({response, request}){
    try{

      const asiento = request.input('id')

      //console.log(asiento)

      const ocupado = await Asientos.updateMany({_id: asiento}, {estado: true})

      response.status(200).json({message: 'Se cambio adecuadamente', data: ocupado})
    }
    catch(error){
      response.status(500).json({message: 'Ocurrio un error'})
    }
  }

  //public async create({}: HttpContextContract) {}

  //public async store({}: HttpContextContract) {}

  //public async show({}: HttpContextContract) {}

  //public async edit({}: HttpContextContract) {}

  //public async update({}: HttpContextContract) {}

  //public async destroy({}: HttpContextContract) {}
}
