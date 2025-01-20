import { Breadcrumb } from "antd";
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import { LuStethoscope } from "react-icons/lu";
import { IoCalendar } from "react-icons/io5";
import { Link } from "react-router-dom";

function FormAppointment(props) {
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 ">
        <Breadcrumbs />
        <div className="w-full flex justify-center mt-2">
          <div>
            <div className="text-center font-medium text-[#00b5f1] text-3xl md:text-5xl">
              <span>Các hình thức đặt khám</span>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-4 mb-48">
              <div className="col-span-1">
                <Link to={"/hospital/booking"}>
                  <div className="w-full  shadow-lg bg-[#fff] pl-4 pr-8 py-4 flex gap-2 items-center rounded-lg cursor-pointer">
                    <div className="text-[40px] text-[#00b5f1]">
                      <LuStethoscope />
                    </div>
                    <span>Đặt khám theo bác sĩ</span>
                  </div>
                </Link>
              </div>
              <div className="col-span-1">
                <Link to={"/hospital/booking?type=specialty"}>
                  <div className="w-full  shadow-lg bg-[#fff] pl-4 pr-8 py-4 flex gap-2 items-center rounded-lg cursor-pointer">
                    <div className="text-[40px] text-[#00b5f1]">
                      <IoCalendar />
                    </div>
                    <span>Đặt khám theo chuyên khoa</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAppointment;
