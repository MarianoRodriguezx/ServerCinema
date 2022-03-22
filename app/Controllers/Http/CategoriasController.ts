import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Categoria from 'App/Models/Categoria'

export default class CategoriasController {
  public async index({response}: HttpContextContract) {
    try{
      const categoria = await Categoria.query().select('id','nombre')

      response.status(200).json({
        message: 'Consulta realizada correctamente',
        data: categoria
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
      const categoriaSchema = schema.create({
        nombre: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(5),
          rules.maxLength(50),
          rules.unique({table: 'categorias', column: 'nombre'})
        ])
      })

      const categoria = await request.validate({schema: categoriaSchema})
      Categoria.create(categoria)

      response.status(200).json({
        message: 'Se inserto correctamente',
        data: categoria
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
      const categoria = await Categoria.findOrFail(params.id)

      response.status(200).json({
        message: 'La consulta se hizo correctamente',
        data: categoria
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
      const categoria = await Categoria.findOrFail(params.id)

      categoria.nombre=request.input('nombre')

      categoria.save()

      response.status(200).json({
        message: 'La actualizacion se hizo correctamente',
        data: categoria
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
      const categoria = await Categoria.findOrFail(params.id)

      categoria.delete()

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
