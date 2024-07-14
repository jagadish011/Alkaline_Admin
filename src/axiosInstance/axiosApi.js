import axios from "axios";
import { BASE_URL } from "../constants";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});