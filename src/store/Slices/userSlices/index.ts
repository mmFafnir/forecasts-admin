import { createSlice } from "@reduxjs/toolkit";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  getAllUsers,
  getUserInfo,
  updateAdmin,
} from "./asyncAction";
import { EnumStatus } from "../../../types/Status";
import { TypeUser } from "./interface";
// import Cookies from "universal-cookie";

// const cookies = new Cookies(null, { path: "/" });

interface IState {
  user: TypeUser | null;
  status: EnumStatus;
  admins: TypeUser[];
  users: TypeUser[];
  total: number;
  page: number;
  errorMessage: string;
}

const initialState: IState = {
  user: null,
  status: EnumStatus.LOADING,
  admins: [],
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

    // get all admins
    builder.addCase(getAllAdmins.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(getAllAdmins.fulfilled, (state, action) => {
      state.admins = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.current_page;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(getAllAdmins.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // create
    builder.addCase(createAdmin.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.admins = [...state.admins, action.payload];
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(createAdmin.rejected, (state, action) => {
      state.errorMessage = action.error.message || "Ошибка валидации";
      state.status = EnumStatus.ERROR;
    });

    // delete
    builder.addCase(deleteAdmin.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.admins = state.admins.filter(
        (admin) => admin.id !== action.payload
      );
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(deleteAdmin.rejected, (state) => {
      state.errorMessage = "Ошибка, попробуйте позже";
      state.status = EnumStatus.ERROR;
    });

    // update
    builder.addCase(updateAdmin.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      state.admins = state.admins.map((admin) => {
        if (admin.id === action.payload.id) {
          return action.payload;
        }
        return admin;
      });
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(updateAdmin.rejected, (state) => {
      state.errorMessage = "Ошибка, попробуйте позже";
      state.status = EnumStatus.ERROR;
    });

    // users
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
