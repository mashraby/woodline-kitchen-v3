import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
  baseURL: "https://backend4devs.uz",
  headers: {
    "Content-Type": "application/json",
  },
});
