import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";
import { TypeSport } from "./interface";

export const fetchSports = createAsyncThunk<TypeSport[]>(
  "sports/fetchSports",
  async () => {
    const { data } = await axios.get("/get_sports_type");
    return data.data;
  }
);
