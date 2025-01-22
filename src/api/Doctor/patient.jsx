import axios from "axios";
import token from "../token";

const getpatientbyaccountid = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/patients/account/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getpatientbyid = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/patients/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getpatientbydoctorid = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/patientsfile/doctor/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getfileimagebypatientprofileid = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/filesimage/patient_profile/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const deteleimage = async (id) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/filesimage/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export {getpatientbyaccountid, getpatientbyid, getpatientbydoctorid, getfileimagebypatientprofileid, deteleimage};
