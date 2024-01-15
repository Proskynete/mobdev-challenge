import { useEffect, useState } from "react";
import { DogAPI } from "./services/dog_api";

const handleGetAllDogs = async () => {
  try {
    const { message } = await DogAPI.getAll();
    return message;
  } catch (error) {
    console.log(error);
  }
};

interface DogBreeds {
  [key: string]: string[];
}

const App = () => {
  const [dogs, setDogs] = useState<DogBreeds | null>(null);

  useEffect(() => {
    handleGetAllDogs().then((dogs) => {
      if (dogs) setDogs(dogs);
    });
  }, []);

  console.log(dogs);

  return (
    <div className="">
      <h1>MobDev Challenge!</h1>
    </div>
  );
};

export { App };
