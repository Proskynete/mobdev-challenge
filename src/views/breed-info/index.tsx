import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { Fragment, useEffect, useState } from "react";
import { ViewWrapper } from "../../components/view-wrapper";
import { QUERY_KEYS } from "../../queries/constants";
import { useBreed } from "../../hooks/useBreed";

const BreedInfoView = () => {
  const { breeds } = useBreed();
  const navigate = useNavigate();
  const [subBreed, setSubBreed] = useState<string[] | null>(null);
  const { breed } = useParams();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (breeds) {
      const _breed = breeds.find(([_dogName]) => _dogName === breed);
      setSubBreed(_breed?.[1] || null);
    }
  }, [breeds, breed]);

  const { isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_IMAGES_BY_BREED_NAME, breed],
    queryFn: () => DogAPI.getBreedRandomImagesByName(breed!),
    onSuccess: (data) => {
      const entries = Object.entries(data?.message || {});
      if (entries.length < 18) return setImages(entries.map(([, url]) => url));
      else {
        const min = Math.floor(Math.random() * (entries.length - 18));
        const max = min + 18;
        setImages(entries.slice(min, max).map(([, url]) => url));
      }
    },
  });

  const handleClick = (subBreedName: string) => {
    navigate(`/breed/${breed}/sub-breed/${subBreedName}`);
  };

  return (
    <ViewWrapper
      loading={isFetching}
      noResults={!isFetching && !images}
      refetch={images.length >= 18 && refetch}
    >
      <div className="flex flex-col min-w-full">
        <div className="mb-8">
          <p className="text-2xl font-bold text-white">
            Raza seleccionada:
            <span className="capitalize text-blue-500 ml-2">{breed}</span>
          </p>

          <div className="flex text-white">
            Sub-razas:
            {subBreed?.length ? (
              <p className="flex capitalize text-blue-500 ml-2">
                {subBreed.map((subBreedName, i) => (
                  <Fragment key={`${subBreedName}-${i}`}>
                    <span
                      onClick={() => handleClick(subBreedName)}
                      className="cursor-pointer"
                    >
                      {subBreedName}
                    </span>
                    {i < subBreed.length - 1 ? ", " : ""}
                  </Fragment>
                ))}
              </p>
            ) : (
              <span className="capitalize ml-2">Ninguna 🐾</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {images?.map((url, i) => (
            <div
              key={`${breed}-${i}`}
              className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition duration-200"
            >
              <img
                src={url}
                alt={`${breed}-${i}`}
                className={`w-32 h-32 rounded-full object-cover object-center border-4 border-gray-700`}
                width="128"
                height="128"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </ViewWrapper>
  );
};

export default BreedInfoView;
