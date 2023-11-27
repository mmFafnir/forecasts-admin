import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypeEvent, UpdateEventParams } from "./interface";
import axios from "../../../core/axios";
import { TFilter } from "../../../types/TypeFilter";

export const fetchEvents = createAsyncThunk<TypeEvent[], Partial<TFilter>>(
  "events/fetchEvents",
  async (params) => {
    const { search = "" } = params;

    const { data } = await axios.get(`get_events?search=${search}`);
    return data.data;
  }
);

export const updateEvent = createAsyncThunk<TypeEvent, UpdateEventParams>(
  "events/updateEvent",
  async (params) => {
    console.log(params);
    const { id, name } = params;

    const { data } = await axios.post(`change_event_new_name`, {
      event_id: id,
      show_name: name,
    });
    console.log(data);
    return data.data;
  }
);
