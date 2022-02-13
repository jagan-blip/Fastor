import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import Restaurant from "../Restaurants/Restaurant";
import { restaurantreq, resetrestaurant } from "../Restaurants/RestaurantSlice";
const Home = () => {
  const Restaurants = useSelector((state) => state.restaurant.restaurantdata);

  return (
    <div>
      <Header />
      <Restaurant />
    </div>
  );
};

export default Home;
