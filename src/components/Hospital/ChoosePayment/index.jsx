import React, { Fragment, useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import bank from "../../../api/Bank/bank";

import {
  FaAddressCard,
  FaBriefcaseMedical,
  FaBuilding,
  FaClock,
  FaCreditCard,
} from "react-icons/fa";
import { getDoctorbyId } from "../../../api/Doctor/doctor";
import { getSpecialtyById } from "../../../api/Doctor/specialty";
import { getWorkTimeDoctorbyId } from "../../../api/Doctor/workinghour";
import { ProfilebypatientprofileId } from "../../../api/Profile/profilebyaccount";
import { FaArrowRight } from "react-icons/fa";
import { FaLocationDot, FaRegPaste, FaUserDoctor } from "react-icons/fa6";
import { MdOutlineAttachMoney, MdOutlineMedicalServices } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import MomoPayment from "../../../api/Payment/momo";
import axios from "axios";
import { Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmPayment from "./ConfirmPayment";

function ChoosePayment() {
  const location = useLocation();
  const getParams = new URLSearchParams(location.search);
  // data
  const [dataDoctor, setDataDoctor] = useState({});
  const [dataWork, setdataWork] = useState({});
  const [dataSpecialty, setdataSpecialty] = useState({});
  const [dataProfile, setdataProfile] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [fee, setFee] = useState(2000);
  //
  const doctorid = getParams.get("doctor");
  const workid = getParams.get("work");
  const specialtyid = getParams.get("specialty");
  const profileid = getParams.get("profile");

  useEffect(() => {
    const fetchDoctor = async () => {
      const data = await getDoctorbyId(doctorid);
      setDataDoctor(data);
    };

    fetchDoctor();
  }, [doctorid]);
  useEffect(() => {
    const fetchSpecialty = async () => {
      const data = await getSpecialtyById(specialtyid);
      setdataSpecialty(data);
    };

    fetchSpecialty();
  }, [specialtyid]);
  useEffect(() => {
    const fetchDoctor = async () => {
      const data = await getWorkTimeDoctorbyId(workid);
      setdataWork(data);
    };

    fetchDoctor();
  }, [workid]);
  useEffect(() => {
    const fetchDoctor = async () => {
      const data = await ProfilebypatientprofileId(profileid);
      setdataProfile(data);
    };

    fetchDoctor();
  }, [profileid]);
  const TimeFormatted = (time) =>
    new Date(`1970-01-01T${time}`).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const formartDate = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const month = d.getMonth();
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [checkMethod, setCheckMethod] = useState();

  const navigate = useNavigate();

  const PayWithMomo = async () => {
    if (checkMethod == "momo") {
      MomoPayment(fee, "0358227696", doctorid, workid, profileid, specialtyid);
    } else if (checkMethod == "bank") {
      // navigate(`/confirm-payment?doctor=${doctorid}&work=${workid}&specialty=${dataSpecialty.name}&profile=${profileid}`)
    } else {
      alert("Chưa chọn phương thức thanh toán");
    }
  };
  useEffect(() => {
    if (checkMethod == "bank") {
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  }, [checkMethod]);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <div className="flex justify-center py-5">
      <div className="lg:w-4/5 w-full px-2">
        <Breadcrumbs />
        <div className="grid grid-cols-4 gap-4">
          <div className="lg:col-span-1 hidden lg:block w-full  py-4 mb-5">
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
          <div className="lg:col-span-3 col-span-4 py-4 w-full ">
            <div className="w-full ">
              <div className="w-full h-[50px] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-t-lg text-[#fff] py-1 px-4 flex items-center justify-center">
                <span className="font-medium text-[20px]">
                  Chọn phương thức thanh toán
                </span>
              </div>
              <div className="w-full grid-cols-3 grid gap-2 bg-[#fff] rounded-bl-lg rounded-br-lg">
                <div className="md:col-span-2 col-span-1">
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
                      <div className="block ">
                        {" "}
                        {showQR ? <ConfirmPayment /> : <Fragment></Fragment>}
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="md:col-span-1 col-span-2 mb-5">
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
                          <span>Khám {dataSpecialty.name}</span>
                        </li>
                        <li className="text-[#003553] border-b border-solid border-[#c2c2c2]/60 flex justify-between items-center settingli my-5">
                          <div className="flex items-center gap-2 font-medium mb-3">
                            <span className="">
                              <FaUserDoctor className="text-[#c2c2c2]" />
                            </span>
                            <span>Bác sĩ</span>
                          </div>
                          <span>{dataDoctor.name}</span>
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
                          <span>{formartDate(dataWork.workDate)}</span>
                        </li>
                        <li className="text-[#003553] border-b border-solid border-[#c2c2c2]/60 flex justify-between items-center settingli my-5">
                          <div className="flex items-center gap-2 font-medium mb-3">
                            <span className="">
                              <FaClock className="text-[#c2c2c2]" />
                            </span>
                            <span>Giờ khám</span>
                          </div>
                          <span>
                            {TimeFormatted(dataWork.startTime)} -{" "}
                            {TimeFormatted(dataWork.endTime)}
                          </span>
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
                        {formatCurrency(fee)}
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
            <div className="w-full items-center justify-center my-5 md:hidden block">
              {/* {showQR ? <ConfirmPayment /> : <Fragment></Fragment>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChoosePayment;
