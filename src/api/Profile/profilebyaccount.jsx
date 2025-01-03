import axios from "axios";
import token from "../token";

const profilebyaccount = async (accountid) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/patientsprofile/account/${accountid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Profile by Accountid: ", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const profilebyaccountId = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/patientsprofile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {profilebyaccount, profilebyaccountId};
