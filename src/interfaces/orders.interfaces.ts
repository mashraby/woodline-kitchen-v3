interface IFood {
  _id: string;
  name: string;
  cost: number;
}

interface IOrderFood {
  _id: string;
  food: IFood;
  count: number;
}

interface IOrderUser {
  _id: string;
  fullname: string;
  password: string;
  phone_number: string;
  telegram_id: number;
  balance: number;
  is_active: boolean;
  role: string;
}

export interface IOrder {
  _id: string;
  user: IOrderUser;
  comment: string;
  foods: IOrderFood[];
  total_cost: number;
  is_given: boolean;
  is_canceled: boolean;
}

export interface IOrdersProps {
  orders?: IOrder[];
}

export interface IOrderPagination {
  orders: IOrder[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  usersOnPage: number;
}
