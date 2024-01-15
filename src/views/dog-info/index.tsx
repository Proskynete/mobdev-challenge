import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { useEffect, useState } from "react";
import { LoadingView } from "../../components/loading-view";
import { useGetFetchQuery } from "../../queries";
import { QUERY_KEYS } from "../../queries/constants";
import { AllAPIResponse } from "../../interfaces";

const DogInfoView = () => {
  const dogs = useGetFetchQuery<AllAPIResponse>(QUERY_KEYS.GET_ALL_DOGS);
  const [subBreed, setSubBreed] = useState<string[] | null>(null);
  const { name } = useParams();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (dogs) {
      const entries = Object.entries(dogs?.message || {});
      const dog = entries.find(([dogName]) => dogName === name);
      setSubBreed(dog?.[1] || null);
    }
  }, [dogs, name]);

  const { isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_IMAGE_BY_DOG_NAME, name],
    queryFn: () => DogAPI.getRandomImagesByName(name!),
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

  return (
    <LoadingView
      loading={isFetching}
      noResults={!isFetching && !images}
      refetch={images.length >= 18 && refetch}
    >
      <div className="flex flex-col">
        <div className="mb-8">
          <p className="text-2xl font-bold text-white">
            Raza seleccionada:
            <span className="capitalize text-blue-500 ml-2">{name}</span>
          </p>

          <p className="text-white">
            Sub-razas:
            {subBreed?.length ? (
              <span className="capitalize text-blue-500 ml-2">
                {subBreed.join(", ")}
              </span>
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
    </LoadingView>
  );
};

export default DogInfoView;
