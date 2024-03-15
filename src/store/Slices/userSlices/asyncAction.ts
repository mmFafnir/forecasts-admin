import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";
import { ICreateUser, IFetchDataUsers, TypeUser } from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import { AxiosError } from "axios";

export const getUserInfo = createAsyncThunk<TypeUser>(
  "user/getUserInfo",
  async () => {
    const { data } = await axios.post("/auth_user_info");
    console.log(data);
    return data.user;
  }
);

export const getAllAdmins = createAsyncThunk<
  IFetchDataUsers,
  Pick<TFilter, "search">
>("user/getAllAdmins", async (params) => {
  const { search } = params;
  console.log(search);
  const { data } = await axios.get(`/get_admins`);
  return data;
});

interface IErrorMessage {
  message: { [key: string]: string[] };
}
export const createAdmin = createAsyncThunk<TypeUser, ICreateUser>(
  "user/createAdmin",
  async (params) => {
    try {
      const { data } = await axios.post("/create_new_admin", params);
      return data.data;
    } catch (error) {
      const err = error as AxiosError<IErrorMessage>;
      const obj = err.response?.data.message;
      if (!obj) throw Error("Ошибка валидации");
      const keys = Object.keys(obj);
      const message = obj[keys[0]];
      throw Error(message[0]);
    }
  }
);

type TDeleteAdmin = number | string;
export const deleteAdmin = createAsyncThunk<TDeleteAdmin, TDeleteAdmin>(
  "user/deleteAdmin",
  async (id) => {
    const { data } = await axios.get(`/delete_admin?admin_id=${id}`);
    console.log(data);
    return id;
  }
);

interface IUpdateAdmin {
  id: number | string;
  data: ICreateUser;
}
export const updateAdmin = createAsyncThunk<TypeUser, IUpdateAdmin>(
  "user/updateAdmin",
  async (params) => {
    const { data } = await axios.post(
      `/update_admin?admin_id=${params.id}`,
      params.data
    );
    return data.data;
  }
);

// Users
export const getAllUsers = createAsyncThunk<
  IFetchDataUsers,
  Pick<TFilter, "search" | "page" | "limit">
>("user/getAllUsers", async (params) => {
  const { search, page, limit } = params;
  const { data } = await axios.get(
    `/all_users?search=${search}&page=${page}&limit=${limit}`
  );
  return data.data;
});
