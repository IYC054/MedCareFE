import axios from "axios";

const profilebyaccount = async (accountid) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/patientsprofile/account/${accountid}`);
    console.log("Profile by Accountid: ", res.data);
    return res.data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};

export default profilebyaccount;

