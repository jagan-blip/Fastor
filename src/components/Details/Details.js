import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./Details.css";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import logo from "./Fastor Logo.png";
import Draggable, { DraggableCore } from "react-draggable";
import Drag from "../draggable/drag";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
const Details = () => {
  const { id } = useParams();
  const Restaurants = useSelector((state) => state.restaurant.restaurantdata);
  const restaurant = Restaurants.filter((item) => item.restaurant_id === id);
  console.log(restaurant);
  console.log(restaurant[0].restaurant_id);
  console.log(id);
  const [disable, setDisable] = useState(false);

  const noderef = useRef(null);
  return (
    <div>
      <Header />
      <div className="icont">
        <div className="imgcont">
          <Draggable>
            <div>
              {" "}
              <span
                className="fastorlogo"
                style={{ top: "0%" }}
                draggable={true}
              >
                <img src={logo}></img>
              </span>
            </div>
          </Draggable>
          <img
            className="imgrestaurant"
            src={restaurant[0].images[0].url}
          ></img>
          <h3>
            movable{" "}
            <Button
              style={{ fontSize: "20px" }}
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(restaurant[0].images[0].url);
                Swal.fire({
                  title: "Link copied",
                  text: "",
                  icon: "success",
                  iconColor: "white",
                  color: "white",
                  background: "#4a5ece",

                  confirmButtonText: "ok",
                  confirmButtonColor: "#2190ff",
                });
              }}
            >
              share
            </Button>
          </h3>
        </div>
        <div>
          <div className="imgcont2">
            <img
              className="imgrestaurant"
              src={restaurant[0].images[0].url}
            ></img>
            <div>
              {" "}
              <span
                className="fastorlogo2"
                style={{ top: "0%" }}
                draggable={true}
              >
                <img src={logo}></img>
              </span>
            </div>
            <h3>
              Immovable{" "}
              <Button
                style={{ fontSize: "20px" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(restaurant[0].images[0].url);
                  Swal.fire({
                    title: "Link copied",
                    text: "",
                    icon: "success",
                    iconColor: "white",
                    color: "white",
                    background: "#4a5ece",

                    confirmButtonText: "ok",
                    confirmButtonColor: "#2190ff",
                  });
                }}
              >
                share
              </Button>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
