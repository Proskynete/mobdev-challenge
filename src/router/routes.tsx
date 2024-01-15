import MainLayout from "../layout/main";
import BreedInfoView from "../views/breed-info";
import HomeView from "../views/home";
import SubBreedInfoView from "../views/sub-breed-info";

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
            path: "sub-breed/:subBreed",
            element: <SubBreedInfoView />,
          },
        ],
      },
    ],
  },
];
