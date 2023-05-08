import axios, { AxiosInstance } from "axios";

const url: string = "https://backend4devs.uz";
const token: string | null = window.localStorage.getItem("token")

export const authInstance: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});