import axios from "axios";
import { API_URL } from "../lib/config";

export const Axios = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: localStorage.getItem("uitctoken"),
  },
});
