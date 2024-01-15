import { useEffect } from "react";
import { Outlet } from "react-router";
import { useParams } from "react-router-dom";

const MainLayout = () => {
  const { name } = useParams();

  useEffect(() => {
    document.title = `${name || "Inicio"} | MobDev Challenge`;
  }, [name]);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 text-white">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col justify-center items-center min-h-28 bg-gray-800">
          <h1 className="text-2xl font-bold text-white">mobdev challenge!</h1>
          <p className="text-center text-white">
            Encuentra imágenes (en forma aleatoria) de perros de raza.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
