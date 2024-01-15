import MainLayout from "../layout/main";
import BreedInfoView from "../views/breed-info";
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
        path: "breed/:breed",
        children: [
          {
            index: true,
            element: <BreedInfoView />,
          },
          {
            path: "sub-breed/:subBreedName",
            element: <>Sub-breed</>,
          },
        ],
      },
    ],
  },
];
