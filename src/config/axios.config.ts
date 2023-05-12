import axios, { AxiosInstance } from "axios";

const url: string = "http://localhost:5050";
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