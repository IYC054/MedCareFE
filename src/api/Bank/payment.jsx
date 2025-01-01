import React from "react";
import axios from "axios";
import token from "../token";

const BankPayment = async (amount, description, transactionCode, appointmentId) => {
  try {
    await axios
      .post("http://localhost:8080/api/payments", {
        amount: amount,
        paymentMethod: "Ngân hàng",
        transactionDescription: description,
        transactionCode: transactionCode,
        appointmentId: appointmentId,
      }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((respone) => {
        console.log(respone);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(`${error.response.data}`);
  }
};

const gethistoryMbbank = async () => {
  try {
    const data = new FormData();
    data.append("sessionId", "f8d938d9-e85d-49be-9cea-5b0cf4c90449");
    data.append("account", "0933315633");
    const account = "0933315633";
    var sessionId = "1e725eb2-6e36-492d-9480-0beb81188977"

    const response = await axios.get(
      `http://localhost:8080/api/payments/transaction-history`, {
        headers: {
          Authorization: `Bearer ${token}` 
        },
        params: {  
          sessionId: sessionId, 
          account: account
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const gethistoryPayment = async () => {
  try {
   

    const response = await axios.get(
      `http://localhost:8080/api/payments`, {
        headers: {
          Authorization: `Bearer ${token}` 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { BankPayment, gethistoryMbbank, gethistoryPayment };
