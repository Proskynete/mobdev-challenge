import { useState } from "react";
import { DogAPI } from "./services/dog_api";
import { useQuery } from "react-query";
import { Card } from "./components/card";

type Dog = [string, string[]][];

const App = () => {
  const [dogs, setDogs] = useState<Dog | null>(null);

  const { isFetching, refetch } = useQuery({
    queryKey: ["GET_PAGINATED_DOGS"],
    queryFn: () => DogAPI.getAll(),
    onSuccess: (data) => {
      const entries = Object.entries(data?.message || {});
      const min = Math.floor(Math.random() * (entries.length - 15));
      const max = min + 15;

      setDogs(entries.slice(min, max));
    },
  });

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 text-white">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col justify-center items-center min-h-28 bg-gray-800">
          <h1 className="text-2xl font-bold text-white">mobdev challenge!</h1>
          <p className="text-center text-white">
            Encuentra imágenes (en forma aleatoria) de perros de raza.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
          {isFetching ? (
            <div className="flex flex-row justify-center items-center">
              <p className="text-center text-white">Cargando... 🐶</p>
            </div>
          ) : !isFetching && dogs && !dogs.length ? (
            <div className="flex flex-row justify-center items-center">
              <p className="text-center text-white">
                No se encontraron resultados.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-wrap justify-center items-center gap-6">
                {dogs?.map(([name]) => <Card key={name} name={name} />)}
              </div>

              <div className="flex flex-row justify-center items-center mt-10">
                <button
                  className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                  onClick={() => {
                    refetch();
                  }}
                >
                  Volver a buscar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { App };
