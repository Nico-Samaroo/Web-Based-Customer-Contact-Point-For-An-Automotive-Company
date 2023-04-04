import axios from "axios";

const accessToken = localStorage.getItem("jwt");

export default axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  }
});
