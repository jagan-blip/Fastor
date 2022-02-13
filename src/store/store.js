import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/LoginSlice";
import restaurantReducer from "../components/Restaurants/RestaurantSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    restaurant: restaurantReducer,
  },
  devTools: true,
});
