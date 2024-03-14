import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDataLeaguesFetch,
  IUpdateLeagueParams,
  TypeLeague,
} from "./interface";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";

interface IParams
  extends Pick<
    TFilter,
    "limit" | "page" | "search" | "favorite" | "tir" | "country"
  > {}

export const fetchLeaguesApi = async (params: IParams) => {
  const { limit = 10, page = 1, search = "", favorite, tir, country } = params;
  let url = "/get_all_league";
  url =
    url +
    `?limit=${limit}&page=${page}&search=${search}&tir=${
      tir || ""
    }&league_cc=${country}`;
  if (favorite) {
    url = url + `&is_favorite=${favorite}`;
  }
  console.log(url);
  const { data } = await axios.get(url);
  console.log(data);
  return data.data;
};

export const fetchLeagues = createAsyncThunk<IDataLeaguesFetch, IParams>(
  "leagues/fetchLeague",
  fetchLeaguesApi
);

export const updateLeague = createAsyncThunk<TypeLeague, IUpdateLeagueParams>(
  "teams/updateTeam",
  async (league) => {
    const { data } = await axios.post("/change_league", league);
    return data.data;
  }
);
