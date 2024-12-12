import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import bank from "../../../api/Bank/bank";

import {
  FaAddressCard,
  FaBriefcaseMedical,
  FaBuilding,
  FaClock,
  FaCreditCard,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaLocationDot, FaRegPaste, FaUserDoctor } from "react-icons/fa6";
import { MdOutlineAttachMoney, MdOutlineMedicalServices } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import MomoPayment from "../../../api/Payment/momo";
import axios from "axios";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";

function ChoosePayment() {
  const [checkMethod, setCheckMethod] = useState();
  const randomNumberInRange = () => {
    return Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
  };
  const navigate = useNavigate();
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    axios
      .get(
        "https://script.googleusercontent.com/macros/echo?user_content_key=bS7YTOowzydjITcDQHtc1LuN4RKXKdLAZkMrtTyzb8JPePT14a4zLmxXxOf7i3tM-1RLc-VjbZYZxL6ZAXNHNBwfYidUJqsXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJtEfX59T8eOEQBMAyKvYeMy-4R8KMjjtMFSxav8DWBMaCsRUFzA1I7q5O3cvI4-2EPjNDusOx0tJm4NPCL5dKOutDRR1JtRKA&lib=M_gSwOHrgvf5DnR9tSLjeAN_Iq9KWg1kY"
      )
      .then((result) => console.log(result.data.data))
      .catch((err) => console.log(err));
  });
  const PayWithMomo = async () => {
    if (checkMethod == "momo") {
      MomoPayment();
    } else if (checkMethod == "bank") {

      navigate(`/confirm-payment?orderid=${randomNumberInRange()}`);
    } else {
      alert("Chưa chọn phương thức thanh toán");
    }
  };
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 ">
        <Breadcrumbs />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 w-full  py-4 mb-5">
            <div className="w-full  bg-[#fff] rounded-lg " id="goup">
              <div className="w-full h-[50px] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-t-lg text-[#fff] py-1 px-4 flex items-center">
                <span className="font-medium text-[20px]">
                  Thông tin cơ sở y tế
                </span>
              </div>
              <div className="w-full rounded-b-lg p-2 list-none ">
                <li className="flex gap-2 mb-10">
                  <FaBuilding className="text-[#c2c2c2] text-[30px]" />
                  <span className="text-[#003553]">
                    Bệnh Viện Chợ Rẫy
                    <br />
                    <span className="text-[15px] text-[#c2c2c2]">
                      201B Đ. Nguyễn Chí Thanh, Phường 12, Quận 5, Hồ Chí Minh
                      700000
                    </span>
                  </span>
                </li>
              </div>
            </div>
          </div>
          <div className="col-span-3 py-4 w-full ">
            <div className="w-full ">
              <div className="w-full h-[50px] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-t-lg text-[#fff] py-1 px-4 flex items-center justify-center">
                <span className="font-medium text-[20px]">
                  Chọn phương thức thanh toán
                </span>
              </div>
              <div className="w-full grid-cols-3 grid gap-2 bg-[#fff] rounded-bl-lg rounded-br-lg">
                <div className="col-span-2">
                  <div className="w-full h-full  p-2">
                    <ul className="list-none">
                      <li className="flex items-center gap-2 settingli mt-2 mb-6">
                        <input
                          type="radio"
                          id="momo"
                          name="payment"
                          value="momo"
                          onClick={(e) => setCheckMethod(e.target.value)}
                        />
                        <span>Ví Momo </span>
                      </li>
                      <li className="flex items-center gap-2 settingli mt-2 mb-6">
                        <input
                          type="radio"
                          id="momo"
                          name="payment"
                          value="bank"
                          onClick={(e) => setCheckMethod(e.target.value)}
                        />
                        <span>Chuyển khoản qua ngân hàng/Internet Banking</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-span-1 mb-5">
                  <div className="w-full h-full p-2">
                    <div className="text-[24px] text-[#00b5f1] font-medium flex items-center gap-2">
                      <span>
                        <FaCreditCard />
                      </span>
                      <span>Thông tin thanh toán</span>
                    </div>
                    <div className="w-full border border-solid border-[#00b5f1] shadow-xl rounded-lg p-3 mb-4">
                      <ul>
                        <li className="text-[#003553] border-b border-solid border-[#c2c2c2]/60 flex justify-between items-center settingli mb-5">
                          <div className="flex items-center gap-2 font-medium mb-3">
                            <span className="">
                              <FaBriefcaseMedical className="text-[#c2c2c2]" />
                            </span>
                            <span>Chuyên khoa</span>
                          </div>
                          <span>Khám tổng quát</span>
                        </li>
                        <li className="text-[#003553] border-b border-solid border-[#c2c2c2]/60 flex justify-between items-center settingli my-5">
                          <div className="flex items-center gap-2 font-medium mb-3">
                            <span className="">
                              <FaUserDoctor className="text-[#c2c2c2]" />
                            </span>
                            <span>Bác sĩ</span>
                          </div>
                          <span>Trần thanh phong</span>
                        </li>
                        <li className="text-[#003553] border-b border-solid border-[#c2c2c2]/60 flex justify-between items-center settingli my-5">
                          <div className="flex items-center gap-2 font-medium mb-3">
                            <span className="">
                              <MdOutlineMedicalServices className="text-[#c2c2c2]" />
                            </span>
                            <span>Dịch vụ</span>
                          </div>
                          <span>Tầng trệt, 1 Khu B</span>
                        </li>
                        <li className="text-[#003553] border-b border-solid border-[#c2c2c2]/60 flex justify-between items-center settingli my-5">
                          <div className="flex items-center gap-2 font-medium mb-3">
                            <span className="">
                              <BsCalendar2DateFill className="text-[#c2c2c2]" />
                            </span>
                            <span>Ngày khám</span>
                          </div>
                          <span>10/12/2024</span>
                        </li>
                        <li className="text-[#003553] border-b border-solid border-[#c2c2c2]/60 flex justify-between items-center settingli my-5">
                          <div className="flex items-center gap-2 font-medium mb-3">
                            <span className="">
                              <FaClock className="text-[#c2c2c2]" />
                            </span>
                            <span>Giờ khám</span>
                          </div>
                          <span>09:30 - 10:30</span>
                        </li>
                        <li className="text-[#003553]  flex justify-between items-center settingli mt-5">
                          <div className="flex items-center gap-2 font-medium mb-3">
                            <span className="">
                              <MdOutlineAttachMoney className="text-[#c2c2c2]" />
                            </span>
                            <span>Tiền khám</span>
                          </div>
                          <span className="text-[#00b5f1]">
                            Thanh toán tại Bệnh viện
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[20px] text-[#003553] font-medium whitespace-nowrap">
                        Tổng Cộng:
                      </span>
                      <span className="text-[18px] text-[#00b5f1] font-medium whitespace-nowrap">
                        100 triệu đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[40px] flex items-center justify-end my-5">
              <button
                onClick={PayWithMomo}
                className="py-2 flex items-center justify-center gap-2 px-6 bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-lg text-[#fff]"
                id="godown"
              >
                Xác nhận
                <span>
                  <FaArrowRight id="goright" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoosePayment;
