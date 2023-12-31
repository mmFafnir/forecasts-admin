import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataTypeCountryFetch } from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchCountries = createAsyncThunk<
  IDataTypeCountryFetch,
  Pick<TFilter, "limit" | "page" | "search">
>("countries/fetchLeague", async (params) => {
  const { limit = 10, page = 1, search = "" } = params;
  console.log(search);
  let url = "/get_country";
  url = url + `?limit=${limit}&page=${page}&search=${search}`;
  const { data } = await axios.get(url);
  return data.data;
});
