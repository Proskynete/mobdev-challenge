import {
  AllAPIResponse,
  GetRandomImagesResponse,
  ImageAPIResponse,
} from "../interfaces";
import { client } from "../utils/api";

const getAllBreeds = async () => {
  const { data } = await client.get<AllAPIResponse>("/api/breeds/list/all");
  return data;
};

const getBreedRandomImagesByName = async (breed: string) => {
  console.log(breed);
  const { data } = await client.get<GetRandomImagesResponse>(
    `/api/breed/${breed}/images`
  );
  return data;
};

const getSubBreedRandomImagesByName = async (
  breed: string,
  subBreed: string
) => {
  const { data } = await client.get<GetRandomImagesResponse>(
    `/api/breed/${breed}/${subBreed}/images`
  );
  return data;
};

const getBreedImageByName = async (breed: string) => {
  const { data } = await client.get<ImageAPIResponse>(
    `/api/breed/${breed}/images/random`
  );
  return data;
};

export const DogAPI = {
  getAllBreeds,
  getBreedRandomImagesByName,
  getSubBreedRandomImagesByName,
  getBreedImageByName,
};
