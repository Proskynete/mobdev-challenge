import { PropsWithChildren } from "react";

interface ViewWrapperProps {
  loading: boolean;
  noResults: boolean;
  refetch?: (() => void) | boolean;
}

const ViewWrapper = ({
  loading,
  noResults,
  children,
  refetch,
}: PropsWithChildren<ViewWrapperProps>) => {
  return (
    <>
      {loading ? (
        <div className="flex flex-row justify-center items-center">
          <p className="text-center text-white">Cargando... 🐶</p>
        </div>
      ) : !loading && noResults ? (
        <div className="flex flex-row justify-center items-center">
          <p className="text-center text-white">
            No se encontraron resultados.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {children}

          {!!refetch && (
            <div className="flex flex-row justify-center items-center mt-10">
              <button
                className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                onClick={() => {
                  if (typeof refetch === "function") refetch();
                }}
              >
                Volver a buscar
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { ViewWrapper };
