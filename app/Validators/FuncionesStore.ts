import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default schema.create({
    sala: schema.number([rules.required()]),
    pelicula: schema.number([rules.required()]),
    fecha: schema.string({trim:true}, [rules.required()])
}) 