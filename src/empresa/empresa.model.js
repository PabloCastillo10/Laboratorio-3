import { Schema, model } from "mongoose";

export const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    nivelImpacto: {
        type: String,
        required: true,
        enum: ["BAJO", "MEDIO", "ALTO"]
    },
    aniosTrayectoria: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        required: true,
        enum: ["AGRICOLA", "MINERAL",  "COMERCIAL", "INDUSTRIAL"]
    },
    ubicacion: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    contacto: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

export default model("Empresa", EmpresaSchema);