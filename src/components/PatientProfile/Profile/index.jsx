import React from "react";
import Breadcrumbs from "../../Hospital/Breadcrumbs";
import Avatar from "../../../../asset/avatar.jpg";
import { RiFileUserLine } from "react-icons/ri";
import { FaFileMedical } from "react-icons/fa";
import './PatientProfile.scss'
function PatientProfile(props) {
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 mb-2">
        <Breadcrumbs />
        <div className="w-full mt-4 grid grid-cols-4 gap-3">
          <div className="col-span-1">
            <div className="w-full bg-[#fff] border border-solid border-[#eaeaea] rounded-lg shadow-xl mb-5">
              <div className="w-full h-[200px] my-4  flex justify-center">
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
                <li className="my-4 flex justify-center hover:bg-[#fff] active cursor-pointer rounded-md  hover:border-l-[3px] hover:border-[#00b5f1] hover:border-solid items-center gap-2 text-[18px] hover:text-[#00b5f1] font-medium">
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
            <div className="w-full h-full bg-[#fff] rounded-lg border border-solid border-[#eaeaea]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
