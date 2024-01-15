import { useQuery } from "react-query";
import { DogAPI } from "../services/dog_api";

interface CardProps {
  name: string;
}

const Card = ({ name }: CardProps) => {
  const { data } = useQuery({
    queryKey: ["GET_DOG_IMAGE_BY_NAME", name],
    queryFn: () => DogAPI.getImageByName(name),
  });

  return (
    <div className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition duration-200 cursor-pointer">
      <img
        src={data?.message}
        alt={data?.message}
        className="w-32 h-32 rounded-full"
      />
      <p className="text-center font-bold text-white mt-3">{name}</p>
    </div>
  );
};

export { Card };
