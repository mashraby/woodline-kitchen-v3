import { AxiosResponse } from "axios";
import { instance } from "../config/axios.config";
import { IPerson } from "../interfaces/users.interfaces";

interface UsrAnalytics {
  user: IPerson;
  profit: number;
}

export const getUserAnalytics = (
  user: string,
  date: number
): Promise<UsrAnalytics> => {
  return instance
    .patch("/order/user/profit", {
      user,
      date,
    })
    .then((res: AxiosResponse) => res.data);
};

export interface TodayTushum {
  date: string;
  profit: number;
}

export const todaysTushum = (
  type: string,
  date: number
): Promise<TodayTushum> => {
  return instance
    .patch("/analitics/today", { type, date })
    .then((res: AxiosResponse) => res.data);
};

interface ChiqimDate {
  start: string;
  end: string;
}

export interface ChiqimInt {
  date: ChiqimDate;
  orders: number;
  sum: number;
}

export const todaysChiqim = (
  type: string,
  date: number
): Promise<ChiqimInt> => {
  return instance
    .patch("/analitics/today/spent", { type, date })
    .then((res: AxiosResponse) => res.data);
};

export interface FoydaInt {
  date: ChiqimDate;
  sum: number;
}

export const todaysFoyda = (type: string, date: number): Promise<FoydaInt> => {
  return instance
    .patch("/analitics/today/profit", { type, date })
    .then((res: AxiosResponse) => res.data);
};

export const getAnalytics = (
  type: string
): Promise<AxiosResponse<{ labels: string[]; datasets: any[] }>> => {
  return instance
    .get(`/analitics/stats?type=${type}`)
    .then((res: AxiosResponse) => res.data);
};
