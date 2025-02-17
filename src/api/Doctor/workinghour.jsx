import axios from "axios";

const getWorkTimeDoctor = async (doctorid) => {
  try {
      const res = await axios.get(`http://localhost:8080/api/workinghours/doctor/${doctorid}`);
      return res.data; 
    } catch (error) {
      console.error(error);
      return []; 
    }
};
const getWorkTimeDoctorbyId = async (id) => {
  try {
      const res = await axios.get(`http://localhost:8080/api/workinghours/${id}`);
      return res.data; 
    } catch (error) {
      console.error(error);
      return []; 
    }
};

export {getWorkTimeDoctor, getWorkTimeDoctorbyId};
