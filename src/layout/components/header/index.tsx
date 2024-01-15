import { ChangeEvent, useEffect, useState } from "react";
import { useBreed } from "../../../hooks/useBreed";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "../../../components/select";

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

  const handleSelectSubBreed = (e: ChangeEvent<HTMLSelectElement>) => {
    const subBreeds = e.target.value;
    setFilter((prev) => ({ ...prev, subBreed: subBreeds }));
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
          <Select
            id="breeds"
            defaultLabel="Selecciona una raza"
            options={allBreeds}
            value={filter.breed}
            onChange={handleSelectBreed}
          />
        </div>
        <div className="w-full max-w-sm flex flex-row justify-center items-center gap-4">
          <Select
            id="subBreeds"
            defaultLabel="Selecciona una sub-raza"
            options={subBreeds!}
            value={filter.subBreed}
            onChange={handleSelectSubBreed}
          />
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
