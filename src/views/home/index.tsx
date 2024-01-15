import { useQuery } from "react-query";
import { DogAPI } from "../../services/api";
import { Card } from "../../components/card";
import { ViewWrapper } from "../../components/view-wrapper";
import { QUERY_KEYS } from "../../queries/constants";
import { useBreed } from "../../hooks/useBreed";

const HomeView = () => {
  const { breeds, handleSetBreeds } = useBreed();

  const { isFetching, refetch } = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_BREEDS],
    queryFn: () => DogAPI.getAllBreeds(),
    onSuccess: (data) => {
      handleSetBreeds(data);
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
