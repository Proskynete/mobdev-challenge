import { ChangeEvent, useEffect, useState } from "react";
import { useBreed } from "../../../hooks/useBreed";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "../../../components/select";
import { Button } from "../../../components/button";

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
    const subBreed = e.target.value;
    setFilter({ ...filter, subBreed: subBreed });
  };

  const handleSearch = () => {
    if (!filter.breed && !filter.subBreed) {
      navigate("/");
    }

    if (filter.breed && !filter.subBreed) {
      navigate(`/breed/${filter.breed}`);
    }
    if (filter.subBreed && filter.breed) {
      navigate(`/breed/${filter.breed}/sub-breed/${filter.subBreed}`);
    }
  };

  const handleClear = () => {
    navigate("/");
    setFilter(initialFilter);
    setSubBreeds(null);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 px-6 py-4">
      <h1 className="text-2xl font-bold text-white">mobdev challenge!</h1>
      <p className="text-center text-white">
        Encuentra imágenes (en forma aleatoria) de perros por raza y sub-raza.
      </p>

      <div className="w-full max-w-xl mt-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <p className="text-white">FILTROS:</p>

        <Select
          id="breeds"
          defaultLabel="Selecciona una raza"
          options={allBreeds}
          value={filter.breed || ""}
          onChange={handleSelectBreed}
        />

        <Select
          id="subBreeds"
          defaultLabel="Selecciona una sub-raza"
          options={subBreeds || []}
          value={filter.subBreed || ""}
          onChange={handleSelectSubBreed}
          disabled={!filter.breed}
        />

        <Button onClick={handleSearch} disabled={!filter.breed}>
          Buscar
        </Button>

        <Button
          variant="outlined"
          onClick={handleClear}
          disabled={!filter.breed || !filter.subBreed}
        >
          Limpiar
        </Button>
      </div>
    </div>
  );
};

export { Header };
