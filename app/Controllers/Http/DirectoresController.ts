import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Directore from 'App/Models/Directore'

export default class DirectoresController {
  public async index({response}: HttpContextContract) {
    try{
      const director = await Directore.query().select('id','nombre')

      response.status(200).json({
        message: 'Consulta realizada correctamente',
        data: director
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
      const directorSchema = schema.create({
        nombre: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(8),
          rules.maxLength(50),
          rules.unique({table: 'directores', column: 'nombre'})
        ])
      })

      const director = await request.validate({schema: directorSchema})
      Directore.create(director)

      response.status(200).json({
        message: 'Se inserto correctamente',
        data: director
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
      const director = await Directore.findOrFail(params.id)

      response.status(200).json({
        message: 'La consulta se hizo correctamente',
        data: director
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
      const director = await Directore.findOrFail(params.id)

      director.nombre=request.input('nombre')

      director.save()

      response.status(200).json({
        message: 'La actualizacion se hizo correctamente',
        data: director
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
      const director = await Directore.findOrFail(params.id)

      director.delete()

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
