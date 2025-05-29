"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  noticiaId: string;
  onClose: () => void;
  onComentarioCreado: (comentario: any) => void;
}

export default function ComentarioFormModal({ noticiaId, onClose, onComentarioCreado }: Props) {
  const [texto, setTexto] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/comentarios", {
      noticiaId,
      texto,
      usuario: usuarioautenticado, 

    onComentarioCreado(res.data);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Agregar comentario</h3>
        <form onSubmit={handleSubmit}>
          <textarea value={texto} onChange={e => setTexto(e.target.value)} required />
          <br />
          <button type="submit">Enviar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}
