import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDataCreateBookmaker,
  IDataUpdateBookmaker,
  TypeBookmaker,
} from "./interface";
import axios from "../../../core/axios";
import { TFilter } from "../../../types/TypeFilter";

export const fetchBookmakers = createAsyncThunk<
  TypeBookmaker[],
  Pick<TFilter, "limit" | "page" | "search">
>("bookmaker/fetchLeague", async (params) => {
  const { limit = 10, page = 1, search = "" } = params;
  console.log(search);
  let url = "/get_all_best_bookmaker";
  url = url + `?limit=${limit}&page=${page}&search=${search}`;
  const { data } = await axios.get(url);
  console.log(data);
  return data.data;
});

export const createBookmaker = createAsyncThunk<
  TypeBookmaker,
  IDataCreateBookmaker
>("bookmaker/createBookmaker", async (params) => {
  const url = "/create_best_bookmaker";
  const { data } = await axios.post(url, params);
  console.log(data);
  return data;
});

export const updateBookmaker = createAsyncThunk<
  TypeBookmaker,
  IDataUpdateBookmaker
>("bookmaker/updateBookmaker", async (params) => {
  const url = "/update_best_bookmaker";
  const { data } = await axios.post(url, params);
  console.log(data);
  return data;
});

export const deleteBookmaker = createAsyncThunk<number, number>(
  "bookmaker/deleteBookmaker",
  async (id) => {
    const url = `/delete_best_bookmaker/bookmaker_id=${id}`;
    const { data } = await axios.get(url);
    console.log(data);
    return data;
  }
);
