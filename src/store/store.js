import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/LoginSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  devTools: true,
});
