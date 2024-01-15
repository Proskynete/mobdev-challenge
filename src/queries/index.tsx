import { useQueryClient } from "react-query";

export const useGetFetchQuery = <T,>(key: string) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<T>(key);
};
