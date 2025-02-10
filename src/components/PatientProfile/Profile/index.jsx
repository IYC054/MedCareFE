import React, { Fragment, useContext, useState } from "react";
import Breadcrumbs from "../../Hospital/Breadcrumbs";
import Avatar from "../../../../asset/avatar_2.jpeg";
import {
  FaBirthdayCake,
  FaEdit,
  FaFileMedical,
  FaMale,
  FaPhoneAlt,
  FaSearch,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { FaCalendarDays, FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";

import "./PatientProfile.scss";
import { Link } from "react-router-dom";
import Tabprofile from "./Tabprofile";
import TabAppointment from "./TabAppointment";
import TabCheckBHYT from "./TabCheckBHYT";
import TabDoctorappointment from "./TabDoctorappointment";
import TabDoctorwithpatient from "./TabDoctorwithpatient";
import { AppContext } from "../../Context/AppProvider";
function PatientProfile() {
  const [selectTabProfile, setSelectTabProfile] = useState(true);
  const [selectTabAppointment, setSelectTabAppointment] = useState(false);
  const [selectTabDoctorAppointment, setSelectTabDoctorAppointment] =
    useState(false);
  const [selectTabDoctorWithPatient, setSelectTabDoctorWithPatient] =
    useState(false);
  // const [selectTabBHYT, setSelectTabBHYT] = useState(false);
  const { userId, userRole } = useContext(AppContext);

  const handleTab = (value) => {
    if (value == "hosobenhnhan") {
      setSelectTabProfile(true);
      setSelectTabDoctorAppointment(false);
      setSelectTabAppointment(false);
      setSelectTabDoctorWithPatient(false);
      // setSelectTabBHYT(false);
    } else if (value == "phieukhambenh") {
      setSelectTabAppointment(true);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(false);
      setSelectTabDoctorAppointment(false);

      // setSelectTabBHYT(false);
    } else if (value == "quanlydatlich") {
      setSelectTabDoctorAppointment(true);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(false);
      setSelectTabAppointment(false);
    } else if (value == "quanlybenhnhan") {
      setSelectTabAppointment(false);
      setSelectTabDoctorAppointment(false);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(true);
    }
  };
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 mb-2">
        <Breadcrumbs />
        <div className="w-full mt-4 grid grid-cols-4 gap-3">
          <div className="col-span-1">
            <div className="w-full bg-[#fff] border border-solid border-[#eaeaea] rounded-lg shadow-xl mb-5">
              <div className="w-full  my-4  flex justify-center">
                <div className="w-56 h-full  rounded-full">
                  <img
                    src={Avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-2 mb-6 text-[20px] font-medium text-[#003553]">
                <p>Thanh phong</p>
                <p className="text-[#c2c2c2] text-[16px] my-2">Bệnh nhân</p>
              </div>
            </div>
            <div className="w-full  mb-5">
              <ul className="list-none text-center py-2 my-2">
                {userRole == "Patients" ? (
                  <Fragment>
                    <li
                      onClick={() => handleTab("hosobenhnhan")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${
                        selectTabProfile ? "isactive" : ""
                      } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaUserPlus className="text-[20px]" />
                      Hồ sơ bệnh nhân
                    </li>
                    <li
                      onClick={() => handleTab("phieukhambenh")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${
                        selectTabAppointment ? "isactive" : ""
                      } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaFileMedical className="text-[20px]" />
                      Phiếu khám bệnh
                    </li>
                  </Fragment>
                ) : (
                  ""
                )}

                {userRole == "Doctors" ? (
                  <Fragment>
                    <li
                      onClick={() => handleTab("quanlydatlich")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${
                        selectTabDoctorAppointment ? "isactive" : ""
                      } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaCalendarDays className="text-[20px]" />
                      Quản lý lịch hẹn
                    </li>
                    <li
                      onClick={() => handleTab("quanlybenhnhan")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${
                        selectTabDoctorWithPatient ? "isactive" : ""
                      } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaCalendarDays className="text-[20px]" />
                      Quản lý bệnh nhân
                    </li>
                  </Fragment>
                ) : (
                  ""
                )}
                {/* <li onClick={() => handleTab("bhyt")} className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabBHYT ? "isactive" : ""} cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}>
                  <FaSearch className="text-[20px]" />
                  Tra cứu BHYT
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col-span-3">
            {selectTabProfile && userRole == "Patients" ? (
              <Tabprofile />
            ) : (
              <Fragment />
            )}
            {selectTabAppointment && userRole == "Patients" ? (
              <TabAppointment />
            ) : (
              <Fragment />
            )}
            {selectTabDoctorAppointment && userRole == "Doctors" ? (
              <TabDoctorappointment />
            ) : (
              <Fragment />
            )}
            {selectTabDoctorWithPatient && userRole == "Doctors" ? (
              <TabDoctorwithpatient />
            ) : (
              <Fragment />
            )}
            {/* {selectTabBHYT ? <TabCheckBHYT /> : <Fragment />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
