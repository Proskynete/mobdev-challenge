import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "./router/routes";

const router = createBrowserRouter(routesConfig);

const App = () => {
  return <RouterProvider router={router} />;
};

export { App };
