import { useContext } from "react";
import { BreedContext } from "../contexts/breed.context";

const useBreed = () => {
  const context = useContext(BreedContext);
  return context;
};

export { useBreed };
