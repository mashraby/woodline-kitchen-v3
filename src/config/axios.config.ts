import axios, { AxiosInstance } from "axios";

const token: string | null = window.localStorage.getItem("token");

export const authInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_PRODUCTION,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_PRODUCTION,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
