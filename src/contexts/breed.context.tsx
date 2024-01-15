import { createContext, PropsWithChildren, useState } from "react";
import { AllAPIResponse } from "../interfaces";

type Breed = [string, string[]][];

export interface ConfigProviderProps {
  allBreeds: Breed;
  breeds: Breed;
  handleSetBreeds: (data: AllAPIResponse) => void;
}

export const defaultBreedValues: Breed = [];

const BreedContext = createContext<ConfigProviderProps>({
  allBreeds: defaultBreedValues,
  breeds: defaultBreedValues,
  handleSetBreeds: () => {},
});

export const BreedProvider = ({
  children,
  breeds,
}: PropsWithChildren<ConfigProviderProps>) => {
  const [allBreedsState, setAllBreedsState] = useState<Breed>(() => {
    const _breeds = localStorage.getItem("breeds");
    if (_breeds) return JSON.parse(_breeds);
    return breeds;
  });

  const [breedsState, setBreedsState] = useState<Breed>(() => {
    const _breeds = localStorage.getItem("breeds");
    if (_breeds) return JSON.parse(_breeds);
    return breeds;
  });

  const handleSetBreedsState = (data: AllAPIResponse) => {
    const entries = Object.entries(data?.message || {});
    const min = Math.floor(Math.random() * (entries.length - 15));
    const max = min + 15;

    localStorage.setItem("breeds", JSON.stringify(entries));
    setAllBreedsState(entries);
    setBreedsState(entries.slice(min, max));
  };

  return (
    <BreedContext.Provider
      value={{
        allBreeds: allBreedsState,
        breeds: breedsState,
        handleSetBreeds: handleSetBreedsState,
      }}
    >
      {children}
    </BreedContext.Provider>
  );
};

export const BreedCustomer = BreedContext.Consumer;
export { BreedContext };
