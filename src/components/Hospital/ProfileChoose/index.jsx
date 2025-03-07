import React, { Fragment, useContext, useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import {
  FaArrowRight,
  FaBirthdayCake,
  FaEdit,
  FaFileMedical,
  FaMale,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import "./Profilechoose.scss";
import { Link, useLocation } from "react-router-dom";
import {profilebyaccount} from "../../../api/Profile/profilebyaccount";
import { AppContext } from "../../Context/AppProvider";
const fakedata = [{ id: 1 }, { id: 2 }];
function ProfileChoose(props) {
  const location = useLocation();
  const getParams = new URLSearchParams(location.search);
  const doctorId = getParams.get("doctor")
  const workid = getParams.get("work")
  const specialtyid = getParams.get("specialty")

  const [selectProfileId, setSelectProfileId] = useState(null);
  const [DataProfile, setDataProfile] = useState([]);
    const { User } = useContext(AppContext);
  
  const handleSelectProfile = (e) => {
    setSelectProfileId(e);
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profilebyaccount(User?.id); 
      setDataProfile(data); 
    };

    fetchProfile();
  }, []);
  useEffect(() => {
    console.log(selectProfileId);
  }, [selectProfileId])

  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 max-lg:4/5 mb-10">
        <Breadcrumbs />
        <div className="w-full text-center my-2">
          <span className="text-[#00b5f1] text-[30px] font-bold ">
            Chọn hồ sơ bệnh nhân
          </span>
        </div>
        {DataProfile.map((item, index) => (
          <div
            className="w-full flex justify-center items-center my-2"
            key={index}
          >
            <div
              className={`lg:w-1/2  bg-[#fff] shadow-xl border border-solid border-[#eaeaea] cursor-pointer rounded-lg p-2 selectprofile ${
                selectProfileId == item.id ? "isactiveprofile" : ""
              }`}
              onClick={() => handleSelectProfile(item.id)}
            >
              <ul className="list-none flex flex-wrap p-4 justify-between">
                <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                  <span className="flex items-center gap-2 ">
                    <FaUserCircle className="text-[#B1B1B1] text-[18px]" />
                    <span>Họ và tên :</span>
                  </span>
                  <span className="text-[18px] font-medium text-[#00b5f1]">
                    {item.fullname}
                  </span>
                </li>
                <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                  <span className="flex items-center gap-2 ">
                    <FaBirthdayCake className="text-[#B1B1B1] text-[18px]" />
                    <span>Ngày Sinh :</span>
                  </span>
                  <span className="text-[14px] font-medium text-[#003553]">
                    {item.birthdate}
                  </span>
                </li>
                <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                  <span className="flex items-center gap-2 ">
                    <FaPhoneAlt className="text-[#B1B1B1] text-[18px]" />
                    <span>Số điện thoại :</span>
                  </span>
                  <span className="text-[14px] font-medium text-[#003553]">
                    {item.phone}
                  </span>
                </li>
                <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                  <span className="flex items-center gap-2 ">
                    <FaMale className="text-[#B1B1B1] text-[18px]" />
                    <span>Giới tính :</span>
                  </span>
                  <span className="text-[14px] font-medium text-[#003553]">
                    {item.gender == "Female" ? "Nữ" : "Nam"}
                  </span>
                </li>
                <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                  <span className="flex items-center gap-2 ">
                    <FaLocationDot className="text-[#B1B1B1] text-[18px]" />
                    <span>Địa chỉ :</span>
                  </span>
                  <span className="text-[14px] font-medium text-[#003553]">
                    {item.address}
                  </span>
                </li>
                <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                  <span className="flex items-center gap-2 ">
                    <MdGroups className="text-[#B1B1B1] text-[18px]" />
                    <span>Dân tộc :</span>
                  </span>
                  <span className="text-[14px] font-medium text-[#003553]">
                    {item.nation}
                  </span>
                </li>
              </ul>
              {selectProfileId == item.id ? (
                <div className="mb-2">
                  <hr className="h-[1px] mb-2" />
                  <div className="w-full h-[40px] flex items-center justify-end">
                    <Link to={`/confirm-information?hospital=choray&doctor=${doctorId}&work=${workid}&specialty=${specialtyid}&profile=${selectProfileId}`}>
                      <button
                        className="py-2 flex items-center justify-center gap-2 px-6 bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-lg text-[#fff]"
                        id="godown"
                      >
                        Tiếp tục
                        <span>
                          <FaArrowRight id="goright" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <Fragment></Fragment>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileChoose;
