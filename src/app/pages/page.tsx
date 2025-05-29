import Navbar from "../components/navbar";
import Footer from "../components/footer";
import NoticiaCard from "../components/tarjetaNoticias";
export default function HomePage() {
  const noticiasDestacadas = [
    {
      id: "1",
      titulo: "TITULO PRINCIPAL",
      descripcion: "Lorem Ipsum dolor sit amet y todo eso...",
      imagen: "/noticia1.jpg",
    },
    {
      id: "2",
      titulo: "Titulo",
      descripcion: "lorem ipsum bla bla",
      imagen: "/noticia2.jpg",
    },
  ];

  return (
    <div>
      <Navbar />
      <main className="container mt-5">
        <section className="row mb-4">
          <div className="col-md-8">
            <h1 className="display-4">{noticiasDestacadas[0].titulo}</h1>
            <p>{noticiasDestacadas[0].descripcion}</p>
          </div>
          <div className="col-md-4">
            <img src={noticiasDestacadas[0].imagen} className="img-fluid rounded" alt="Noticia principal" />
          </div>
        </section>

        <section className="row">
          {noticiasDestacadas.slice(1).map((noticia) => (
            <div key={noticia.id} className="col-md-4 mb-4">
              <NoticiaCard noticia={noticia} />
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
