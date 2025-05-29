"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ComentarioFormModal from "@/app/components/comentarioFormModal";
import axios from "axios";

interface NoticiaType {
  _id: string;
  titular: string;
  descipcion: string;
  cuerpo: string;
  imagen: string;
  iduser: string;
  categoría: string;
  fecha: string;
}

interface ComentarioType {
  _id: string;
  texto: string;
  usuario: string;
  noticiaId: string;
  createdAt: string;
}

export default function NoticiaDetalle() {
  const [noticia, setNoticia] = useState<NoticiaType | null>(null);
  const [autor, setAutor] = useState<string>("");
  const [comentarios, setComentarios] = useState<ComentarioType[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchNoticia = async () => {
      const res = await axios.get(`/api/noticias/${id}`);
      setNoticia(res.data);

      // Obtener nombre del autor:
      const usuario = await axios.get(`/api/usuarios/${res.data.iduser}`);
      setAutor(usuario.data.nombre);
    };

    const fetchComentarios = async () => {
      const res = await axios.get(`/api/comentarios?noticiaId=${id}`);
      setComentarios(res.data);
    };

    fetchNoticia();
    fetchComentarios();
  }, [id]);

  if (!noticia) return <div>Cargando noticia...</div>;

  return (
    <div className="container">
      <h1>{noticia.titular}</h1>
      <p><strong>Autor:</strong> {autor}</p>
      <img src={noticia.imagen} alt="Imagen de la noticia" style={{ maxWidth: "100%" }} />
      <p><strong>{noticia.descipcion}</strong></p>
      <div>{noticia.cuerpo}</div>

      <hr />
      <h2>Comentarios</h2>
      <button onClick={() => setMostrarModal(true)}>Agregar comentario</button>

      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <div key={comentario._id}>
            <p><strong>{comentario.usuario}</strong>: {comentario.texto}</p>
            <p><em>{new Date(comentario.createdAt).toLocaleString()}</em></p>
          </div>
        ))
      ) : (
        <p>No hay comentarios aún.</p>
      )}

      {mostrarModal && (
        <ComentarioFormModal
          noticiaId={id as string}
          onClose={() => setMostrarModal(false)}
          onComentarioCreado={nuevo => setComentarios(prev => [nuevo, ...prev])}
        />
      )}
    </div>
  );
}
