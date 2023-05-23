import axios, { AxiosInstance, AxiosResponse } from "axios";
import { instance } from "../config/axios.config";

interface UserData {
  id: string;
  date: number;
}

const userAnalyticsInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_PRODUCTION,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
  data: {
    user: "645e43332f37165dcdf1cc2a",
    date: 1684608076113,
  },
});

export const getUserAnalytics = () => {
  return userAnalyticsInstance
    .get("/order/user/profit")
    .then((res) => res.data);
};
