/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import token from "../token";

const CreateAppointment = async (
  patientId,
  doctorId,
  worktimeId,
  patientProfileId,
  specialty
) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/appointment",
      {
        patientId: patientId,
        doctorId: doctorId,
        type: "Khám " + specialty,
        status: "Pending",
        amount: 150000.0,
        worktimeId: worktimeId,
        patientProfileId: patientProfileId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response.data);
    return response.data
  } catch (error) {
    alert(`${error.response.data}`);
    return [];
  }
};
const getAppointmentByPatientId = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/appointment/patient/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
    // console.log("Get Appoint by patientid: ", res.data);
    return res.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};
export {CreateAppointment, 
  getAppointmentByPatientId
};
