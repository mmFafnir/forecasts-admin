import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeBookmaker } from "./interface";
import {
  createBookmaker,
  deleteBookmaker,
  fetchBookmakers,
} from "./asyncActions";

interface IState {
  bookmakers: TypeBookmaker[];
  status: EnumStatus;
  total: number;
  page: number;
}

const initialState: IState = {
  bookmakers: [],
  status: EnumStatus.LOADING,
  total: 1,
  page: 1,
};

const bookmakersSlice = createSlice({
  name: "bookmakers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchBookmakers.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchBookmakers.fulfilled, (state, action) => {
      state.bookmakers = action.payload;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(fetchBookmakers.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // post
    builder.addCase(createBookmaker.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(createBookmaker.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.bookmakers = [action.payload, ...state.bookmakers];
    });
    builder.addCase(createBookmaker.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    // // update
    // builder.addCase(createBookmaker.pending, (state) => {
    //   state.status = EnumStatus.LOADING;
    // });
    // builder.addCase(createBookmaker.fulfilled, (state, action) => {
    //   state.status = EnumStatus.SUCCESS;
    //   state.bookmakers = [action.payload, ...state.bookmakers];
    // });
    // builder.addCase(createBookmaker.rejected, (state) => {
    //   state.status = EnumStatus.ERROR;
    // });

    // delete
    builder.addCase(deleteBookmaker.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(deleteBookmaker.fulfilled, (state, action) => {
      state.status = EnumStatus.SUCCESS;
      state.bookmakers = [
        ...state.bookmakers.filter((item) => item.id !== action.payload),
      ];
    });
    builder.addCase(deleteBookmaker.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

// export const {} = countriesSlice.actions;

export default bookmakersSlice.reducer;
