import { Schema, model } from "@ioc:Mongoose";

export default model('Asientos', new Schema(
    {
        funcion: Number,
        nombre: String,
        estado: Boolean
    })
)