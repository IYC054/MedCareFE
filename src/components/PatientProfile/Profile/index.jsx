import React, { Fragment, useState } from "react";
import Breadcrumbs from "../../Hospital/Breadcrumbs";
import Avatar from "../../../../asset/avatar_2.jpeg";
import {
  FaBirthdayCake,
  FaEdit,
  FaFileMedical,
  FaMale,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";

import "./PatientProfile.scss";
import { Link } from "react-router-dom";
import Tabprofile from "./Tabprofile";
import TabAppointment from "./TabAppointment";
function PatientProfile() {
  const [selectTabProfile, setSelectTabProfile] = useState(true);
  const [selectTabAppointment, setSelectTabAppointment] = useState(false);
  const handleTab = (value) => {
    if(value == "hosobenhnhan"){
      setSelectTabProfile(true);
      setSelectTabAppointment(false);
    }else if(value == "phieukhambenh"){
      setSelectTabProfile(false);
      setSelectTabAppointment(true);
    }
  }
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 mb-2">
        <Breadcrumbs />
        <div className="w-full mt-4 grid grid-cols-4 gap-3">
          <div className="col-span-1">
            <div className="w-full bg-[#fff] border border-solid border-[#eaeaea] rounded-lg shadow-xl mb-5">
              <div className="w-full h-[240px] my-4  flex justify-center">
                <div className="w-56 h-full  rounded-full">
                  <img
                    src={Avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-2 mb-6 text-[20px] font-medium text-[#003553]">
                <p>Trần Văn Anh Yeong</p>
                <p className="text-[#c2c2c2] text-[16px] my-2">Bệnh nhân</p>
              </div>
            </div>
            <div className="w-full  mb-5">
              <ul className="list-none text-center py-2 my-2">
                <li onClick={() => handleTab("hosobenhnhan")} className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabProfile ? "isactive" : ""} cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}>
                  <FaFileMedical className="text-[20px]" />
                  Hồ sơ bệnh nhân
                </li>
                <li onClick={() => handleTab("phieukhambenh")} className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabAppointment ? "isactive" : ""} cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}>
                  <FaFileMedical className="text-[20px]" />
                  Phiếu khám bệnh
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-3">
           {selectTabProfile ? <Tabprofile /> : <Fragment />}
           {selectTabAppointment ? <TabAppointment /> : <Fragment />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
