import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../core/axios";
import { ICreateDetailsRate, IUpdateDetailsRate } from "./interface";

export const fetchAllRate = createAsyncThunk("rate/fetchAllRate", async () => {
  const { data } = await axios.get("/all_rate");
  return data.data;
});

// create
export const createRate = createAsyncThunk(
  "rate/createRate",
  async (name: string) => {
    const { data } = await axios.post("/create_rate", {
      name,
    });

    console.log(data);
    return data.data;
  }
);

export const createDetailsRate = createAsyncThunk(
  "rate/createDetailsRate",
  async (rate: ICreateDetailsRate) => {
    const { data } = await axios.post("/create_rate_detail", rate);
    console.log(data);

    return data.data;
  }
);

// update
export const updateDetailsRate = createAsyncThunk(
  "rate/updateDetailsRate",
  async (rate: IUpdateDetailsRate) => {
    const { data } = await axios.post("/update_rate_detail", rate);
    console.log(data);

    return data.data;
  }
);

//delete
export const deleteRate = createAsyncThunk(
  "rate/deleteRate",
  async (id: number) => {
    const { data } = await axios.get(`/delete_rate?rate_id=${id}`);
    console.log(data);
    return id;
  }
);

//delete details
export const deleteDetailsRate = createAsyncThunk(
  "rate/deleteDetailsRate",
  async (id: number) => {
    const { data } = await axios.get(
      `/delete_rate_detail?rate_detail_id=${id}`
    );
    console.log(data);

    return id;
  }
);
