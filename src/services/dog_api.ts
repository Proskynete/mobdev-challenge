import { AllAPIResponse, ImageAPIResponse } from "../interfaces";
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
    }, 1000);
  });
};

const getImageByName = async (breed: string) => {
  const { data } = await client.get<ImageAPIResponse>(
    `/api/breed/${breed}/images/random`
  );
  return data;
};

export const DogAPI = {
  getAll,
  getImageByName,
};
