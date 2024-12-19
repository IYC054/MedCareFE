import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { FaRegPaste } from "react-icons/fa6";
import bank from "../../../api/Bank/bank";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BankPayment, GetPaymentCode } from "../../../api/Bank/payment";
// https://script.googleusercontent.com/macros/echo?user_content_key=__ZBNLjzXF16sGbbYfxsPd9bkipAyDONUH5Gx89fr3BPKi89xkfktg6Zm8l-ZEE5DKZVbHMb02BR0GhXOW-gAbk9ZneuTrSGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKFSTgqWUC3IbRd9ct5YnsPGC9SeBer_DXjgG7tHWtkbwP2cF25Pi3tcAvwxiKaNVFwBhhEq5-m9Aa24UFt4HjrPmoFN7-tZYQ&lib=M_gSwOHrgvf5DnR9tSLjeAN_Iq9KWg1kY
// url check lich su gia odich
function ConfirmPayment(props) {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderid = "MedCare 0337218288"
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
        const result = await axios.get(
          "https://script.googleusercontent.com/macros/echo?user_content_key=SwT55JguzVhYJZVNOjy_875iFMQoAKvo-SrAJ2UjrZBU-MDl0Ih8du-i_-3_ibtaKzz1eY83f6MyTLYOkxvOI6LBL-EDQbQ6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHmDzCyvqrH6g6K3uTlviLhPt4ZCpWztcL6A_cApFmaIR8LWVQztqdaZ0h4MVyhzPVgu2EDunFSjB5pd3pmUVnryn1Z4YyOlLg&lib=M_gSwOHrgvf5DnR9tSLjeAN_Iq9KWg1kY"
        );
        
        const data = result.data.data;
        console.log(data);
        
        for (const item of data) {
          // Đợi kết quả từ GetPaymentCode
          const paymentCode = (await GetPaymentCode(item["Mã GD"]));
          console.log("tìm id trong db",paymentCode)
      
          if(paymentCode != 0){
            console.log("giao dịch đã tồn tại");
           
          } else if (paymentCode.length === 0 &&item["Mô tả"].includes(orderid) && item["Giá trị"] >= amount){
            console.log("Thanh toán thành công, cảm ơn bạn");
            BankPayment(amount, "phong", "0358227696", orderid, item["Mã GD"].toString());
                 clearInterval(interval);
                 break;
           }
          
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTrans();
    const interval = setInterval(getTrans, 5000);
    setTimeout(() => {
      clearInterval(interval); 
      console.log("ngưng !!!!!");
    }, 1000*60*5); //1 giây *60*=5 phút
  
    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, []);
  

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
        </div>
      </div>
    </div>
  );
}

export default ConfirmPayment;
