import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";
import { TypeUser } from "./interface";

export const getUserInfo = createAsyncThunk<TypeUser>(
  "user/getUserInfo",
  async () => {
    const { data } = await axios.post("/auth_user_info");
    console.log(data);
    return data.user;
  }
);
