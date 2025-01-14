import React from "react";
import axios from "axios";
import token from "../token";

const MomoPayment = async (fee, phone,doctorid, workid, profileid, specialtyid) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/payments/momo",
      {
        amount: fee,
        orderInfo: `MedCare ${phone}`,
        doctorId: doctorid,
        workId: workid,
        profileId: profileid,
        specialtyId: specialtyid,
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
