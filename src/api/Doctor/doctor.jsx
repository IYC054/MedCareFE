import axios from "axios";

const doctorApi = axios.create({
  baseURL: "http://localhost:8080/api/doctors",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default doctorApi;