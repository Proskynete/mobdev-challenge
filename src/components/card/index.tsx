import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "../../queries/constants";

interface CardProps {
  name: string;
}

const Card = ({ name }: CardProps) => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_IMAGE_BY_BREED_NAME, name],
    queryFn: () => DogAPI.getBreedImageByName(name),
  });

  const handleClick = () => {
    navigate(`/breed/${name}`);
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition duration-200 cursor-pointer"
      onClick={handleClick}
    >
      {isLoading ? (
        <div className="w-32 h-32 rounded-full bg-gray-700 animate-pulse" />
      ) : (
        <img
          src={data?.message}
          alt={data?.message}
          className={`w-32 h-32 rounded-full object-cover object-center border-4 border-gray-700`}
          width="128"
          height="128"
          loading="lazy"
        />
      )}
      <p className="text-center font-bold text-white mt-3">{name}</p>
    </div>
  );
};

export { Card };
