import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get("amount");
  const orderInfo = queryParams.get("orderInfo");
  const resultCode = queryParams.get("resultCode");
  useEffect(() => {
    // Kiểm tra nếu một trong các tham số thiếu hoặc không hợp lệ
    if (!amount || !orderInfo || !resultCode) {
      console.error("Thiếu tham số quan trọng:", { amount, orderInfo, resultCode });
      setPaymentStatus("Lỗi: Thiếu thông tin thanh toán.");
      return;
    }

    console.log("Thông tin thanh toán:", { orderInfo, amount, resultCode }); // In ra thông tin thanh toán

    
    const formData = new URLSearchParams();
    formData.append("resultCode", resultCode);
    formData.append("orderInfo", orderInfo);
    formData.append("amount", amount);
    // Gửi yêu cầu xác nhận thanh toán
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
          <svg
            className="h-24 w-24 inline-block text-teal-600 fill-current leading-none shrink-0 mb-4"
            viewBox="0 0 96 96"
            aria-hidden="true"
          >
            <g fill="currentColor">
              <circle cx="48" cy="48" r="48" opacity=".1"></circle>
              <circle cx="48" cy="48" r="31" opacity=".2"></circle>
              <circle cx="48" cy="48" r="15" opacity=".3"></circle>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M40 48.5l5 5 11-11"
              ></path>
              <path
                transform="rotate(25.474 70.507 8.373)"
                opacity=".5"
                d="M68.926 4.12h3.159v8.506h-3.159z"
              ></path>
              <path
                transform="rotate(-52.869 17.081 41.485)"
                opacity=".5"
                d="M16.097 36.336h1.969v10.298h-1.969z"
              ></path>
              <path
                transform="rotate(82.271 75.128 61.041)"
                opacity=".5"
                d="M74.144 57.268h1.969v7.547h-1.969z"
              ></path>
              <circle cx="86.321" cy="41.45" r="2.946" opacity=".5"></circle>
              <circle cx="26.171" cy="78.611" r="1.473" opacity=".5"></circle>
              <circle cx="49.473" cy="9.847" r="1.473" opacity=".5"></circle>
              <circle cx="10.283" cy="63" r="2.946" opacity=".2"></circle>
              <path
                opacity=".4"
                d="M59.948 88.142l10.558-3.603-4.888-4.455-5.67 8.058z"
              ></path>
              <path
                opacity=".3"
                d="M18.512 19.236l5.667 1.456.519-8.738-6.186 7.282z"
              ></path>
            </g>
          </svg>

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
