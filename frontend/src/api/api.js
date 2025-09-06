// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5500/api", // include /api here
});

export default API;
