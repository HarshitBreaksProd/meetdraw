import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/meetdraw/appSlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            app: appReducer,
        },
    });
};
