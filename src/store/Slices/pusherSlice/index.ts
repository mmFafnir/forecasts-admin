import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypePusher } from "./interface";

export interface IStatePusher {
  message: TypePusher | null;
}

const initialState: IStatePusher = {
  message: null,
};

const pusherSlice = createSlice({
  name: "pusher",
  initialState,
  reducers: {
    setPusherMessage: (state, action: PayloadAction<TypePusher | null>) => {
      state.message = action.payload;
    },
  },
});

export const { setPusherMessage } = pusherSlice.actions;
export default pusherSlice.reducer;
