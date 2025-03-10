import axios from "axios";

const getSpecialtyByDoctor = async (doctorid) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/specialty/doctor/${doctorid}`);
    return res.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};
const getSpecialtyById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/specialty/${id}`);
    return res.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};
const getallSpecialty = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/specialty`);
    return res.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};

export {getSpecialtyByDoctor, getSpecialtyById, getallSpecialty};
