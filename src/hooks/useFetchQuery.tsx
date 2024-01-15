import { useQueryClient } from "react-query";

export const useFetchQuery = <T,>(key: string) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<T>(key);
};
