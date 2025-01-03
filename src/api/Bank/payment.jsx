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
    const response = await axios.get(
      `http://localhost:8080/api/payments/transaction-history`, {
        headers: {
          Authorization: `Bearer ${token}` 
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
const getallPaymentByAppoint = async (id) => {
  try {
   

    const response = await axios.get(
      `http://localhost:8080/api/payments/appointment/${id}`, {
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

export { BankPayment, gethistoryMbbank, gethistoryPayment, getallPaymentByAppoint };
