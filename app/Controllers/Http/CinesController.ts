import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Cine from 'App/Models/Cine'

export default class CinesController {
  public async index({response}: HttpContextContract) {
    try{
      const cine = await Cine.query().select('id','nombre', 'direccion')

      response.status(200).json({
        message: 'Consulta realizada correctamente',
        data: cine
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
      const cineSchema = schema.create({
        nombre: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(5),
          rules.maxLength(50),
          rules.unique({table: 'cines', column: 'nombre'})
        ]),

        direccion: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(60),
          rules.unique({table: 'cines', column: 'direccion'})
        ])
      })

      const cine = await request.validate({schema: cineSchema})
      Cine.create(cine)

      response.status(200).json({
        message: 'Se inserto correctamente',
        data: cine
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
      const cine = await Cine.findOrFail(params.id)

      response.status(200).json({
        message: 'La consulta se hizo correctamente',
        data: cine
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
      const cine = await Cine.findOrFail(params.id)

      cine.nombre=request.input('nombre')
      cine.direccion=request.input('direccion')

      cine.save()

      response.status(200).json({
        message: 'La actualizacion se hizo correctamente',
        data: cine
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
      const cine = await Cine.findOrFail(params.id)

      cine.delete()

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
