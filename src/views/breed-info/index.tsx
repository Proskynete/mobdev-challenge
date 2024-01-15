import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { useEffect, useState } from "react";
import { ViewWrapper } from "../../components/view-wrapper";
import { useGetFetchQuery } from "../../queries";
import { QUERY_KEYS } from "../../queries/constants";
import { AllAPIResponse } from "../../interfaces";

const BreedInfoView = () => {
  const breeds = useGetFetchQuery<AllAPIResponse>(QUERY_KEYS.GET_ALL_BREEDS);
  const [subBreed, setSubBreed] = useState<string[] | null>(null);
  const { breed } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (breeds) {
      const entries = Object.entries(breeds?.message || {});
      const _breed = entries.find(([_dogName]) => _dogName === breed);
      setSubBreed(_breed?.[1] || null);
    }
  }, [breeds, breed]);

  const { isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_IMAGES_BY_BREED_NAME, breed],
    queryFn: () => DogAPI.getRandomImagesByName(breed!),
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
      <div className="flex flex-col">
        <div className="mb-8">
          <p className="text-2xl font-bold text-white">
            Raza seleccionada:
            <span className="capitalize text-blue-500 ml-2">{breed}</span>
          </p>

          <p className="flex text-white ">
            Sub-razas:
            {subBreed?.length ? (
              <p className="flex capitalize text-blue-500 ml-2">
                {subBreed.map((subBreedName, i) => (
                  <>
                    <span
                      key={`${subBreedName}-${i}`}
                      onClick={() => handleClick(subBreedName)}
                      className="cursor-pointer"
                    >
                      {subBreedName}
                    </span>
                    {i < subBreed.length - 1 ? ", " : ""}
                  </>
                ))}
              </p>
            ) : (
              <span className="capitalize ml-2">Ninguna 🐾</span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {images?.map((url, i) => (
            <div
              key={`${name}-${i}`}
              className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition duration-200 cursor-pointer"
            >
              <img
                src={url}
                alt={`${name}-${i}`}
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
