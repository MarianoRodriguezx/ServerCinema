import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Actore from 'App/Models/Actore'

export default class ActoresController {
  public async index({response}: HttpContextContract) {
    try{
      const actor = await Actore.query().select('id','nombre', 'alias')

      response.status(200).json({
        message: 'Consulta realizada correctamente',
        data: actor
      })
    }
    catch(error){
      response.status(500).json({
        message: 'ocurrio un error'
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const actorSchema = schema.create({
        nombre: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(10),
          rules.maxLength(50)
        ]),

        alias: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(20)
        ])
      })

      const actor = await request.validate({schema: actorSchema})
      Actore.create(actor)

      response.status(200).json({
        message: 'Se inserto correctamente',
        data: actor
      })
    }
    catch(error){
      response.status(500).json({
        message: 'ocurrio un error'
      })
    }
  }

  public async show({params, response}: HttpContextContract) {

    try{
      const actor = await Actore.findOrFail(params.id)

      response.status(200).json({
        message: 'La consulta se hizo correctamente',
        data: actor
      })
    }
    catch(error){
      response.status(500).json({
        message: 'ocurrio un error'
      })
    }
  }

  public async update({params, response, request}: HttpContextContract) {

    try{
      const actor = await Actore.findOrFail(params.id)

      actor.nombre=request.input('nombre')
      actor.alias=request.input('alias')

      actor.save()

      response.status(200).json({
        message: 'La actualizacion se hizo correctamente',
        data: actor
      })
    }
    catch(error){
      response.status(500).json({
        message: 'ocurrio un error'
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const actor = await Actore.findOrFail(params.id)

      actor.delete()

      response.status(200).json({
        message: 'La eliminacion se hizo correctamente',
      })

    }
    catch(error){
      response.status(500).json({
        message: 'ocurrio un error'
      })
    }
  }
}
