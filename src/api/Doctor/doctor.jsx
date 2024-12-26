import axios from "axios";
import token from "../token";

const doctorApi = axios.create({
  baseURL: "http://localhost:8080/api/doctors",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});
const getDoctorbyId = async (doctorid) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/doctors/${doctorid}`,{
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
    console.log("Get doctor by id: ", res.data.account);
    return res.data.account; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};
export {doctorApi, getDoctorbyId};
