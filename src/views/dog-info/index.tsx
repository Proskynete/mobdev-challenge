import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { useState } from "react";
import { LoadingView } from "../../components/loading-view";

const DogInfoView = () => {
  const { name } = useParams();
  const [images, setImages] = useState<string[]>([]);

  const { isFetching, refetch } = useQuery({
    queryKey: ["GET_IMAGES_BY_NAME", name],
    queryFn: () => DogAPI.getRandomImagesByName(name!),
    onSuccess: (data) => {
      const entries = Object.entries(data?.message || {});
      const min = Math.floor(Math.random() * (entries.length - 18));
      const max = min + 18;

      setImages(entries.slice(min, max).map(([, url]) => url));
    },
  });

  return (
    <LoadingView
      loading={isFetching}
      noResults={!isFetching && !images}
      refetch={refetch}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="mb-8">
          <p className="text-2xl font-bold text-white">
            Raza seleccionada:
            <span className="capitalize text-blue-500 ml-2">{name}</span>
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
