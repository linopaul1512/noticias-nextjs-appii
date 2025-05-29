import Link from "next/link";


interface Props {
  noticia: {
  id: string
  fecha: Date;
  titular: string;
  descripcion: string;
  imagen: string;
  cuerpo: string;
  categoria: string;
  iduser: string
  };
}



export default function NoticiaCard({ noticia }: Props) {
  return (
    <div className="card h-100">
      <img src={noticia.imagen} className="card-img-top" alt={noticia.titular} />
      <div className="card-body">
        <h5 className="card-title">{noticia.titular}</h5>
        <p className="card-text">{noticia.descripcion}</p>
        <Link href={`/noticia/${noticia.id}`} className="btn btn-primary">Leer más</Link>
      </div>
    </div>
  );
}
