import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Pelicula from 'App/Models/Pelicula'

export default class PeliculasController {
  public async index({response}: HttpContextContract) {
    try{
      const pelicula = await Pelicula.query().preload('Categoria', (querycategoria)=>{
        querycategoria.select('nombre')
      }).preload('Directore', (querydirecore)=>{
        querydirecore.select('nombre')
      }).preload('Productura', (queryproductora)=>{
        queryproductora.select('nombre')
      })

      response.status(200).json({
        message: 'consulta exitosa',
        data: pelicula
      })
    }
    catch(error){
      response.status(500).json({
        message: 'ocurrio un error',
        data: []
      })
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const peliculaSchema = schema.create({
        nombre: schema.string({trim: true}, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(50),
          rules.unique({table: 'Peliculas', column: 'nombre'})
        ]),
        categoria: schema.number([rules.required()]),
        duracion: schema.number([rules.required()]),
        descripcion: schema.string({trim: true}, [rules.required()]),
        director: schema.number([rules.required()]),
        productora: schema.number([rules.required()]),
        imagenes: schema.string({trim: true}, [rules.required()])
      })

      const pelicula = await request.validate({schema: peliculaSchema})
      Pelicula.create(pelicula)

      response.status(200).json({
        message: 'se inserto correctamente',
        data: pelicula
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
      const pelicula = await Pelicula.query().preload('Categoria', (querycategoria)=>{
        querycategoria.select('nombre')
      }).preload('Directore', (querydirecore)=>{
        querydirecore.select('nombre')
      }).preload('Productura', (queryproductora)=>{
       queryproductora.select('nombre')
      }).where('id', params.id)

      response.status(200).json({
        message: 'consulta exitosa',
        data: pelicula
      })
  }
  catch(error){
    response.status(400).json({
      message: 'ocurrio un error'
    })
  }
  }

  public async update({params, request, response}: HttpContextContract) {
    try{
      const pelicula = await Pelicula.findOrFail(params.id)

      pelicula.nombre=request.input('nombre')
      pelicula.categoria=request.input('categoria')
      pelicula.duracion=request.input('duracion')
      pelicula.descripcion=request.input('descripcion')
      pelicula.director=request.input('director')
      pelicula.productora=request.input('productora')
      pelicula.imagenes=request.input('imagenes')

      pelicula.save()

      response.status(200).json({
        message: 'modificacion exitosa',
        data: pelicula
      })
    }
    catch(error){
      response.status(400).json({
        message: 'ocurrio un error'
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const pelicula = await Pelicula.findOrFail(params.id)

      pelicula.delete()
      response.status(200).json({
        message: 'se elimino correctamente'
      })
    }
    catch(error){
      response.status(400).json({
        message: 'ocurrio un error'
      })
    }
  }
}