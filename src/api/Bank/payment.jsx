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
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error)
  }
};

const gethistoryMbbank = async (appointid = null) => { 
  try {
    // Kiểm tra nếu có appointid thì thêm vào URL
    let url = `http://localhost:8080/api/payments/transaction-history?accountphone=0337218288`;
    if (appointid !== null) {
      url += `&appointid=${appointid}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
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
