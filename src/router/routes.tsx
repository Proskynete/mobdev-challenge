import HomeView from "../views/home";

export const routesConfig = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomeView />,
      },
    ],
  },
];
