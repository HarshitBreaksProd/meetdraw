import { createSlice } from "@reduxjs/toolkit";
import { User, Room } from "@/types";

const initialState: {
  user: User | null;
  rooms: Room[] | null;
  homeView: "meetdraws" | "create-room" | "join-room" | "chat";
  activeRoom: Room | null;
  backgroundHaloPosition: { x: string; y: string } | null;
} = {
  user: null,
  rooms: null,
  homeView: "meetdraws",
  activeRoom: null,
  backgroundHaloPosition: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setHomeView: (state, action) => {
      state.homeView = action.payload;
    },
    setActiveRoom: (state, action) => {
      state.activeRoom = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.rooms = null;
    },
    setBackgroundHaloPosition: (state, action) => {
      state.backgroundHaloPosition = action.payload;
    },
  },
});

export const {
  setUser,
  setRooms,
  setHomeView,
  setActiveRoom,
  logout,
  setBackgroundHaloPosition,
} = appSlice.actions;
export default appSlice.reducer;
