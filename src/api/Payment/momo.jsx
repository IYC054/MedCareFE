import React from "react";
import axios from "axios";

const MomoPayment = async (fee, phone,doctorid, workid, profileid, specialtyid, doctorEmail, bhyt) => {
  try {
    console.log("DOCTOR: " + doctorEmail);
    const response = await axios.post(
      "http://localhost:8080/api/payments/momo",
      {
        amount: fee,
        orderInfo: `Thanh toán MEDCARE`,
        doctorId: doctorid,
        workId: workid,
        profileId: profileid,
        specialtyId: specialtyid,
        doctorEmail: doctorEmail,
        bhyt: bhyt
      }

    );

    if (response.data.payUrl) {
      window.location.href = response.data.payUrl;
    } else {
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    }
  } catch (error) {
    console.log(`${error.response.data}`);
  }
};

export default MomoPayment;
