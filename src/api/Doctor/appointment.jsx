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

export default CreateAppointment;
