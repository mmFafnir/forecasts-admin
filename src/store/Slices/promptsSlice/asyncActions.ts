import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypePrompt } from "./interface";
import axios from "../../../core/axios";

export const fetchPrompts = createAsyncThunk<TypePrompt[]>(
  "prompts/fetchPrompts",
  async () => {
    const { data } = await axios.get("/get_all_promts");
    return data.data;
  }
);

interface IUpdateParams {
  description: string;
  promt_id: number;
}
export const updatePrompts = createAsyncThunk<TypePrompt, IUpdateParams>(
  "prompts/updatePrompts",
  async (params) => {
    const { data } = await axios.post("/update_promt", params);

    return data.data;
  }
);
