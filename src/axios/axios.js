import axios from "axios";

const instance = axios.create({
  baseURL: "https://staging.fastor.in/v1",
  headers: {
    Authorization: "",
  },
});

export default instance;
