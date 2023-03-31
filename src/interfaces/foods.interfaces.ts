import { ICategory } from "./categorys.interfaces";
import { IProduct } from "./products.interface";

export interface IFood {
  _id: string;
  name: string;
  cost: number;
  category: string;
  products: IProduct[];
}

interface IFoodByIdCtg {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
  __v: number
}

interface IFoodByIdProduct {
  _id: string;
  amount: number;
  product: Product;
}

export interface IFoodById {
  _id: string;
  name: string;
  cost: number;
  category: IFoodByIdCtg;
  products: IFoodByIdProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number
}

export interface IFoodProps {
  foods: IFood[];
}

export interface IAddFoodProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IChangeFoodProps {
  changeOpen: boolean;
  setChangeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  oldCost?: number;
  foodId: string;
}


export interface IAddNewProductProps {
  newProdOpen: boolean
  setNewProdOpen: React.Dispatch<React.SetStateAction<boolean>>
  foodId: string | undefined
}