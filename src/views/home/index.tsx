import { useState } from "react";
import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { Card } from "../../components/card";
import { ViewWrapper } from "../../components/view-wrapper";
import { QUERY_KEYS } from "../../queries/constants";

type Breed = [string, string[]][];

const HomeView = () => {
  const [breeds, setBreeds] = useState<Breed | null>(null);

  const { isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_BREEDS],
    queryFn: () => DogAPI.getAll(),
    onSuccess: (data) => {
      const entries = Object.entries(data?.message || {});
      const min = Math.floor(Math.random() * (entries.length - 15));
      const max = min + 15;

      setBreeds(entries.slice(min, max));
    },
  });

  return (
    <ViewWrapper
      loading={isFetching}
      noResults={!isFetching && !breeds}
      refetch={refetch}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {breeds?.map(([name]) => <Card key={name} name={name} />)}
        </div>
      </div>
    </ViewWrapper>
  );
};

export default HomeView;
