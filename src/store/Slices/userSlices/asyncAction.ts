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

export const getAllUsers = createAsyncThunk<
  IFetchDataUsers,
  Pick<TFilter, "search">
>("user/getAllUsers", async (params) => {
  const { search } = params;
  const { data } = await axios.get(`/all_users?search=${search}`);
  return data.data;
});

interface IErrorMessage {
  message: { [key: string]: string[] };
}
export const createUser = createAsyncThunk<TypeUser, ICreateUser>(
  "user/createUser",
  async (params) => {
    try {
      const { data } = await axios.post("/create_new_admin", params);
      return data.message;
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

type TDeleteUser = number | string;
export const deleteUser = createAsyncThunk<TDeleteUser, TDeleteUser>(
  "user/deleteUser",
  async (id) => {
    const { data } = await axios.get(`/delete_admin?admin_id=${id}`);
    console.log(data);
    return id;
  }
);
