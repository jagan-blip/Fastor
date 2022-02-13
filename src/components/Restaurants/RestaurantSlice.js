import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { resetstate } from "../Login/LoginSlice";

export const restaurantreq = createAsyncThunk(
  "restaurant/restaurantreq",
  async (obj) => {
    let header = {
      Authorization: window.sessionStorage.getItem("Token"),
    };
    const response = await axios.get(
      `https://staging.fastor.in/v1/m/restaurant?city_id=${obj.city_id}&=&=`,
      {
        headers: header,
      }
    );

    return response.data;
  }
);
const RestaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurantdata: [],
    status: null,
  },
  reducers: {
    resetrestaurant: (state) => {
      state.restaurantdata = [];
      state.status = null;
    },
  },
  extraReducers: {
    [restaurantreq.pending]: (state) => {
      state.status = "loading";
    },
    [restaurantreq.fulfilled]: (state, { payload }) => {
      state.restaurantdata = payload;
      state.status = "success";
    },
    [restaurantreq.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { resetrestaurant } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
