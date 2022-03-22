import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
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

  /*public async store({response, request}: HttpContextContract) {
    try{
      const funcionSchema = schema.create({
        sala: schema.number([rules.required()]),
        pelicula: schema.number([rules.required()])
      })

      const funcion = await request.validate({schema: funcionSchema})

      response.status(200)
    }
  }*/

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
