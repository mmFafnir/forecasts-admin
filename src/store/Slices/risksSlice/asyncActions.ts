import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypeRisk } from "./interface";
import axios from "../../../core/axios";

export const fetchRisks = createAsyncThunk<TypeRisk[]>(
  "risks/fetchRisks",
  async () => {
    const { data } = await axios.get("get_risks");

    return data.data;
  }
);
