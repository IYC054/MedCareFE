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
    );
    return response.data
  } catch (error) {
    // console.log(`${JSON.stringify(error.response.data)}`);
    return [];
  }
};
const getAppointmentByPatientId = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/appointment/patient/${id}`);
    return res.data; 
  } catch (error) {
    // console.error(error);
    return []; 
  }
};
export {CreateAppointment, 
  getAppointmentByPatientId
};
