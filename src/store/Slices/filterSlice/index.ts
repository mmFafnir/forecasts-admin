import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IDateFilter {
  start: string;
  finish: string;
}

interface IState {
  limit: number | string;
  search: string;
  date: IDateFilter;
}

const initialState: IState = {
  limit: 10,
  search: "",
  date: {
    start: "",
    finish: "",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setDate: (state, action: PayloadAction<IDateFilter>) => {
      state.date = action.payload;
    },
  },
});

export const { setLimit, setSearch, setDate } = filterSlice.actions;

export default filterSlice.reducer;
