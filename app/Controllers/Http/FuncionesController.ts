import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Funcione from 'App/Models/Funcione'

export default class FuncionesController {
  public async index({response}: HttpContextContract) {
    try{
      const funcion = await Funcione.query().preload('Pelicula').preload('Sala')

      response.status(200).json({
        message: "Consulta hecha exitosamente",
        data: funcion
      })
    }
    catch(error){
      response.status(500).json({
        message: "Ocurrio un error"
      })
    }
  }

  //public async store({response, request}: HttpContextContract) {
  //  try{

  //  }
  //}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
