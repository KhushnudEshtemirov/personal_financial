import Axios from "axios";
import { BASE_URL } from "../constants";
import { ExpensesType, IUser } from "../interfaces";

const axiosInterceptors = Axios.create({
  baseURL: BASE_URL,
});

axiosInterceptors.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const API = {
  //POST
  postUserCreate: (data: IUser) => axiosInterceptors.post("users", data),
  addNewExpense: (data: ExpensesType) =>
    axiosInterceptors.post("expenses/", data),

  //GET
  getUserFilter: ({ email, password }: { email: string; password: string }) =>
    axiosInterceptors.get(`users?email=${email}&password=${password}`),
  getAllExpensesData: ({ userId }: { userId: number }) =>
    axiosInterceptors.get(`expenses?userId=${userId}`),

  // UPDATE
  updateExpense: (data: ExpensesType, id: string) =>
    axiosInterceptors.patch(`expenses/${id}`, data),
};
