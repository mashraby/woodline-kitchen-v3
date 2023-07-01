import axios, { AxiosInstance } from "axios";

const token: string | null = window.localStorage.getItem("token");

export const authInstance: AxiosInstance = axios.create({
  baseURL: "http://64.226.90.160:4545",
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance: AxiosInstance = axios.create({
  baseURL: "http://64.226.90.160:4545",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});