import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Success from "../../Loading/success";

function PaymentSuccess() {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get("amount");
  const orderInfo = queryParams.get("orderInfo");
  const resultCode = queryParams.get("resultCode");
  useEffect(() => {
    if (!amount || !orderInfo || !resultCode) {
      console.error("Thiếu tham số quan trọng:", { amount, orderInfo, resultCode });
      setPaymentStatus("Lỗi: Thiếu thông tin thanh toán.");
      return;
    }

    console.log("Thông tin thanh toán:", { orderInfo, amount, resultCode }); 

    
    const formData = new URLSearchParams();
    formData.append("resultCode", resultCode);
    formData.append("orderInfo", orderInfo);
    formData.append("amount", amount);
    axios
      .post("http://localhost:8080/api/payments/confirm-payment", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
      })
      .then((result) => {
        console.log("Kết quả thanh toán:", result);
        setPaymentStatus("Thanh toán thành công!");
      })
      .catch((error) => {
        console.error("Lỗi xác nhận thanh toán:", error);
        setPaymentStatus("Đã xảy ra lỗi trong quá trình xác nhận thanh toán.");
      });
  }, [amount, orderInfo, resultCode]);
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
