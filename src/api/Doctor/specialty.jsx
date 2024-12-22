import axios from "axios";

const getWorkTimeDoctor = async (doctorid) => {
  try {
    await axios
      .get(`http://localhost:8080/api/workinghours/doctor/${doctorid}`)
      .then((res) => {
        console.log("Working hours: " + JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
  }
};

export default getWorkTimeDoctor;
