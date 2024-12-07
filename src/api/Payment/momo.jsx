import React from "react";
import axios from "axios";

const MomoPayment = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/payment/momo",
      {
        amount: "50000",
        orderInfo: "Khám móng chân 🤷‍♂️",
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
    console.error("Error:", error);
    alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
  }
};

export default MomoPayment;
