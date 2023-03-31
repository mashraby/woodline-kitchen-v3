interface IUser {
    _id: string
    fullname: string
}

export interface IPayment {
    _id: string
    user: IUser 
    amount: number
    balance: number
    date: string
    type: boolean
}

export interface IPaymentsProps {
    payments?: IPayment[]
    size: number
    page: number
}

export interface IPaymentPagination {
    payments: IPayment[];
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    usersOnPage: number;
  }