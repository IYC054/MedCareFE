/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const CreateAppointment = async (
  patientId,
  doctorId,
  worktimeId,
  patientProfileId,
  specialty
) => {
  try {
    console.log("patientId" + patientId)
    const speciltyname = await axios.get(`http://localhost:8080/api/specialty/${specialty}`)
    const response = await axios.post("http://localhost:8080/api/appointment", {
      patientId: patientId,
      doctorId: doctorId,
      type: "Khám " + speciltyname.data.name,
      status: "Chờ xử lý",
      amount: 150000.0,
      worktimeId: worktimeId,
      patientProfileId: patientProfileId,
    });
    return response.data;
  } catch (error) {
    // console.log(`${JSON.stringify(error.response.data)}`);
    return [];
  }
};
const getAppointmentByPatientId = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/payments/patient/${id}`
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
const getAppointmentByDoctorId = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/appointment/doctors/${id}`
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
const getVIPAppointmentByDoctorId = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/vip-appointments/doctors/${id}`
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
const UpdateStatusAppointment = async (id, status) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/api/appointment/status/${id}`,
      {
        status: status,
      }
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
const UpdateStatusVipAppointment = async (id, status) => {
  try {
    const res = await axios.put(
      `http://localhost:8080/api/vip-appointments/status/${id}`,
      {
        status: status,
      }
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
const checkslotAppointment = async (doctorid, worktimeid) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/appointment/checkslot/${doctorid}/${worktimeid}`
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
export {
  CreateAppointment,
  getAppointmentByPatientId,
  getAppointmentByDoctorId,
  UpdateStatusAppointment,
  checkslotAppointment,
  getVIPAppointmentByDoctorId,
  UpdateStatusVipAppointment
};
