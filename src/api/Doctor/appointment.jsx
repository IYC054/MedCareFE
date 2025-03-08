/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../components/Context/AppProvider";

const CreateAppointment = async (
  patientId,
  doctorId,
  worktimeId,
  patientProfileId,
  specialty,
  doctorEmail,
  BHYT,
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
    console.log("patientId" + patientId);
    const speciltyname = await axios.get(
      `http://localhost:8080/api/specialty/${specialty}`
    );
    const response = await axios.post("http://localhost:8080/api/appointment", {
      patientId: patientId,
      doctorId: doctorId,
      type: "Khám " + speciltyname.data.name,
      status: "Chờ xử lý",
      amount: 1000,
      worktimeId: worktimeId,
      patientProfileId: patientProfileId,
      firestoreUserId: "asdasdads",
      doctorEmail: doctorEmail,
      BHYT: BHYT
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
      `http://localhost:8080/api/appointment/status/${id}?doctorEmail=admin@gmail.com`,
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
      `http://localhost:8080/api/vip-appointments/status/${id}?doctorEmail=admin@gmail.com`,
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
const getAppointmentByIdUser = async (iduser) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/appointment/patient/${iduser}`
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
const getAllApointment = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/appointment`
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
const getAllVipApointment = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/vip-appointments`
    );
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
export {
  CreateAppointment,
  getAllApointment,
  getAllVipApointment,
  getAppointmentByPatientId,
  getAppointmentByDoctorId,
  UpdateStatusAppointment,
  checkslotAppointment,
  getVIPAppointmentByDoctorId,
  UpdateStatusVipAppointment,
  getAppointmentByIdUser,
};
