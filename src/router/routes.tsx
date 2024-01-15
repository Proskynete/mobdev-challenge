import MainLayout from "../layout/main";
import DogInfoView from "../views/dog-info";
import HomeView from "../views/home";

export const routesConfig = [
  {
    element: <MainLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: ":name",
        element: <DogInfoView />,
      },
    ],
  },
];
