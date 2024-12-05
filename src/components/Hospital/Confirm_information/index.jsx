import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import { FaBuilding } from "react-icons/fa";

function ConfirmInfo(props) {
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 ">
        <Breadcrumbs />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 w-full  py-4">
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
        </div>
      </div>
    </div>
  );
}

export default ConfirmInfo;
