import React, { Fragment, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
const fakedata = [{ id: 1 }, { id: 2 }];
function ListProfile(props) {
  const [selectProfileId, setSelectProfileId] = useState(null);
  const handleSelectProfile = (e) => {
    setSelectProfileId(e);
  };
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 max-lg:4/5 mb-10">
        <Breadcrumbs />
        <div className="w-full text-center my-2">
          <span className="text-[#00b5f1] text-[30px] font-bold ">
            Chọn hồ sơ bệnh nhân
          </span>
        </div>
        {fakedata.map((item, index) => (
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
                    177 khổng tử 254/11, Xã Bàu Trâm, Thành phố Long Khánh, Tỉnh
                    Đồng Nai
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
              {selectProfileId == item.id ? (
                <div className="mb-2">
                  <hr className="h-[1px] mb-2" />
                  <div className="w-full h-[40px] flex items-center justify-end">
                    <Link to={`/confirm-information?hospital=choray`}>
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

export default ListProfile;
