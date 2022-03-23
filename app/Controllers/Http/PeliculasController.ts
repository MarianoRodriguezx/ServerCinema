import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
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
        message: 'ocurrio un error'
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
          rules.unique({table: 'peliculas', column: 'nombre'})
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

  public async InfoxCine({response, params}: HttpContextContract){
    try{
      const info = await Database.rawQuery('SELECT peliculas.nombre, peliculas.imagenes, peliculas.id, peliculas.descripcion, peliculas.duracion, funciones.sala, funciones.fecha FROM `peliculas` INNER join funciones on peliculas.id=funciones.pelicula INNER join salas on salas.id=funciones.sala INNER join cines on cines.id=salas.cine where cines.id=?', [params.id])

      //const info = await Pelicula.query().innerJoin('funciones', function() 'funciones.id', 'peliculas.id').innerJoin('salas', 'funciones.sala', 'salas.id').innerJoin('cines', 'salas.cine', 'cines.id').where('cines.id', params.id)
      //const info = await Pelicula.query().select('peliculas.nombre', 'peliculas.imagenes', 'peliculas.id', 'peliculas.descripcion', 'peliculas.duracion', 'salas.numero', 'funciones.fecha').innerJoin('funciones', 'funciones.pelicula', 'peliculas.id').innerJoin('salas', 'funciones.sala', 'salas.id').innerJoin('cines', 'salas.cine', 'cines.id').where('cines.id', params.id)
      //const db = await Database.rawQuery("SELECT funciones.id as 'funcion_id',peliculas.nombre as 'nombre_pelicula', peliculas.imagenes as 'imagenes', peliculas.descripcion as 'descripcion', peliculas.duracion as 'duracion', salas.numero as 'numero_sala', cines.nombre as 'nombre_cine', funciones.fecha as 'fecha' from peliculas INNER JOIN funciones on funciones.pelicula=peliculas.id INNER JOIN salas on salas.id=funciones.sala INNER join cines on cines.id=salas.cine where cines.id=", params.id)
      //const funcion = await Funcione.query().preload('Pelicula').preload('Sala')

      const db2 = info[0]
      response.status(200).json({
        message: 'consulta exitosa',
        data: db2
      })
    }
    catch(error){
      response.status(400).json({
        message: error
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

  public async updateimage({params, request, response}: HttpContextContract){
    try{
      const img = await Pelicula.findOrFail(params.id)

      img.imagenes=request.input('imagenes')

      img.save()

      response.status(200).json({
        message: 'modificacion exitosa'
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
