import { useEffect } from "react";
import { Outlet } from "react-router";
import { useParams } from "react-router-dom";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

const MainLayout = () => {
  const { name } = useParams();

  useEffect(() => {
    document.title = `${name || "Inicio"} | MobDev Challenge`;
  }, [name]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="grid grid-rows-[auto,1fr,auto] flex-grow w-full">
        <Header />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-grow">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
