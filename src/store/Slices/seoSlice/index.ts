import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { ISeo } from "./interface";
import { createSeo, fetchAllSeo } from "./asyncActions";

interface IState {
  seo: ISeo[];
  status: EnumStatus;
}

const initialState: IState = {
  seo: [],
  status: EnumStatus.LOADING,
};

const seoSlice = createSlice({
  name: "seo",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchAllSeo.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });

    builder.addCase(fetchAllSeo.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.seo = action.payload;
    });

    builder.addCase(fetchAllSeo.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    //create
    builder.addCase(createSeo.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });

    builder.addCase(createSeo.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.seo = [action.payload, ...state.seo];
    });

    builder.addCase(createSeo.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

export default seoSlice.reducer;
