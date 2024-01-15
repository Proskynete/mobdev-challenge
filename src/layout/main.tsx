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
        <div className="flex flex-col justify-center items-center min-h-28 bg-gray-800 px-6">
          <h1 className="text-2xl font-bold text-white">mobdev challenge!</h1>
          <p className="text-center text-white">
            Encuentra imágenes (en forma aleatoria) de perros de raza.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 ">
          <Outlet />
        </div>

        <div className="flex flex-col justify-center items-center bg-gray-800 py-4">
          <div className="flex flex-col mb-2 text-sm text-gray-500 text-center">
            <pre className="text-xs text-gray-800 dark:text-gray-100">
              &gt; $ cd ~/eduardoalvarez.dev/2024
              <span className="w-1 h-4 inline-block bg-primary-800 ml-2 rounded-sm motion-safe:animate-ping motion-safe:duration-75"></span>
            </pre>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <a href="https://eduardoalvarez.dev">eduardoalvarez.dev</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
