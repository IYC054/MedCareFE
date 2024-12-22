import React from "react";
import axios from "axios";

const BankPayment = async (amount, description , transactionCode ) => {
  try {
    
   await axios.post("http://localhost:8080/api/payments", {
      amount: amount,
      paymentMethod: "Ngân hàng",
      transactionDescription: description,
      transactionCode: transactionCode,
      appointmentId: 1,
    }).then((respone) => {
        console.log(respone)
    }).catch((err) => {
        console.log(err)
    })

  } catch (error) {
    alert(`${error.response.data}`);
  }
};
const GetPaymentCode = async (code) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/payments/transcode/${code}`);
    console.log(response);
    return response.data;  // Trả về dữ liệu từ API
  } catch (error) {
    console.log(error);
    return null;  // Nếu có lỗi, trả về null
  }
};

export {BankPayment,GetPaymentCode} ;
