import axios from "axios";

const getSpecialtyByDoctor = async (doctorid) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/specialty/doctor/${doctorid}`);
    console.log("Specialty by doctor: ", res.data);
    return res.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};

export default getSpecialtyByDoctor;
