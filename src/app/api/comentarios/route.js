import { NextResponse } from 'next/server';
import  connectDB  from "@/app/libs/mongoDB";
import Comentario from '@/app/models/comentario';

//craer
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const nuevoComentario = new Comentario(data);
    await nuevoComentario.save();
    return NextResponse.json(nuevoComentario, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear comentario' }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB();
    const comentarios = await Comentario.find();
    return NextResponse.json(comentarios, { status: 200 }); 

  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    return NextResponse.json({ error: 'Error al obtener las comentarios' }, { status: 500 });
  }
}