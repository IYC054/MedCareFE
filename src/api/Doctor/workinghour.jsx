import axios from "axios";
import token from "../token";

const getWorkTimeDoctor = async (doctorid) => {
  try {
      const res = await axios.get(`http://localhost:8080/api/workinghours/doctor/${doctorid}`, {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
      console.log("WorkTime by doctor: ", res.data);
      return res.data; 
    } catch (error) {
      console.error(error);
      return []; 
    }
};
const getWorkTimeDoctorbyId = async (id) => {
  try {
      const res = await axios.get(`http://localhost:8080/api/workinghours/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
      console.log("WorkTime by id: ", res.data);
      return res.data; 
    } catch (error) {
      console.error(error);
      return []; 
    }
};

export {getWorkTimeDoctor, getWorkTimeDoctorbyId};
