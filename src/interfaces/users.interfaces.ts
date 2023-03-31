interface IRole {
  title: string;
  _id: string;
}

export interface IPerson {
  _id: string;
  fullname: string;
  phone_number: string;
  telegram_id: number;
  balance: number;
  is_active: boolean;
  role: IRole;
  is_verified: boolean;
}

export interface IUsersPagination {
  users: IPerson[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  usersOnPage: number;
}

// export interface

export interface UsersTableProps {
  users?: IPerson[];
}

export interface IRow {
  id: number;
  user_id: string;
  fullname: string;
  phone_number: string;
  telegram_id: number;
  balance: number;
}

export interface IOpenModalProps {
  userId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}
export interface IOpenModalUserProps {
  userId: string;
  openUser: boolean;
  userRole: string;
  setOpenUser: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  balance: number | undefined;
}
