import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "./router/routes";
import { BreedProvider, defaultBreedValues } from "./contexts/breed.context";

const router = createBrowserRouter(routesConfig);

const App = () => {
  return (
    <BreedProvider
      allBreeds={[]}
      breeds={defaultBreedValues}
      handleSetBreeds={() => {}}
    >
      <RouterProvider router={router} />
    </BreedProvider>
  );
};

export { App };
