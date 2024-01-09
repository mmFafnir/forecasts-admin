import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
} from "./asyncAction";
import { EnumStatus } from "../../../types/Status";
import { TypeUser } from "./interface";
// import Cookies from "universal-cookie";

// const cookies = new Cookies(null, { path: "/" });

interface IState {
  user: TypeUser | null;
  status: EnumStatus;
  users: TypeUser[];
  total: number;
  page: number;
  errorMessage: string;
}

const initialState: IState = {
  user: null,
  status: EnumStatus.LOADING,
  users: [],
  total: 0,
  page: 0,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem("_token");
      // cookies.remove("_token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // get all users
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.current_page;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // create
    builder.addCase(createUser.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      // state.users = action.payload.data;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.errorMessage = action.error.message || "Ошибка валидации";
      state.status = EnumStatus.ERROR;
    });

    // delete
    builder.addCase(deleteUser.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.errorMessage = "Ошибка, попробуйте позже";
      state.status = EnumStatus.ERROR;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
