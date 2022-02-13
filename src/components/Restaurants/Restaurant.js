import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Restaurant.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resetrestaurant, restaurantreq } from "./RestaurantSlice";
import { useNavigate } from "react-router-dom";
const Restaurant = () => {
  const Restaurants = useSelector((state) => state.restaurant.restaurantdata);
  let data = {
    city_id: 118,
  };
  console.log(Restaurants);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(restaurantreq(data));
  }, [dispatch]);
  return (
    <div>
      <div className="cont">
        <h1 style={{}}>Restaurants</h1>

        {Restaurants != null && Restaurants.length > 0 ? (
          Restaurants.map((item) => (
            <div
              style={{ marginTop: "5%" }}
              className="list"
              key={item.restaurant_id}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/details/${item.restaurant_id}`);
              }}
            >
              <Row>
                <Col xs={4}>
                  <img className="restaurantimg" src={item.images[0].url}></img>
                </Col>
                <Col xs={8} className="col-desc">
                  <div style={{ marginLeft: "5%" }}>
                    <h3 className="Name">{item.restaurant_name}</h3>
                    <p className="description" style={{ color: "grey" }}>
                      {item.restaurant_mode}
                    </p>
                    <p className="location" style={{ color: "grey" }}>
                      {item.address_complete}
                    </p>
                    <p className="offer" style={{ color: "Tomato" }}>
                      <img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/54/000000/external-offer-ecommerce-kiranshastry-lineal-color-kiranshastry.png" />
                      4 offers trending
                    </p>
                    <div className="popularity">
                      <p>
                        <FontAwesomeIcon icon={faStar} />
                        4.2
                        <div className="subtext">popularity</div>
                      </p>
                      <p>
                        Rs.200
                        <div className="subtext">cost for two</div>
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
