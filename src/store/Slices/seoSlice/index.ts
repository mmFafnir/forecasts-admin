import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { ISeo } from "./interface";
import { createSeo, fetchAllSeo } from "./asyncActions";

interface IState {
  seo: ISeo[];
  status: EnumStatus;
  sportId: number;
}

const initialState: IState = {
  seo: [],
  sportId: 1,
  status: EnumStatus.LOADING,
};

const seoSlice = createSlice({
  name: "seo",
  initialState,
  reducers: {
    clearSeo: (state) => {
      state.seo = [];
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchAllSeo.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });

    builder.addCase(fetchAllSeo.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.seo = action.payload.data;
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
      if (state.sportId !== action.payload.sportId) return;
      state.seo = [action.payload.data, ...state.seo];
    });

    builder.addCase(createSeo.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

export const { clearSeo } = seoSlice.actions;
export default seoSlice.reducer;
