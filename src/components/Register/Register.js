import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffecet } from "react";
import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import PhoneInput, {
  formatPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";
import { Link } from "react-router-dom";
import { PhoneNumberMatcher } from "libphonenumber-js/core";
import logo from "./fastorlogo.png";
import "react-phone-number-input/style.css";
import axios from "../../axios/axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Register = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  let header = {
    Authorization: "",
  };
  const no = parsePhoneNumber(value);
  if (no != null) {
    console.log(no.countryCallingCode);
    console.log(no.nationalNumber);
  }

  let data = {
    phone: "",
    dial_code: "",
  };
  const registerReq = async (obj) => {
    const response = await axios.post("/pwa/user/register", obj, {
      headers: header,
    });
    console.log(response);
    if (response.data.status === "Success") {
      Swal.fire({
        title: "Registration successful",
        text: "",
        icon: "success",
        iconColor: "white",
        color: "white",
        background: "#4a5ece",

        confirmButtonText: "ok",
        confirmButtonColor: "#2190ff",
      });
      navigate("/login");
    }
  };
  const handlesubmit = () => {
    const no = parsePhoneNumber(value);
    if (no != null) {
      console.log(no.countryCallingCode);
      console.log(no.nationalNumber);
      data.phone = no.nationalNumber;

      data.dial_code = "+" + no.countryCallingCode.toString();
      console.log(data);
      registerReq(data);
    }
  };
  const validation = () => {
    const mobile = parsePhoneNumber(value);
    if (mobile != null) {
      if (mobile.nationalNumber.length !== 10) {
        Swal.fire({
          title: "something went wrong!",
          text: "Enter valid mobile no",
          icon: "error",
          iconColor: "white",
          color: "white",
          background: "#029aff",

          confirmButtonText: "ok",
          confirmButtonColor: "#2190ff",
        });
      } else {
        handlesubmit();
      }
    } else {
      Swal.fire({
        title: "something went wrong!",
        text: "Enter valid mobile no",
        icon: "error",
        iconColor: "white",
        color: "white",
        background: "#029aff",

        confirmButtonText: "ok",
        confirmButtonColor: "#2190ff",
      });
    }
  };
  return (
    <div className="bg">
      <div className="bgimage"></div>
      <div className="registerform">
        <div className="brand">
          <img src={logo} className="logo"></img>
        </div>
        <Form>
          <h2 style={{ color: "white" }}>Registration</h2>
          <FormGroup className="mb-3" controlId="formBasicNumber">
            <PhoneInput
              className="phoneinput"
              international
              limitMaxLength={true}
              defaultCountry="IN"
              countryCallingCodeEditable={false}
              onChange={setValue}
              countries={["IN"]}
            />
            <Link to="/login" className="signin">
              Sign in ?
            </Link>
          </FormGroup>
          <button
            className="btnn"
            onClick={(e) => {
              e.preventDefault();
              validation();
            }}
          >
            getOtp
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
