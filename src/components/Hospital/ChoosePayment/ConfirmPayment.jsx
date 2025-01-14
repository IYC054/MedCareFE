import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { FaRegPaste } from "react-icons/fa6";
import bank from "../../../api/Bank/bank";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./confirmpaymet.scss";
import {
  BankPayment,
  gethistoryMbbank,
  gethistoryPayment,
} from "../../../api/Bank/payment";
import { CreateAppointment } from "../../../api/Doctor/appointment";
import Invoice from "../../../sendmail/Invoice";
import SendMail from "../../../api/mail/sendmail";
function ConfirmPayment(props) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderid = "MedCare 0337218288";
  const [amount, setAmount] = useState(2000);
  const doctorid = queryParams.get("doctor");
  const workid = queryParams.get("work");
  const specialty = queryParams.get("specialty");
  const profileid = queryParams.get("profile");
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  useEffect(() => {
    if (
      doctorid == null ||
      workid == null ||
      specialty == null ||
      profileid == null
    ) {
      console.log("nhầm đường r");
      navigate("/hospital");
    }
  }, [doctorid, profileid, specialty, workid]);
  useEffect(() => {
    const getTrans = async () => {
      try {
        const result = await gethistoryMbbank();

        // lay status exists
        var isStatus = result.result;
        if (isStatus == false) {
          const appointment = await CreateAppointment(
            1, //đợi login
            doctorid,
            workid,
            profileid,
            specialty
          );
          // const htmlContent = ReactDOMServer.renderToString(
          //   <Invoice customerName={"Thanh Phong"} services={"Khám tổng quát"} total={mb.creditAmount} />
          // );
          // SendMail(htmlContent)
          await gethistoryMbbank(appointment.id);
          setShowPopup(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTrans();
    const interval = setInterval(getTrans, 9000);
    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, [doctorid, profileid, specialty, workid]);

  const handleRedirect = () => {
    // Chuyển trang khi nhấn "OK"
    navigate("/profile"); // Điều chỉnh theo route bạn muốn chuyển
  };
  return (
    <div className="flex justify-center py-5">
      <div className="w-full border border-solid border-[#91caff] rounded-lg bg-[#e6f4ff]/60 p-4 ">
        <div className="w-full text-center">
          <span>
            Để hoàn tất giao dịch, bạn vui lòng chuyển khoản với thông tin như
            sau:
          </span>
          <p className="mt-2 font-semibold text-[20px]">
            Quét mã QR để thanh toán
          </p>
        </div>
        <div className="w-full  bg-[#fff]  justify-center items-center">
          <div className="w-full h-[300px] flex justify-center items-center">
            <img
              src={bank(amount, orderid)}
              className="h-full object-cover"
              alt=""
            />
          </div>
          <p className="text-center text-[#c2c2c2]">
            Quét QR để chuyển khoản nhanh hơn, tự điền stk và nội dung để tránh
            nhầm lẫn
          </p>
        </div>
        <Divider plain style={{ fontSize: "18px", fontWeight: "bold" }}>
          Hoặc
        </Divider>
        <div className="w-full text-center">
          <span className="mt-2 font-semibold text-[16px]">
            Thông tin chuyển khoản
          </span>
        </div>
        <div className="w-full   list-none">
          <li className="settingli my-2 text-[#00000073] text-[14px]">
            Ngân hàng :{" "}
            <span className="text-[#000] font-medium text-[15px]">MB</span>
          </li>
          <li className="settingli my-2 text-[#00000073] text-[14px]">
            Số tải khoản :{" "}
            <span className="text-[#000] font-medium text-[15px] flex items-center">
              1308200200
              <span
                className="ml-2 text-[18px] text-[#00b5f1] cursor-pointer"
                onClick={() => copyToClipboard("1308200200")}
              >
                <FaRegPaste />
              </span>
            </span>
          </li>
          <li className="settingli my-2 text-[#00000073] text-[14px]">
            Tên tài khoản :{" "}
            <span className="text-[#000] font-medium text-[15px]">
              Tran Thanh Phong
            </span>
          </li>
          <li className="settingli my-2 text-[#00000073] text-[14px]">
            Số tiền :{" "}
            <span className="text-[#000] font-medium text-[15px]">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(amount)}
            </span>
          </li>
          <li className="settingli my-2 text-[#00000073] text-[14px]">
            Thông tin chuyển khoản :{" "}
            <span className="text-[#000] font-medium text-[15px] flex items-center">
              {orderid}
              <span
                className="ml-2 text-[18px] text-[#00b5f1] cursor-pointer"
                onClick={() => copyToClipboard(orderid)}
              >
                <FaRegPaste />
              </span>
            </span>
          </li>
        </div>
      </div>
      {/* popup thanh toan */}
      <div
        className={`${
          showPopup ? "bg-gray-500 bg-opacity-50 inset-0 z-40" : ""
        } fixed `}
      >
        {showPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"></div>
        )}

        <div
          className={`fixed inset-0 flex justify-center items-center z-50 transition-all duration-500 ease-out 
      ${
        showPopup
          ? "scale-100 opacity-100 animate-bounceContinuous"
          : "scale-0 opacity-0 pointer-events-none"
      }`}
        >
          <div className="bg-white p-6 md:mx-auto  rounded-lg">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Thanh toán thành công!
              </h3>
              <p className="text-gray-600 my-2">
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
              </p>
              <p>Chúng tôi chúc bạn một ngày tốt lành!</p>
              <div className="py-10 text-center">
                <button
                  onClick={handleRedirect}
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* popup thanh toan */}
    </div>
  );
}

export default ConfirmPayment;
