import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFilter } from "../../../types/TypeFilter";
import axios from "../../../core/axios";
import { IDataTeamsFetch, ITeam, IUpdateTeamParams } from "./interface";

export const fetchTeams = createAsyncThunk<IDataTeamsFetch, TFilter>(
  "teams/fetchTeams",
  async (params) => {
    const { limit = 10, page = 1, search = "" } = params;
    let url = "/get_commands";
    url = url + `?limit=${limit}&page=${page}&search=${search}`;
    const { data } = await axios.get(url);
    return data.data;
  }
);

export const updateTeam = createAsyncThunk<ITeam, IUpdateTeamParams>(
  "teams/updateTeam",
  async (team) => {
    const { data } = await axios.post("/update_command", team);
    console.log(data)
    return data;
  }
);
