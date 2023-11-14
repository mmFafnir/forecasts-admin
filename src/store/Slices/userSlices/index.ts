import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./asyncAction";
import { EnumStatus } from "../../../types/Status";
import { TypeUser } from "./interface";
// import Cookies from "universal-cookie";

// const cookies = new Cookies(null, { path: "/" });

interface IState {
  user: TypeUser | null;
  status: EnumStatus;
}

const initialState: IState = {
  user: null,
  status: EnumStatus.LOADING,
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
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
