import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataMatchesFetch } from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchMatches = createAsyncThunk<
  IDataMatchesFetch,
  Required<TFilter>
>("matches/fetchMatches", async (params) => {
  const { limit = 10, page = 1, search = "", date } = params;
  let url = "/get_match";
  url =
    url +
    `?limit=${limit}&offset=${page}&team_name=${search}&date_start=${date.start}`;

  console.log(url);
  const { data } = await axios.get(url);
  console.log(data);
  return data;
});
