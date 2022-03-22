import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Sala from 'App/Models/Sala'

export default class SalasController {
  public async index({response}: HttpContextContract) {

    try{
      const sala = await Sala.query().preload('Cine', (querycine)=>{
        querycine.select('nombre')
      })

      response.status(200).json({
        message: 'consulta realizada correctamente',
        data: sala
      })
    }
    catch(error){
      response.status(400).json({message: 'occurrio un error'})
    }
  }

  public async store({response, request}: HttpContextContract) {
    try{
      const salaSchema = schema.create({
        numero: schema.number([rules.required()]),
        cine: schema.number([rules.required()])
      })

      const sala = await request.validate({schema: salaSchema})
      Sala.create(sala)

      response.status(200).json({
        message: 'Se Inserto Correctamente',
        data: sala
      })
    }
    catch(error){
      response.status(400).json({message: 'No Inserto el registro'})
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const sala = await Sala.query().preload('Cine', (querycine)=>{
        querycine.select('nombre')
      }).where('id', params.id)

      response.status(200).json({
        message: 'consulta realizada correctamente',
        data: sala
      })
    }
    catch(error){
      response.status(400).json({message: 'occurrio un error'})
    }
  }

  public async update({params, request, response}: HttpContextContract) {
    try{
      const sala = await Sala.findOrFail(params.id)

      sala.numero=request.input('numero')
      sala.cine=request.input('cine')

      sala.save()

      response.status(200).json({
        message: 'actualizacion realizada correctamente',
        data: sala
      })
    }
    catch(error){
      response.status(400).json({message: 'occurrio un error'})
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const sala = await Sala.findOrFail(params.id)

      sala.delete()

      response.status(200).json({message: 'eliminacion exitosa'})
    }
    catch(error){
      response.status(400).json({message: 'occurrio un error'})
    }
  }
}
