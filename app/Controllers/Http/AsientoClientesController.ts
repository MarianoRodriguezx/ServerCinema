import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AsientoCliente from 'App/Models/AsientoCliente'

export default class AsientoClientesController {
  /*public async index({response}: HttpContextContract) {
    try{
      const asiento_cliente = await AsientoCliente.query().preload('Asiento').preload('User', (querr) => {
        querr.select('username')
      })
  
      response.status(200).json({
        message: "todo correcto", 
        data: asiento_cliente
      })
    }
    catch(error){
      response.status(500).json({
        message: "ocurrio un error"
      })
    }
  }*/

  public async InsertarTicket({response,request}: HttpContextContract){
    //try{
      const ticket = request.all()
      
      await AsientoCliente.create(request.all())
 
      console.log(ticket)
      //response.status(200).json({
      //  message: 'Ticket generado',
      //  data: ticket
      //})
    //}
    //catch(error){
      //response.status(400).json({
        //message: 'error'
      //})
    //}
  }

  /*public async store({response, request}: HttpContextContract) {
    try{
      const asiento_clienteSchema = schema.create({
        asiento: schema.number([rules.required()]),
        cliente: schema.number([rules.required()])
      })

      const asiento_cliente = await request.validate({schema: asiento_clienteSchema})
      AsientoCliente.create(asiento_cliente)

      response.status(200).json({
        message: "todo correcto", 
        data: asiento_cliente
      })
    }
    catch(error){
      response.status(500).json({
        message: "ocurrio un error"
      })
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
      const asiento_cliente = await AsientoCliente.query().preload('Asiento').preload('User', (querr) => {
        querr.select('username')
      }).where('id', params.id)
  
      response.status(200).json({
        message: "todo correcto", 
        data: asiento_cliente
      })
    }
    catch(error){
      response.status(500).json({
        message: "ocurrio un error"
      })
    }
  }

  public async update({params, response, request}: HttpContextContract) {
    try{
      const asiento_cliente = await AsientoCliente.findOrFail(params.id)

      asiento_cliente.asiento=request.input('asiento')
      asiento_cliente.cliente=request.input('cliente')

      asiento_cliente.save()

      response.status(200).json({
        message: "todo correcto", 
        data: asiento_cliente
      })
    }
    catch(error){
      response.status(500).json({
        message: "ocurrio un error"
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const asiento_cliente = await AsientoCliente.findOrFail(params.id)

      asiento_cliente.delete()

      response.status(200).json({
        message: "todo correcto"
      })
    }
    catch(error){
      response.status(500).json({
        message: "ocurrio un error"
      })
    }
  }*/
}
