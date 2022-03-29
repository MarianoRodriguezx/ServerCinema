import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Asientos from 'App/Models/Mongoose/Asientos'
import Database from '@ioc:Adonis/Lucid/Database'
import Asiento from 'App/Models/Asiento'
import Funcione from 'App/Models/Funcione'
import { datos, datos_mongo } from './Datos/asientos'
import FuncionesStore from 'App/Validators/FuncionesStore'

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
      const db = await Database.rawQuery("SELECT funciones.id as 'funcion_id',peliculas.nombre as 'nombre_pelicula', peliculas.imagenes as 'imagenes', peliculas.descripcion as 'descripcion', peliculas.duracion as 'duracion', salas.numero as 'numero_sala', cines.nombre as 'nombre_cine', funciones.fecha as 'fecha' from peliculas INNER JOIN funciones on funciones.pelicula=peliculas.id INNER JOIN salas on salas.id=funciones.sala INNER join cines on cines.id=salas.cine where cines.id=?", [params.id])

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

      const funcion = await request.validate({schema: FuncionesStore})
      const t = await Funcione.create(funcion)

      //Insertar en MySQL
       const butacas = datos(t)
       await Asiento.createMany(butacas)
       //-------------------------------

       //Insertar en Mongo
       const butacas_mongo = datos_mongo(t)
       await Asientos.insertMany(butacas_mongo)
       //--------------------------------

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

      const func = funcion.id

      //Eliminar en MySQL
      funcion.delete()
      //_-------------------
      //Eliminar en Mongo
      Asientos.deleteMany({func})
      //-------------------------

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
