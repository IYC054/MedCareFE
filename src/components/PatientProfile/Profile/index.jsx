import React, { useState } from "react";
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
function PatientProfile() {
  const [dataProfile, setDataProfile] = useState([]);
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
                <li className="my-4 flex justify-center hover:bg-[#fff] isactive cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium">
                  <FaFileMedical className="text-[20px]" />
                  Hồ sơ bệnh nhân
                </li>
                <li className="my-4 flex justify-center hover:bg-[#fff] cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium">
                  <FaFileMedical className="text-[20px]" />
                  Phiếu khám bệnh
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-3">
            <div className="w-full h-full  border-l border-[#00b5f1] pl-10">
              <span className="text-[24px] font-medium">Hồ Sơ Bệnh Nhân</span>
              {dataProfile.length > 0 ? (
                <div className="my-4 w-full  bg-[#fff] rounded-xl border border-solid border-[#eaeaea]">
                  <ul className="list-none flex flex-wrap p-4 justify-between">
                    <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                      <span className="flex items-center gap-2 ">
                        <FaUserCircle className="text-[#B1B1B1] text-[18px]" />
                        <span>Họ và tên :</span>
                      </span>
                      <span className="text-[18px] font-medium text-[#00b5f1]">
                        Trần Văn Anh Yeong
                      </span>
                    </li>
                    <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                      <span className="flex items-center gap-2 ">
                        <FaBirthdayCake className="text-[#B1B1B1] text-[18px]" />
                        <span>Ngày Sinh :</span>
                      </span>
                      <span className="text-[14px] font-medium text-[#003553]">
                        1/1/2004
                      </span>
                    </li>
                    <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                      <span className="flex items-center gap-2 ">
                        <FaPhoneAlt className="text-[#B1B1B1] text-[18px]" />
                        <span>Số điện thoại :</span>
                      </span>
                      <span className="text-[14px] font-medium text-[#003553]">
                        0362061339
                      </span>
                    </li>
                    <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                      <span className="flex items-center gap-2 ">
                        <FaMale className="text-[#B1B1B1] text-[18px]" />
                        <span>Giới tính :</span>
                      </span>
                      <span className="text-[14px] font-medium text-[#003553]">
                        Trần Văn Anh Yeong
                      </span>
                    </li>
                    <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                      <span className="flex items-center gap-2 ">
                        <FaLocationDot className="text-[#B1B1B1] text-[18px]" />
                        <span>Địa chỉ :</span>
                      </span>
                      <span className="text-[14px] font-medium text-[#003553]">
                        177 khổng tử 254/11, Xã Bàu Trâm, Thành phố Long Khánh,
                        Tỉnh Đồng Nai
                      </span>
                    </li>
                    <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                      <span className="flex items-center gap-2 ">
                        <MdGroups className="text-[#B1B1B1] text-[18px]" />
                        <span>Dân tộc :</span>
                      </span>
                      <span className="text-[14px] font-medium text-[#003553]">
                        Kinh
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
