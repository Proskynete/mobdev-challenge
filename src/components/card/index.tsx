import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface CardProps {
  name: string;
}

const Card = ({ name }: CardProps) => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["GET_DOG_IMAGE_BY_NAME", name],
    queryFn: () => DogAPI.getImageByName(name),
  });

  const handleClick = () => {
    navigate(`/${name}`);
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
