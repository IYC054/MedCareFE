import React from "react";
import { Divider } from "antd";
import { FaRegPaste } from "react-icons/fa6";
import bank from "../../../api/Bank/bank";

function ConfirmPayment(props) {
    const copyToClipboard = (text) =>{
        navigator.clipboard.writeText(text);
    }
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
