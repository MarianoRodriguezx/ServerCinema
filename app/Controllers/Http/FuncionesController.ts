import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Asiento from 'App/Models/Asiento'
import Funcione from 'App/Models/Funcione'

export default class FuncionesController {
  public async index({response}: HttpContextContract) {
    try{
      const db = await Database.rawQuery("SELECT funciones.id as 'funcion_id',peliculas.nombre as 'nombre_pelicula', salas.numero as 'numero_sala', cines.nombre as 'nombre_cine', funciones.fecha as 'fecha' from peliculas INNER JOIN funciones on funciones.pelicula=peliculas.id INNER JOIN salas on salas.id=funciones.sala INNER join cines on cines.id=salas.cine")
      //const funcion = await Funcione.query().preload('Pelicula').preload('Sala')

      const db2 = db[0]
      response.status(200).json({
        message: "Consulta hecha exitosamente",
        data: db2
      })
    }
    catch(error){
      response.status(500).json({
        message: "Ocurrio un error"
      })
    }
  }

  public async InfoxCine({response, params}: HttpContextContract){
    try{
      //const info = await Database.RawQuery('SELECT peliculas.nombre, peliculas.imagenes, peliculas.id, peliculas.descripcion, peliculas.duracion, funciones.sala, funciones.fecha FROM `peliculas` INNER join funciones on peliculas.id=funciones.pelicula INNER join salas on salas.id=funciones.sala INNER join cines on cines.id=salas.cine where cines.id=', params.id)

      //const info = await Pelicula.query().innerJoin('funciones', function() 'funciones.id', 'peliculas.id').innerJoin('salas', 'funciones.sala', 'salas.id').innerJoin('cines', 'salas.cine', 'cines.id').where('cines.id', params.id)
      //const info = await Pelicula.query().select('peliculas.nombre', 'peliculas.imagenes', 'peliculas.id', 'peliculas.descripcion', 'peliculas.duracion', 'salas.numero', 'funciones.fecha').innerJoin('funciones', 'funciones.pelicula', 'peliculas.id').innerJoin('salas', 'funciones.sala', 'salas.id').innerJoin('cines', 'salas.cine', 'cines.id').where('cines.id', params.id)
      const db = await Database.rawQuery("SELECT funciones.id as 'funcion_id',peliculas.nombre as 'nombre_pelicula', peliculas.imagenes as 'imagenes', peliculas.descripcion as 'descripcion', peliculas.duracion as 'duracion', salas.numero as 'numero_sala', cines.nombre as 'nombre_cine', funciones.fecha as 'fecha' from peliculas INNER JOIN funciones on funciones.pelicula=peliculas.id INNER JOIN salas on salas.id=funciones.sala INNER join cines on cines.id=salas.cine where cines.id=?", [params.id])
      //const funcion = await Funcione.query().preload('Pelicula').preload('Sala')

      const db2 = db[0]
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

  public async store({response, request}: HttpContextContract) {
    try{
      const funcionSchema = schema.create({
        sala: schema.number([rules.required()]),
        pelicula: schema.number([rules.required()]),
        fecha: schema.string({trim:true}, [rules.required()])
      })

      const funcion = await request.validate({schema: funcionSchema})
      const t = await Funcione.create(funcion)
      //---------------------------------------------------------------------------------//
      
       await Asiento.createMany([
      {
        funcion: t.id,
        asiento: 'A1'
      },
      {
        funcion: t.id,
        asiento: 'A2'
      },
      {
        funcion: t.id,
        asiento: 'A3'
      },
      {
        funcion: t.id,
        asiento: 'A4'
      },
      {
        funcion: t.id,
        asiento: 'B1'
      },
      {
        funcion: t.id,
        asiento: 'B2'
      },
      {
        funcion: t.id,
        asiento: 'B3'
      },
      {
        funcion: t.id,
        asiento: 'B4'
      },
      {
        funcion: t.id,
        asiento: 'C1'
      },
      {
        funcion: t.id,
        asiento: 'C2'
      },
      {
        funcion: t.id,
        asiento: 'C3'
      },
      {
        funcion: t.id,
        asiento: 'C4'
      },
      {
        funcion: t.id,
        asiento: 'D1'
      },
      {
        funcion: t.id,
        asiento: 'D2'
      },
      {
        funcion: t.id,
        asiento: 'D3'
      },
      {
        funcion: t.id,
        asiento: 'D4'
      }

    ])
      response.status(200).json({
        message: "Consulta Exitosa",
        data: funcion
      })
    }
    catch(error){
      response.status(500).json({
        message: "Ocurrio un error"
      })
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const db = await Database.rawQuery("SELECT funciones.id as 'funcion_id',peliculas.nombre as 'nombre_pelicula', salas.numero as 'numero_sala', cines.nombre as 'nombre_cine', funciones.fecha as 'fecha' from peliculas INNER JOIN funciones on funciones.pelicula=peliculas.id INNER JOIN salas on salas.id=funciones.sala INNER join cines on cines.id=salas.cine where funciones.id="[params.id])
      //const funcion = await Funcione.query().preload('Pelicula').preload('Sala')

      const db2 = db[0]
      response.status(200).json({
        message: "Consulta hecha exitosamente",
        data: db2
      })
    }
    catch(error){
      response.status(500).json({
        message: "Ocurrio un error"
      })
    }
  }

  public async update({params, response, request}: HttpContextContract) {
    try{
      const funcion = await Funcione.findOrFail(params.id)

      funcion.sala=request.input('sala')
      funcion.pelicula=request.input('pelicula')
      funcion.fecha=request.input('fecha')

      response.status(200).json({
        message: "actualizacion correcta",
        data: funcion
      })
    }
    catch(error){
      response.status(500).json({
        message: "Ocurrio un error"
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const funcion = await Funcione.findOrFail(params.id)

      funcion.delete()

      response.status(200).json({
        message: "Eliminacion Correcta"
      })
    }
    catch(error){
      response.status(500).json({
        message: "Ocurrio un error"
      })
    }
  }
}
