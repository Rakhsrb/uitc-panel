import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:5000/api/",
  // baseURL: "https://server.uitc.uz/api/",
  headers: {
    Authorization: localStorage.getItem("uitctoken"),
  },
});
