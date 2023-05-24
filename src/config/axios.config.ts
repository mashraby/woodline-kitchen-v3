import axios, { AxiosInstance } from "axios";

const token: string | null = window.localStorage.getItem("token");

export const authInstance: AxiosInstance = axios.create({
  baseURL: "https://backend4devs.uz",
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance: AxiosInstance = axios.create({
  baseURL: "https://backend4devs.uz",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});