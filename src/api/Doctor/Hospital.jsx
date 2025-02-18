import axios from "axios";

const GetHospital = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/hospital`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {GetHospital};
