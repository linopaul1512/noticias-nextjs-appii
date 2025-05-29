type Props = {
  titular: string;
  descripcion: string;
  imagen: string;
};

export default function NoticiaPrincipal({ titular, descripcion, imagen }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 my-8">
      <div className="flex-1">
        <h2 className="text-3xl font-bold">{titular}</h2>
        <p className="mt-2 text-gray-600">{descripcion}</p>
      </div>
      <img src={imagen} alt="imagen noticia" className="w-full md:w-1/2 rounded-lg" />
    </div>
  );
}
