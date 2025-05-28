import { Schema, model, models } from "mongoose";

const UsuarioSchema = new Schema(
  {
    nombre: {
    type: String,
    required: true,
    },
    apellido: {
    type: String,
    required: true,
    },
    nombreusuario: {
    type: String,
    required: true,
    },
    tipo: {
    type: String,
    required: true,
    enum: ["lector", "autor"], 
    default: "lector"
    },
    contrasena: {
    type: String,
    required: true,
    },
    correo: {
    type: String,
    required: true,
    },
    telefono: {
    type: String,
    required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Usuario = models.Usuario || model("usuario", UsuarioSchema);
export default Usuario;