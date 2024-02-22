export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface ExpensesType {
  id?: string;
  userId?: number | undefined;
  category: string;
  amount: string;
  date: string;
  description: string;
}
