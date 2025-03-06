import React, { Fragment, useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../Hospital/Breadcrumbs";
import AvatarPatient from "../../../../asset/avatar_2.jpeg";
import AvatarDoctor from "../../../../asset/doctor.png";
import {
  FaBirthdayCake,
  FaEdit,
  FaFileMedical,
  FaMale,
  FaPhoneAlt,
  FaSearch,
  FaUserCircle,
  FaUserPlus,
  FaCommentDots ,
} from "react-icons/fa";
import { FaCalendarDays, FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";

import "./PatientProfile.scss";
import { Link, useNavigate } from "react-router-dom";
import Tabprofile from "./Tabprofile";
import TabAppointment from "./TabAppointment";
import TabDoctorappointment from "./TabDoctorappointment";
import TabDoctorwithpatient from "./TabDoctorwithpatient";
import { AppContext } from "../../Context/AppProvider";
import { enqueueSnackbar } from "notistack";
import TabFeedBack from "./TabFeedBack";
import TabDoctorvipappointment from "./TabDoctorvipappointment";
import TabChat from "./TabChat";

function PatientProfile() {
  const [selectTabProfile, setSelectTabProfile] = useState(true);
  const [selectTabAppointment, setSelectTabAppointment] = useState(false);
  const [selectTabVIPAppointment, setSelectTabVIPAppointment] = useState(false);
  const [selectTabChat, setSelectTabChat] = useState(false);

  const [selectTabFeedback, setSelectTabFeedback] = useState(false);
  const navigator = useNavigate();
  const [selectTabDoctorAppointment, setSelectTabDoctorAppointment] =
    useState(false);
  const [selectTabDoctorWithPatient, setSelectTabDoctorWithPatient] =
    useState(false);
  // const [selectTabBHYT, setSelectTabBHYT] = useState(false);
  const { User } = useContext(AppContext);
  useEffect(() => {
    if (User == null || User == []) {
      enqueueSnackbar("Bạn chưa đăng nhập", {
        variant: "warning",
        autoHideDuration: 3000,
      });
      navigator("/");
    }
  }, [User]);
  const handleTab = (value) => {
    if (value == "hosobenhnhan") {
      setSelectTabProfile(true);
      setSelectTabDoctorAppointment(false);
      setSelectTabAppointment(false);
      setSelectTabDoctorWithPatient(false);
      setSelectTabFeedback(false);
      setSelectTabVIPAppointment(false);
      setSelectTabChat(false);
    } else if (value == "phieukhambenh") {
      setSelectTabAppointment(true);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(false);
      setSelectTabDoctorAppointment(false);
      setSelectTabFeedback(false);
      setSelectTabVIPAppointment(false);
      setSelectTabChat(false);

    } else if (value == "quanlydatlich") {
      setSelectTabDoctorAppointment(true);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(false);
      setSelectTabAppointment(false);
      setSelectTabFeedback(false);
      setSelectTabVIPAppointment(false);
      setSelectTabChat(false);

    } else if (value == "quanlybenhnhan") {
      setSelectTabAppointment(false);
      setSelectTabDoctorAppointment(false);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(true);
      setSelectTabFeedback(false);
      setSelectTabVIPAppointment(false);
      setSelectTabChat(false);

    } else if (value == "feedback") {
      setSelectTabAppointment(false);
      setSelectTabDoctorAppointment(false);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(false);
      setSelectTabVIPAppointment(false);
      setSelectTabFeedback(true);
      setSelectTabChat(false);

    } else if (value == "quanlydatlichvip") {
      setSelectTabDoctorAppointment(false);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(false);
      setSelectTabAppointment(false);
      setSelectTabFeedback(false);
      setSelectTabVIPAppointment(true);
      setSelectTabChat(false);

    } else if (value == "chat") {
      setSelectTabDoctorAppointment(false);
      setSelectTabProfile(false);
      setSelectTabDoctorWithPatient(false);
      setSelectTabAppointment(false);
      setSelectTabFeedback(false);
      setSelectTabVIPAppointment(false);
      setSelectTabChat(true);

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
                    src={
                      User?.role?.[0]?.name == "PATIENTS"
                        ? AvatarPatient
                        : AvatarDoctor
                    }
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-2 mb-6 text-[20px] font-medium text-[#003553]">
                <p>{User?.name}</p>
                <p className="text-[#c2c2c2] text-[16px] my-2">
                  {User?.role?.[0]?.name == "PATIENTS" ? "Bệnh nhân" : "Bác sĩ"}
                </p>
              </div>
            </div>
            <div className="w-full  mb-5">
              <ul className="list-none text-center py-2 my-2">
                {User?.role?.[0]?.name == "PATIENTS" ? (
                  <Fragment>
                    <li
                      onClick={() => handleTab("hosobenhnhan")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabProfile ? "isactive" : ""
                        } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaUserPlus className="text-[20px]" />
                      Hồ sơ bệnh nhân
                    </li>
                    <li
                      onClick={() => handleTab("phieukhambenh")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabAppointment ? "isactive" : ""
                        } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaFileMedical className="text-[20px]" />
                      Phiếu khám bệnh
                    </li>
                    <li
                      onClick={() => handleTab("feedback")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabFeedback ? "isactive" : ""
                        } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaUserPlus className="text-[20px]" />
                      Feedback
                    </li>
                    {/* <li
                      onClick={() => handleTab("chat")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabChat ? "isactive" : ""
                        } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaCommentDots  className="text-[20px]" />
                      Chat
                    </li> */}
                  </Fragment>
                ) : (
                  ""
                )}

                {User?.role?.[0]?.name == "DOCTOR" ? (
                  <Fragment>
                    <li
                      onClick={() => handleTab("quanlydatlich")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabDoctorAppointment ? "isactive" : ""
                        } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaCalendarDays className="text-[20px]" />
                      Quản lý lịch hẹn
                    </li>
                    {/* <li
                      onClick={() => handleTab("quanlydatlichvip")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${
                        selectTabVIPAppointment ? "isactive" : ""
                      } cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium`}
                    >
                      <FaCalendarDays className="text-[20px]" />
                      Quản lý lịch hẹn VIP
                    </li> */}
                    <li
                      onClick={() => handleTab("quanlybenhnhan")}
                      className={`my-4 flex justify-center hover:bg-[#fff] ${selectTabDoctorWithPatient ? "isactive" : ""
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
            {selectTabProfile && User?.role?.[0]?.name == "PATIENTS" ? (
              <Tabprofile />
            ) : (
              <Fragment />
            )}
            {selectTabFeedback &&
              ["PATIENTS", "DOCTOR"].includes(User?.role?.[0]?.name) ? (
              <TabFeedBack />
            ) : (
              <Fragment />
            )}
            {/* {selectTabChat &&
              ["PATIENTS", "DOCTOR"].includes(User?.role?.[0]?.name) ? (
              <TabChat />
            ) : (
              <Fragment />
            )} */}
            {selectTabAppointment && User?.role?.[0]?.name == "PATIENTS" ? (
              <TabAppointment />
            ) : (
              <Fragment />
            )}
            {selectTabDoctorAppointment && User?.role?.[0]?.name == "DOCTOR" ? (
              <TabDoctorappointment />
            ) : (
              <Fragment />
            )}
            {selectTabDoctorWithPatient && User?.role?.[0]?.name == "DOCTOR" ? (
              <TabDoctorwithpatient />
            ) : (
              <Fragment />
            )}
            {selectTabVIPAppointment && User?.role?.[0]?.name == "DOCTOR" ? (
              <TabDoctorvipappointment />
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
