import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFilter, TypeChatGptTextStatus } from "../../../types/TypeFilter";
import { SidebarMenu } from "../../../components/Sidebar/SidebarMenu";

export interface IDateFilter {
  start: string;
  finish: string;
}

interface IState extends Omit<TFilter, "page"> {
  menu: string;
}

const initialState: IState = {
  limit: 10,
  menu:
    SidebarMenu.find((item) => item.href.includes(window.location.pathname))
      ?.menu || "general",
  search: "",
  statusMatch: "",
  country: "",
  league: "",
  tir: "",
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
    setTir: (state, action: PayloadAction<string>) => {
      state.tir = action.payload;
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

    setMenu: (state, action: PayloadAction<string>) => {
      state.menu = action.payload;
    },

    setDefaultFilter: (state) => {
      console.log("filter redux out");
      state.country = initialState.country;
      state.chat_gpt_text_status = initialState.chat_gpt_text_status;
      state.date = initialState.date;
      state.favorite = initialState.favorite;
      state.league = initialState.league;
      state.search = initialState.search;
      state.statusMatch = initialState.statusMatch;
      state.tir = initialState.tir;
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
  setTir,
  setMenu,
  setDefaultFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
