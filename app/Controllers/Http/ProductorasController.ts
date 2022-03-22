import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Productora from 'App/Models/Productora'

export default class ProductorasController {
  public async index({response}: HttpContextContract) {
    try{
      const productora = await Productora.query().select('id','nombre')

      response.status(200).json({
        message: 'Consulta realizada correctamente',
        data: productora
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
      const productoraSchema = schema.create({
        nombre: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(8),
          rules.maxLength(60),
          rules.unique({table: 'productoras', column: 'nombre'})
        ])
      })

      const productora = await request.validate({schema: productoraSchema})
      Productora.create(productora)

      response.status(200).json({
        message: 'Se inserto correctamente',
        data: productora
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
      const productora = await Productora.findOrFail(params.id)

      response.status(200).json({
        message: 'La consulta se hizo correctamente',
        data: productora
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
      const productora = await Productora.findOrFail(params.id)

      productora.nombre=request.input('nombre')

      productora.save()

      response.status(200).json({
        message: 'La actualizacion se hizo correctamente',
        data: productora
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
      const productora = await Productora.findOrFail(params.id)

      productora.delete()

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
