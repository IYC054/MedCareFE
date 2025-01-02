import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBirthdayCake,
  FaEdit,
  FaMale,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { profilebyaccountId } from "../../../api/Profile/profilebyaccount";

function Tabprofile() {
  const [dataProfile, setDataProfile] = useState([]);
  useEffect(() => {
    const getdataprofile = async () => {
      const result = await profilebyaccountId(1);
      setDataProfile(result)
    }
    getdataprofile();
  }, [])
  return (
    <div className="w-full h-full  border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">Hồ Sơ Bệnh Nhân</span>
      {dataProfile && Object.keys(dataProfile).length > 0 ? (
        <div className="my-4 w-full  bg-[#fff] rounded-xl border border-solid border-[#eaeaea]">
          <ul className="list-none flex flex-wrap p-4 justify-between">
            <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
              <span className="flex items-center gap-2 ">
                <FaUserCircle className="text-[#B1B1B1] text-[18px]" />
                <span>Họ và tên :</span>
              </span>
              <span className="text-[18px] font-medium text-[#00b5f1]">
                {dataProfile.fullname}
              </span>
            </li>
            <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
              <span className="flex items-center gap-2 ">
                <FaBirthdayCake className="text-[#B1B1B1] text-[18px]" />
                <span>Ngày Sinh :</span>
              </span>
              <span className="text-[14px] font-medium text-[#003553]">
                {dataProfile.birthdate}
              </span>
            </li>
            <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
              <span className="flex items-center gap-2 ">
                <FaPhoneAlt className="text-[#B1B1B1] text-[18px]" />
                <span>Số điện thoại :</span>
              </span>
              <span className="text-[14px] font-medium text-[#003553]">
                {dataProfile.phone}
              </span>
            </li>
            <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
              <span className="flex items-center gap-2 ">
                <FaMale className="text-[#B1B1B1] text-[18px]" />
                <span>Giới tính :</span>
              </span>
              <span className="text-[14px] font-medium text-[#003553]">
                {dataProfile.gender === "Male" ? "Nam" : "Nữ"}
              </span>
            </li>
            <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
              <span className="flex items-center gap-2 ">
                <FaLocationDot className="text-[#B1B1B1] text-[18px]" />
                <span>Địa chỉ :</span>
              </span>
              <span className="text-[14px] font-medium text-[#003553]">
                {dataProfile.address}
              </span>
            </li>
            <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
              <span className="flex items-center gap-2 ">
                <MdGroups className="text-[#B1B1B1] text-[18px]" />
                <span>Dân tộc :</span>
              </span>
              <span className="text-[14px] font-medium text-[#003553]">
                {dataProfile.nation}
              </span>
            </li>
          </ul>
          <div className="w-full h-[50px] rounded-bl-xl rounded-br-xl bg-[#f5f5f5] flex items-center justify-end px-5">
            <div className="flex items-center justify-end text-[#00b5f1] gap-2 cursor-pointer">
              <FaEdit />
              <span className="font-medium">Sửa hồ sơ</span>
            </div>
          </div>
        </div>
      ) : (
        <Link to={"/profile/add"}>
          <div className="flex justify-center items-center w-full">
            <button className="w-full py-4 mt-20 text-[#fff] text-[20px] font-semibold rounded-xl border-[#00b5f1] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff]">
              Chưa có hồ sơ bấm vào để tạo
            </button>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Tabprofile;
