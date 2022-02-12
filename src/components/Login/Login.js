import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Form,
  Col,
  Row,
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
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
import "./Login.css";
import { useNavigate } from "react-router-dom";
import OTPInput, { ResendOTP } from "otp-input-react";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useSelector, useDispatch } from "react-redux";
import { loginreq, resetstate } from "./LoginSlice";
import Swal from "sweetalert2";
const Login = () => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState("");
  const loginstate = useSelector((state) => state.login.logindata);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setOtp("");
    setShow(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let header = {
    Authorization: "",
  };
  useEffect(() => {
    window.sessionStorage.clear();
    dispatch(resetstate());
  }, [dispatch]);

  let data = {
    phone: "",
    dial_code: "",
    otp: "",
  };

  if (loginstate.length !== 0) {
    if (loginstate.status === "Success") {
      window.sessionStorage.setItem("Token", loginstate.data.token);
      window.sessionStorage.setItem(
        "refresh_token",
        loginstate.data.refresh_token
      );
      //redirecting after login
      navigate("/home");
    }
  }
  const handlesubmit = () => {
    const no = parsePhoneNumber(value);
    console.log(no);
    if (no != null) {
      console.log(no.nationalNumber.length);
      if (no.nationalNumber.length < 10 || no.nationalNumber.length > 10) {
        alert("invalid no");
        console.log("invalid no");
      } else if (otp.length === 6) {
        data.phone = no.nationalNumber;
        data.dial_code = "+" + no.countryCallingCode.toString();
        data.otp = otp;
        console.log(data);
        dispatch(loginreq(data));
      } else {
        Swal.fire({
          title: "something went wrong!",
          text: "Enter valid otp",
          icon: "error",
          iconColor: "white",
          color: "white",
          background: "#4a5ece",

          confirmButtonText: "ok",
          confirmButtonColor: "#2190ff",
        });
      }
    }
  };

  const validation = () => {
    const mobile = parsePhoneNumber(value);
    if (mobile != null) {
      if (mobile.nationalNumber.length !== 10) {
        Swal.fire({
          title: "something went wrong!",
          text: "Check mobile no",
          icon: "error",
          iconColor: "white",
          color: "white",
          background: "#4a5ece",

          confirmButtonText: "ok",
          confirmButtonColor: "#2190ff",
        });
      } else {
        handleShow();
      }
    } else {
      Swal.fire({
        title: "something went wrong!",
        text: "Check mobile no",
        icon: "error",
        iconColor: "white",
        color: "white",
        background: "#4a5ece",

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
            <Link to="/register" className="signup">
              New ?,Sign up
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

          <Modal show={show} onHide={handleClose} className="modalotp">
            <ModalHeader closeButton>
              <ModalTitle style={{ color: "tomato", fontStyle: "italic" }}>
                Enter otp
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              {" "}
              <OTPInput
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
                className="otp"
                value={otp}
                onChange={setOtp}
              />
            </ModalBody>
            <ModalFooter>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  handlesubmit();
                }}
                className="submit"
              >
                submit
              </button>
            </ModalFooter>
          </Modal>
        </Form>
      </div>
    </div>
  );
};

export default Login;
