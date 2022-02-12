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

  return (
    <div className="bg">
      <div className="bgimage"></div>
      <div className="registerform">
        <div className="brand">
          <img src={logo} className="logo"></img>
        </div>
        <Form>
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
              handlesubmit();
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
