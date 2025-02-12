import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Success from "../../Loading/success";
import { CreateAppointment } from "../../../api/Doctor/appointment";
import token from "../../../api/token";
import { gethistoryPayment } from "../../../api/Bank/payment";
import { getpatientbyaccountid } from "../../../api/Doctor/patient";
import { AppContext } from "../../Context/AppProvider";

function PaymentSuccess() {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigator = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get("amount");
  const orderInfo = queryParams.get("orderInfo");
  const resultCode = queryParams.get("resultCode");
  const orderId = queryParams.get("orderId");
  const doctorid = queryParams.get("doctor");
  const workid = queryParams.get("work");
  const specialtyid = queryParams.get("specialty");
  const profileid = queryParams.get("profile");

  const { User } = useContext(AppContext);
  console.log("User" + User);
  useEffect(() => {
    const confirmpayment = async () => {
      if (!amount || !orderInfo || !resultCode) {
        console.error("Thiếu tham số quan trọng:", {
          amount,
          orderInfo,
          resultCode,
        });
        setPaymentStatus("Lỗi: Thiếu thông tin thanh toán.");
        return;
      }

      try {
        const result = await gethistoryPayment();
        const checktransaction = result || [];

        const transactionExists = checktransaction.some((db) =>
          db.transactionCode.includes(orderId)
        );

        if (transactionExists) {
          console.log("Giao dịch đã tồn tại");
          navigator("/profile");
          return;
        }
        const respone_patient = await getpatientbyaccountid(User?.id);
        console.log(User);
        const createAppointment = await CreateAppointment(
          respone_patient[0].id,
          doctorid,
          workid,
          profileid,
          specialtyid
        );

        if (!createAppointment) {
          setPaymentStatus("Lỗi: Không thể tạo lịch hẹn.");
          return;
        }
        const formData = new URLSearchParams();
        formData.append("resultCode", resultCode);
        formData.append("orderInfo", orderInfo);
        formData.append("amount", amount);
        formData.append("trans_code", orderId);
        formData.append("appointment_id", createAppointment.id);

        const response = await axios.post(
          "http://localhost:8080/api/payments/confirm-payment",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        console.log("Kết quả thanh toán:", response);
        setPaymentStatus("Thanh toán thành công!");
        setTimeout(() => navigator("/profile"), 3000);
      } catch (error) {
        console.error("Lỗi trong quá trình thanh toán:", error);
        setPaymentStatus("Đã xảy ra lỗi trong quá trình xác nhận thanh toán.");
      }
    };

    confirmpayment();
  }, [
    amount,
    doctorid,
    navigator,
    orderId,
    orderInfo,
    profileid,
    resultCode,
    specialtyid,
    workid,
  ]);
  return (
    <div>
      <section className="relative z-[1] py-28">
        <div className="w-[calc(100%_-_3rem)] mx-auto max-w-lg sm:max-w-3xl text-center">
          <Success />

          <div>
            <h1 className="text-4xl leading-tight font-semibold mb-4">
              Thank you!
            </h1>
            <p className="text-gray-500 mb-4 leading-snug">
              Đã thanh toán thành công
            </p>

            <p>
              <Link
                to={"/"}
                className="no-underline text-indigo-700 bg-[linear-gradient(to_right,_hsl(250,84%,54%)_50%,_hsla(250,84%,54%,0.2)_50%)] bg-[length:200%_1px] bg-no-repeat bg-[100%_100%] transition-all duration-200 hover:bg-[0%_100%]"
                href="#0"
              >
                Back to Home →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentSuccess;
