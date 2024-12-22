import axios from "axios";

const getWorkTimeDoctor = async (doctorid) => {
  try {
      const res = await axios.get(`http://localhost:8080/api/workinghours/doctor/${doctorid}`);
      console.log("WorkTime by doctor: ", res.data);
      return res.data; 
    } catch (error) {
      console.error(error);
      return []; 
    }
};

export default getWorkTimeDoctor;
