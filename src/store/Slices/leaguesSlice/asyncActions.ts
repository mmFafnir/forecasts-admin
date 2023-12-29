import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDataLeaguesFetch,
  IUpdateLeagueParams,
  TypeLeague,
} from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

export const fetchLeagues = createAsyncThunk<
  IDataLeaguesFetch,
  Pick<TFilter, "limit" | "page" | "search" | "favorite">
>("leagues/fetchLeague", async (params) => {
  const { limit = 10, page = 1, search = "", favorite } = params;
  let url = "/get_all_league";
  url = url + `?limit=${limit}&page=${page}&search=${search}`;
  if (favorite) {
    url = url + `&is_favorite=${favorite}`;
  }
  console.log(url);
  const { data } = await axios.get(url);
  console.log(data);
  return data.data;
});

export const updateLeague = createAsyncThunk<TypeLeague, IUpdateLeagueParams>(
  "teams/updateTeam",
  async (league) => {
    const { data } = await axios.post("/change_league", league);
    return data.data;
  }
);
