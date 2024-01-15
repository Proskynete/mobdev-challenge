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
    <div className="w-screen h-screen flex flex-col bg-gray-900 text-white">
      <div className="grid grid-rows-[7rem,1fr,5rem] h-full">
        <Header />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 ">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
