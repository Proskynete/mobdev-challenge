export interface AllAPIResponse {
  message: {
    [key: string]: string[];
  };
  status: string;
}

export interface ImageAPIResponse {
  message: string;
  status: string;
}

export interface GetRandomImagesResponse {
  message: string[];
  status: string;
}
