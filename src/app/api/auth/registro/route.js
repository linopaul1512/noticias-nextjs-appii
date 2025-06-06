import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/libs/mongoDB";
import Usuario from "@/app/models/usuario";
import bcrypt from "bcryptjs";



export async function GET() {
  try {
    await connectDB();
    const usuarios = await Usuario.find();
    return NextResponse.json(usuarios, { status: 200 }); 

  } catch (error) {
    console.error("Error al obtener los usarios:", error);
    return NextResponse.json({ error: 'Error al obtener los usuarios' }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    await connectDB ();

    const data = await request.json();

    // Verificar que no estén vacíos los documentos
    const camposRequeridos = ["nombre", "apellido", "nombreusuario", "tipo", "contrasena", "correo", "telefono"];
    for (const campo of camposRequeridos) {
      if (!data[campo]) {
        return NextResponse.json({ error: `Falta el campo: ${campo}` }, { status: 400 });
      }
    }

    // Verificar si ya existe un usuario con ese correo
    const existeUsuario = await Usuario.findOne({ correo: data.correo });
    if (existeUsuario) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.contrasena, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      ...data,
      contrasena: hashedPassword,
    });

    await nuevoUsuario.save();

    // Devolver respuesta sin la contraseña
    const { contrasena, ...usuarioSinContrasena } = nuevoUsuario.toObject();

    return NextResponse.json(usuarioSinContrasena, { status: 201 });

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 500 });
  }
}


/*
Esto es lo que devuleve en postman
{
    "nombre": "Lino",
    "apellido": "Benavides",
    "nombreusuario": "linopaul",
    "tipo": "autor",
    "correo": "linobnavidesgabaldon@gmail.com",
    "telefono": "04121175910",
    "_id": "68352937775e694027454b07",
    "createdAt": "2025-05-27T02:53:43.957Z",
    "updatedAt": "2025-05-27T02:53:43.957Z",
    "__v": 0
}



*/