import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFilter, TypeChatGptTextStatus } from "../../../types/TypeFilter";

export interface IDateFilter {
  start: string;
  finish: string;
}

interface IState extends Omit<TFilter, "page"> {}

const initialState: IState = {
  limit: 10,
  search: "",
  statusMatch: "",
  country: "",
  league: "",
  date: {
    start: "",
    finish: "",
  },
  favorite: false,
  chat_gpt_text_status: "",
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
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setLeague: (state, action: PayloadAction<string>) => {
      state.league = action.payload;
    },
    setChatGptTextStatus: (
      state,
      action: PayloadAction<TypeChatGptTextStatus>
    ) => {
      state.chat_gpt_text_status = action.payload;
    },
    setStatusMatch: (state, action: PayloadAction<string>) => {
      state.statusMatch = action.payload;
    },
    setFavorite: (state, action: PayloadAction<boolean>) => {
      state.favorite = action.payload;
    },
  },
});

export const {
  setLimit,
  setSearch,
  setDate,
  setChatGptTextStatus,
  setLeague,
  setCountry,
  setStatusMatch,
  setFavorite,
} = filterSlice.actions;

export default filterSlice.reducer;
