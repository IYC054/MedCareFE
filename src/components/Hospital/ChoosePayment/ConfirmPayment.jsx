import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { FaRegPaste } from "react-icons/fa6";
import bank from "../../../api/Bank/bank";
import axios from "axios";
import { useLocation } from "react-router-dom";
// https://script.googleusercontent.com/macros/echo?user_content_key=__ZBNLjzXF16sGbbYfxsPd9bkipAyDONUH5Gx89fr3BPKi89xkfktg6Zm8l-ZEE5DKZVbHMb02BR0GhXOW-gAbk9ZneuTrSGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKFSTgqWUC3IbRd9ct5YnsPGC9SeBer_DXjgG7tHWtkbwP2cF25Pi3tcAvwxiKaNVFwBhhEq5-m9Aa24UFt4HjrPmoFN7-tZYQ&lib=M_gSwOHrgvf5DnR9tSLjeAN_Iq9KWg1kY
// url check lich su gia odich
function ConfirmPayment(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderid = "MedCare " + queryParams.get("orderid");
  const [amount, setAmount] = useState(2000);
  const [checkorder, setCheckorder] = useState([]);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  useEffect(() => {
    const getTrans = () => {
      axios
        .get(
          "https://script.googleusercontent.com/macros/echo?user_content_key=bu372JE3b-OEosJbxQP_2GPBKPUPj5zJIRvgBfwwToiVFHQNHE9IHGIoV_wLELkKSG_0FCzphYvo92tqx_DmfN-VDL5sHK5qm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKFSTgqWUC3IbRd9ct5YnsPGC9SeBer_DXjgG7tHWtkbwP2cF25Pi3tcAvwxiKaNVFwBhhEq5-m9Aa24UFt4HjrPmoFN7-tZYQ&lib=M_gSwOHrgvf5DnR9tSLjeAN_Iq9KWg1kY"
        )
        .then((result) => {
          const data = result.data.data;
          data.map((item) => {
            if (
              item["Mô tả"].includes(orderid) &&
              item["Giá trị"] <= amount &&
              !checkorder.includes(item["Mã GD"])
            ) {
              alert("Thanh toán thành công, cảm ơn bạn");
              setCheckorder((prev) => [...prev, item["Mã GD"]]);
            }
          });
        })
        .catch((err) => console.log(err));
    };

    getTrans();
    const interval = setInterval(getTrans, 30000);

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    console.log(orderid);
    console.log(amount);
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
        <div className="w-full h-36  list-none">
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
        </div>
      </div>
    </div>
  );
}

export default ConfirmPayment;
