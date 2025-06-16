import { createSlice } from "@reduxjs/toolkit";
import { User, Room } from "@/types";

const initialState: {
  user: User | null;
  room: Room | null;
} = {
  user: null,
  room: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.room = null;
    },
  },
});

export const { setUser, setRoom, logout } = appSlice.actions;
export default appSlice.reducer;
