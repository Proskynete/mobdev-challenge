import { AllAPIResponse } from "../interfaces";
import { client } from "../utils/api";
import RESPONSE_DATA from "./__mock__.json";

// const getAll = async () => {
//   const { data } = await client.get<AllAPIResponse>("/api/breeds/list/all");
//   return data;
// };

const getAll = async () => {
  return new Promise<AllAPIResponse>((resolve) => {
    setTimeout(() => {
      const data = RESPONSE_DATA;
      resolve(data);
    }, 3000);
  });
};

const getImages = async (breed: string) => {
  const { data } = await client.get<AllAPIResponse>(
    `/api/breed/${breed}/images`
  );
  return data;
};

export const DogAPI = {
  getAll,
  getImages,
};
