import { ChangeEvent, useEffect, useState } from "react";
import { useBreed } from "../../../hooks/useBreed";
import { useNavigate, useParams } from "react-router-dom";

interface Filter {
  breed?: string;
  subBreed?: string;
}

const initialFilter: Filter = {
  breed: undefined,
  subBreed: undefined,
};

const Header = () => {
  const navigate = useNavigate();
  const { breed, subBreed } = useParams();

  const { allBreeds } = useBreed();
  const [subBreeds, setSubBreeds] = useState<string[] | null>(null);
  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    if (breed) {
      setFilter((prev) => ({ ...prev, breed }));
      const subBreeds = allBreeds?.find(([name]) => name === breed)?.[1];
      setSubBreeds(subBreeds || null);
    }

    if (subBreed) setFilter((prev) => ({ ...prev, subBreed }));
  }, [breed, subBreed, allBreeds]);

  const handleSelectBreed = (e: ChangeEvent<HTMLSelectElement>) => {
    const breedSelected = e.target.value;
    setFilter((prev) => ({ ...prev, breed: breedSelected }));

    const subBreeds = allBreeds?.find(([name]) => name === breedSelected)?.[1];
    setSubBreeds(subBreeds || null);

    if (subBreeds?.length === 1) {
      setFilter((prev) => ({ ...prev, subBreed: subBreeds[0] }));
    }
  };

  const handleSearch = () => {
    if (filter.subBreed && filter.breed)
      navigate(`/breed/${filter.breed}/sub-breed/${filter.subBreed}`);
    if (filter.breed) navigate(`/breed/${filter.breed}`);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 px-6 py-4">
      <h1 className="text-2xl font-bold text-white">mobdev challenge!</h1>
      <p className="text-center text-white">
        Encuentra imágenes (en forma aleatoria) de perros de raza.
      </p>

      <div className="w-full max-w-xl mt-6 flex flex-row justify-center items-center gap-4">
        FILTROS:
        <div className="w-full max-w-sm flex flex-row justify-center items-center gap-4">
          <select
            id="breeds"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleSelectBreed}
            value={filter.breed}
          >
            <option value="" selected disabled>
              Selecciona una raza
            </option>
            {allBreeds?.map(([name]) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full max-w-sm flex flex-row justify-center items-center gap-4">
          <select
            id="subBreeds"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              const subBreeds = e.target.value;
              setFilter((prev) => ({ ...prev, subBreed: subBreeds }));
            }}
            value={filter.breed}
            disabled={!filter.breed || subBreeds?.length === 0}
          >
            <option value="" selected>
              Selecciona una sub raza
            </option>
            {subBreeds?.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 !disabled:pointer-events-none !disabled:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          onClick={handleSearch}
          disabled={!filter.breed}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export { Header };
