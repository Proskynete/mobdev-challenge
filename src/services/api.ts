import {
  AllAPIResponse,
  GetRandomImagesResponse,
  ImageAPIResponse,
} from "../interfaces";
import { client } from "../utils/api";

const getAll = async () => {
  const { data } = await client.get<AllAPIResponse>("/api/breeds/list/all");
  return data;
};

const getRandomImagesByName = async (name: string) => {
  const { data } = await client.get<GetRandomImagesResponse>(
    `/api/breed/${name}/images`
  );
  return data;
};

const getImageByName = async (breed: string) => {
  const { data } = await client.get<ImageAPIResponse>(
    `/api/breed/${breed}/images/random`
  );
  return data;
};

export const DogAPI = {
  getAll,
  getRandomImagesByName,
  getImageByName,
};
