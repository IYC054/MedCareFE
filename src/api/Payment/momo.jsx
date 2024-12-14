import React from "react";
import axios from "axios";

const MomoPayment = async () => {
  try {
    const randomNumberInRange = () => {
      return Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
    };
    const response = await axios.post(
      "http://localhost:8080/api/payment/momo",
      {
        amount: "1000",
        orderInfo: `MedCare ${randomNumberInRange()}`,
      }
    );

    if (response.data.payUrl) {
      // Redirect to MoMo payment page
      window.location.href = response.data.payUrl;
    } else {
      console.error("Payment failed:", response.data);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    }
  } catch (error) {
    alert(`${error.response.data}`);
  }
};

export default MomoPayment;
