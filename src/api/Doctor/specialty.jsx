import axios from "axios";
import token from "../token";

const getSpecialtyByDoctor = async (doctorid) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/specialty/doctor/${doctorid}`,{
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
    return res.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};
const getSpecialtyById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/specialty/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
    return res.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};

export {getSpecialtyByDoctor, getSpecialtyById};
