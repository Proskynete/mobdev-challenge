import axios, { AxiosError, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: `https://dog.ceo`,
  headers: {
    "Content-Type": "application/json",
  },
});

client.defaults.headers.common["Content-Type"] = "application/json";
client.defaults.headers.common.Accept = "application/json";

client.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) request.headers.Authorization = `Bearer ${token}`;

    return request;
  },
  (error: AxiosError) => Promise.reject(error)
);

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => Promise.reject(error)
);

export { client };
