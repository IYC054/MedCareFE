import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { FaRegPaste } from "react-icons/fa6";
import bank from "../../../api/Bank/bank";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BankPayment,
  gethistoryMbbank,
  gethistoryPayment,
} from "../../../api/Bank/payment";
function ConfirmPayment(props) {
  //
  const [HistoryMbbank, setHistoryMbbank] = useState([]);
  //
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderid = "MedCare 0337218288";
  const [amount, setAmount] = useState(2000);
  useEffect(() => {
    if (timeLeft === 0) {
      navigate(-1);
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  useEffect(() => {
    const getTrans = async () => {
      try {
        const result = await gethistoryMbbank();
        const historypaymentdb = await gethistoryPayment();
        //
        const gethistorydb = result;
        const gethistorymb = result?.result?.transactionHistoryList || [];
        //

        // check dieu kien
        const isTransactionFound = gethistorymb.some((mbTransaction) =>
          historypaymentdb.some(
            (dbTransaction) =>
              dbTransaction.transactionCode === mbTransaction.refNo
          )
        );
        if (!isTransactionFound) {
          gethistorymb.map((mb) => {
            if (mb.description.includes(orderid)) {
              BankPayment(mb.creditAmount, mb.addDescription, mb.refNo)
              alert("Đã bank cảm ơn ní")
              navigator("/profile")
            }
          });

          console.log("chưa có giao dịch mới");
        } else {
          console.log("Giao dịch đã tồn tại");
        }

        console.log("Bankhistory: " + JSON.stringify(historypaymentdb));
      } catch (err) {
        console.log(err);
      }
    };
    getTrans();
    const interval = setInterval(getTrans, 5000);
    setTimeout(() => {
      clearInterval(interval);
      console.log("ngưng !!!!!");
    }, 1000 * 60 * 5); //1 giây *60*=5 phút

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, []);

  const checkPayment = () => {
    alert("Check balance");
  };
  return (
    <div className="flex justify-center py-5">
      <div className="w-[90%] border border-solid border-[#91caff] rounded-lg bg-[#e6f4ff]/60 p-4">
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
            <span className="text-[#000] font-medium text-[15px]">
              Techcombank
            </span>
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
          <span className="text-[24px] text-[#D44333] font-semibold ">
            Đơn hàng sẽ hết hạn sau: {minutes} phút {seconds} giây
          </span>
          <div className="w-full flex">
            <button
              className="px-5 py-2  bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] border-none text-[#fff] rounded-lg"
              onClick={checkPayment}
            >
              Tôi đã chuyển khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPayment;
