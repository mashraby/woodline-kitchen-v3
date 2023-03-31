import { IProduct } from "./products.interface";

interface IWarehouseProdoct {
  name: string;
  cost: number;
}

export interface IWarehouse {
  _id: string;
  product: IProduct;
  amount: number;
}

export interface IWarehouseProps {
  warehouses: IWarehouse[];
}

export interface IAddWarehouseProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAddTakeModalProps {
  takeOpen: boolean;
  setTakeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
}
