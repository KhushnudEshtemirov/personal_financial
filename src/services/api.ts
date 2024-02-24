import Axios from "axios";
import { BASE_URL } from "../constants";
import { DataType } from "../interfaces";

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
  addNewData: ({ url, data }: { url: string; data: DataType }) =>
    axiosInterceptors.post(url, data),

  //GET
  getUserFilter: ({ email, password }: { email: string; password: string }) =>
    axiosInterceptors.get(`users?email=${email}&password=${password}`),
  getAllData: ({ url, userId }: { url: string; userId: number }) =>
    axiosInterceptors.get(`${url}?userId=${userId}`),

  // UPDATE
  updateData: ({
    url,
    data,
    id,
  }: {
    url: string;
    data: DataType;
    id: string;
  }) => axiosInterceptors.patch(`${url + id}`, data),

  // DELETE
  deleteData: ({ url, id }: { url: string; id: string }) =>
    axiosInterceptors.delete(`${url + id}`),
};
