import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataMatchesFetch } from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchMatches = createAsyncThunk<IDataMatchesFetch, TFilter>(
  "matches/fetchMatches",
  async (params) => {
    const { limit = 10, page = 1, search = "" } = params;
    let url = "/get_match";
    url = url + `?limit=${limit}&offset=${page}&search=${search}`;
    const { data } = await axios.get(url);
    console.log(data);
    return data;
  }
);
