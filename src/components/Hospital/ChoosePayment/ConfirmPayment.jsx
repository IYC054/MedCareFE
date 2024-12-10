import React, { useEffect } from "react";
import { Divider } from "antd";
import { FaRegPaste } from "react-icons/fa6";
import bank from "../../../api/Bank/bank";
import axios from "axios";
// https://script.googleusercontent.com/macros/echo?user_content_key=__ZBNLjzXF16sGbbYfxsPd9bkipAyDONUH5Gx89fr3BPKi89xkfktg6Zm8l-ZEE5DKZVbHMb02BR0GhXOW-gAbk9ZneuTrSGm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKFSTgqWUC3IbRd9ct5YnsPGC9SeBer_DXjgG7tHWtkbwP2cF25Pi3tcAvwxiKaNVFwBhhEq5-m9Aa24UFt4HjrPmoFN7-tZYQ&lib=M_gSwOHrgvf5DnR9tSLjeAN_Iq9KWg1kY
// url check lich su gia odich
function ConfirmPayment(props) {
    const copyToClipboard = (text) =>{
        navigator.clipboard.writeText(text);
    }
    useEffect(() =>{
        axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=bS7YTOowzydjITcDQHtc1LuN4RKXKdLAZkMrtTyzb8JPePT14a4zLmxXxOf7i3tM-1RLc-VjbZYZxL6ZAXNHNBwfYidUJqsXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJtEfX59T8eOEQBMAyKvYeMy-4R8KMjjtMFSxav8DWBMaCsRUFzA1I7q5O3cvI4-2EPjNDusOx0tJm4NPCL5dKOutDRR1JtRKA&lib=M_gSwOHrgvf5DnR9tSLjeAN_Iq9KWg1kY")
        .then((result) => console.log(result.data.data))
        .catch((err) => console.log(err))
    })
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 border border-solid border-[#91caff] rounded-lg bg-[#e6f4ff]/60 p-4">
        <div className="w-full text-center">
          <span>
            Để hoàn tất giao dịch, bạn vui lòng chuyển khoản với thông tin như
            sau:
          </span>
          <p className="mt-2 font-semibold text-[20px]">
            Quét mã QR để thanh toán
          </p>
        </div>
        <div className="w-full h-[450px] bg-[#fff] flex justify-center items-center">
          <img
            src={bank(5555, "CK nguyevannghi")}
            className="h-full object-cover"
            alt=""
          />
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
              <span className="ml-2 text-[18px] text-[#00b5f1] cursor-pointer" onClick={() => copyToClipboard("1308200200")}>
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
            <span className="text-[#000] font-medium text-[15px]">5,555</span>
          </li>
          <li className="settingli my-2 text-[#00000073] text-[14px]">
            Thông tin chuyển khoản :{" "}
            <span className="text-[#000] font-medium text-[15px] flex items-center">
              CK Nguyenvannghikhambenh
              <span className="ml-2 text-[18px] text-[#00b5f1] cursor-pointer" onClick={() => copyToClipboard("CK Nguyenvannghikhambenh")}>
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
