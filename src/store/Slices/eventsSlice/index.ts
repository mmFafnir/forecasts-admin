import { createSlice } from "@reduxjs/toolkit";
import { EnumStatus } from "../../../types/Status";
import { TypeEvent } from "./interface";
import { fetchEvents, updateEvent } from "./asyncActions";

interface IState {
  status: EnumStatus;
  events: TypeEvent[];
}

const initialState: IState = {
  events: [],
  status: EnumStatus.LOADING,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchEvents.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload;
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(fetchEvents.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });

    //update
    builder.addCase(updateEvent.pending, (state) => {
      state.status = EnumStatus.LOADING;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      console.log(action.payload);
      state.events = [
        ...state.events.map((event) => {
          if (event.id == action.payload.id)
            return { ...event, ...action.payload };
          return event;
        }),
      ];
      state.status = EnumStatus.SUCCESS;
    });
    builder.addCase(updateEvent.rejected, (state) => {
      state.status = EnumStatus.ERROR;
    });
  },
});

export default eventsSlice.reducer;
