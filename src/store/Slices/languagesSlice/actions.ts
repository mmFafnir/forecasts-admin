import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";
import { IUpdateLanguages, TypeLanguages } from "./interface";

// fetch
export const fetchLanguages = createAsyncThunk<TypeLanguages[]>(
  "languages/fetchLanguages",
  async () => {
    const { data } = await axios.get("/get_langs");
    return data.data;
  }
);

// update
interface IParamsUpdate {
  data: IUpdateLanguages;
  id: number;
}

export const updateLanguages = createAsyncThunk<TypeLanguages[], IParamsUpdate>(
  "languages/updateLanguages",
  async (params) => {
    console.log(params);
    const { data } = await axios.post(
      `/update_langs?lang_id=${params.id}`,
      params.data
    );
    console.log(data);
    return data.data;
  }
);
