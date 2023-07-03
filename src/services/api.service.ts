import { AxiosResponse } from "axios";
import { authInstance, instance } from "../config/axios.config";
import { ICategory } from "../interfaces/categorys.interfaces";
import { IDeedline } from "../interfaces/deedline.interface";
import { IFood, IFoodById } from "../interfaces/foods.interfaces";
import { ILunch } from "../interfaces/lunchs.interfaces";
import { IOrder, IOrderPagination } from "../interfaces/orders.interfaces";
import {
  IPayment,
  IPaymentPagination,
} from "../interfaces/payments.interfacess";
import { ICreateProduct, IProduct } from "../interfaces/products.interface";
import { IRole } from "../interfaces/roles.interfaces";
import { IPerson, IUsersPagination } from "../interfaces/users.interfaces";
import { IWarehouse } from "../interfaces/warehouse.interface";

// LOGIN Service //

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return authInstance.post("/login", {
    username,
    password,
  });
};

// Users Service //

export const getUsers = (): Promise<Array<IPerson>> => {
  return instance.get("/user").then((res: AxiosResponse) => res.data);
};

export const getSearchUsers = (value: string): Promise<Array<IPerson>> => {
  return instance
    .get(`/user/search?tearms=${value}`)
    .then((res: AxiosResponse) => res.data);
};

export const getUsersPagination = (
  page: number,
  size: number
): Promise<IUsersPagination> => {
  return instance
    .get(`/user/pagination/?page=${page}&size=${size}`)
    .then((res: AxiosResponse) => res.data);
};

export const postBalance = (
  id: string,
  amount: number | undefined,
  type: boolean
): Promise<AxiosResponse> => {
  return instance.post("/user/balance", {
    id,
    amount,
    type,
    date: "2023-02-12",
  });
};

export const updateUserRole = (
  id: string,
  role: string
): Promise<AxiosResponse> => {
  return instance.put("/user", {
    id,
    role,
  });
};

export const updateUserStatus = (user: string, type: boolean) => {
  return instance.put("/user/status", {
    user,
    type,
  });
};

export const updateUsername = (
  id: string,
  fullname: string
): Promise<AxiosResponse> => {
  return instance.put("/user/fullname", {
    id,
    fullname,
  });
};

export const OneUserAnalytics = (type: string, id: string): Promise<any> => {
  return instance
    .get(`/analitics/user?type=${type}&id=${id}`)
    .then((res: AxiosResponse) => res.data);
};

// Roles Service //
export const getRoles = (): Promise<AxiosResponse> => {
  return instance.get("/role").then((res: AxiosResponse) => res);
};

export const postRole = (title: string): Promise<AxiosResponse> => {
  return instance.post("/role", {
    title,
  });
};

// Food Category Service //

export const getCategory = (): Promise<Array<ICategory>> => {
  return instance.get("/category").then((res) => res.data);
};

export const postCategory = (name: string): Promise<AxiosResponse> => {
  return instance.post("/category", {
    name,
  });
};

// Foods Service //

export const getFoods = (): Promise<Array<IFood>> => {
  return instance.get("/food").then((res: AxiosResponse) => res.data);
};

export const postFood = (
  name: string,
  cost: number | undefined,
  cook_percent: number,
  products_cost: number,
  category: string,
  products: Array<ICreateProduct>
): Promise<AxiosResponse> => {
  return instance.post("/food", {
    name,
    cost,
    cook_percent,
    products_cost,
    category,
    products,
  });
};

export const updateFoodPrice = (
  id: string,
  cost: number | undefined,
  cook_percent: number | undefined,
  name: string
): Promise<AxiosResponse> => {
  return instance.put(`/food/${id}`, {
    cost,
    cook_percent,
    name,
  });
};

export const foodById = (id: string): Promise<IFoodById> => {
  return instance.get(`/food/${id}`).then((res: AxiosResponse) => res.data);
};

export const searchFood = (name: string): Promise<IFood[]> => {
  return instance
    .get(`/food/search?name=${name}`)
    .then((res: AxiosResponse) => res.data);
};

// Orders Service //

export const getOrders = (): Promise<Array<IOrder>> => {
  return instance.get("/order").then((res: AxiosResponse) => res.data);
};

export const getPaginationOrders = (
  page: number,
  size: number
): Promise<IOrderPagination> => {
  return instance
    .get(`/order/pagination?page=${page}&size=${size}`)
    .then((res: AxiosResponse) => res.data);
};

// Payments Service //

export const getPayments = (): Promise<Array<IPayment>> => {
  return instance.get("/payment").then((res: AxiosResponse) => res.data);
};

export const getPaginationPayments = (
  page: number,
  size: number
): Promise<IPaymentPagination> => {
  return instance
    .get(`/payment/pagination?page=${page}&size=${size}`)
    .then((res: AxiosResponse) => res.data);
};

// Deedline Service //

export const getDeedlines = (): Promise<Array<IDeedline>> => {
  return instance.get("/deadline").then((res: AxiosResponse) => res.data);
};

export const updateDeedlines = (
  id: string,
  time: number | undefined
): Promise<AxiosResponse> => {
  return instance.put("/deadline", {
    id,
    time,
  });
};

// Products Service //

export const getProducts = (): Promise<Array<IProduct>> => {
  return instance.get("/product").then((res: AxiosResponse) => res.data);
};

export const postProduct = (
  name: string,
  cost: number
): Promise<AxiosResponse> => {
  return instance.post("/product", {
    name,
    cost,
  });
};

interface editProductData {
  id: string;
  name?: string;
  cost?: number;
}

export const editProduct = (
  editData: editProductData
): Promise<AxiosResponse> => {
  return instance.put("/product", editData);
};

export const addProductById = (
  food: string,
  product: string,
  amount: number
): Promise<AxiosResponse> => {
  return instance.post("/food/add", {
    food,
    product,
    amount,
  });
};

export const deleteProductById = (
  food: string,
  product: string
): Promise<AxiosResponse> => {
  return instance.delete("/food/del", {
    data: {
      food: food,
      product: product,
    },
  });
};

export const putProductAmount = (
  food: string,
  product: string,
  amount: number
): Promise<AxiosResponse> => {
  return instance.put("/food/product", {
    food,
    product,
    amount,
  });
};

export const searchProduct = (value: string): Promise<IProduct[]> => {
  return instance
    .get(`/product/search?name=${value}`)
    .then((res: AxiosResponse) => res.data);
};

// Lunchs Service //

export const getLunchs = (): Promise<Array<ILunch>> => {
  return instance.get("/trip").then((res: AxiosResponse) => res.data);
};

// Warehouse Service //

export const getWarehouses = (): Promise<Array<IWarehouse>> => {
  return instance.get("/warehouse").then((res: AxiosResponse) => res.data);
};

export const postWarehouse = (
  product: string | undefined,
  amount: number
): Promise<AxiosResponse> => {
  return instance.post("/warehouse", {
    product,
    amount,
  });
};

export const postWarehouseTake = (
  storedProduct: string,
  amount: number,
  type: boolean
): Promise<AxiosResponse> => {
  return instance.post("/warehouse/add-take", {
    storedProduct,
    amount,
    type,
  });
};

export const searchWarehouse = (value: string): Promise<IWarehouse[]> => {
  return instance
    .get(`/warehouse/search?product=${value}`)
    .then((res: AxiosResponse) => res.data);
};
