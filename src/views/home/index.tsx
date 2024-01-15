import { useState } from "react";
import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { Card } from "../../components/card";
import { LoadingView } from "../../components/loading-view";

type Dog = [string, string[]][];

const HomeView = () => {
  const [dogs, setDogs] = useState<Dog | null>(null);

  const { isFetching, refetch } = useQuery({
    queryKey: ["GET_PAGINATED_DOGS"],
    queryFn: () => DogAPI.getAll(),
    onSuccess: (data) => {
      const entries = Object.entries(data?.message || {});
      const min = Math.floor(Math.random() * (entries.length - 15));
      const max = min + 15;

      setDogs(entries.slice(min, max));
    },
  });

  return (
    <LoadingView
      loading={isFetching}
      noResults={!isFetching && !dogs}
      refetch={refetch}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {dogs?.map(([name]) => <Card key={name} name={name} />)}
        </div>
      </div>
    </LoadingView>
  );
};

export default HomeView;
