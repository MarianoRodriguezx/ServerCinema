import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Asiento from 'App/Models/Asiento'
import Funcione from 'App/Models/Funcione'
import AsientoSeeder from 'Database/seeders/Asiento'

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
        message: error

      })
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const funcion = await Funcione.query().preload('Pelicula').preload('Sala').where('id', params.id)

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
