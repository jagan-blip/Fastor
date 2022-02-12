import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import Swal from "sweetalert2";
export const loginreq = createAsyncThunk("login/loginreq", async (obj) => {
  const response = await axios.post(
    `/pwa/user/login`,
    new URLSearchParams(obj),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (response.data.status === "Success") {
    const Toast = Swal.mixin({
      toast: true,
      background: "#029aff",
      iconColor: "white",
      color: "white",
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",

      title: "Signed in successfully",
    });
  } else {
    Swal.fire({
      title: "something went wrong!",
      text: "User not found",
      icon: "error",
      iconColor: "white",
      color: "white",
      background: "#029aff",

      confirmButtonText: "ok",
      confirmButtonColor: "#2190ff",
    });
  }
  return response.data;
});

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    logindata: [],
    status: null,
  },
  reducers: {
    resetstate: (state) => {
      state.logindata = [];
      state.status = null;
    },
    logout: (state) => {
      state.logindata = [];
      state.status = null;
    },
  },
  extraReducers: {
    [loginreq.pending]: (state) => {
      state.status = "loading";
    },
    [loginreq.fulfilled]: (state, { payload }) => {
      state.logindata = payload;
      state.status = "success";
    },
    [loginreq.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { logout, resetstate } = LoginSlice.actions;
export default LoginSlice.reducer;
