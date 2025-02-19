import axios from "axios";


const profilebyaccount = async (accountid) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/patientsprofile/account/${accountid}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const ProfilebypatientprofileId = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/patientsprofile/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const PatientProfileByProfileId = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/patientsfile/profile/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const DoctorByProfileId = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/doctors/${id}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export { profilebyaccount, ProfilebypatientprofileId, PatientProfileByProfileId, DoctorByProfileId };
