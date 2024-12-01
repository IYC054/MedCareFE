import React from "react";
import Breadcrumbs from "../../Hospital/Breadcrumbs";
import { Select } from "antd";
function AddProfile(props) {
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 mb-2">
        <Breadcrumbs />
        <div className="w-full h-screen  justify-center grid grid-cols-2  rounded-lg mt-5">
          <div className="col-span-1 p-4 w-full h-full border border-solid border-[#f2f2f2] bg-[#e8f2f7] rounded-tl-lg rounded-bl-lg">
            <span className="text-[red] text-[24px]">
              (*) Thông tin bắt buộc nhập
            </span>
            <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
              <div className="col-span-1 ">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Họ và tên (có dấu) <span className="text-[red]">*</span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="VÍ DỤ: NGUYỄN VĂN AN"
                  className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                />{" "}
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Ngày Sinh ( ngày / tháng / năm )
                  <span className="text-[red]">*</span>{" "}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Select className="mt-2 h-10">
                    <Select.Option value="15">15</Select.Option>
                  </Select>
                  <Select className="mt-2 h-10">
                    <Select.Option value="1">1</Select.Option>
                  </Select>
                  <Select className="mt-2 h-10">
                    <Select.Option value="2002">2002</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
              <div className="col-span-1 ">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Số điện thoại <span className="text-[red]">*</span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="VÍ DỤ: NGUYỄN VĂN AN"
                  className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                />{" "}
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Giới Tính
                  <span className="text-[red]">*</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <Select className="mt-2 h-10">
                    <Select.Option value="Male">Nam</Select.Option>
                    <Select.Option value="Female">Nữ</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span- w-full h-full bg-violet-300">
            <img
              src="https://images.unsplash.com/photo-1516841273335-e39b37888115?q=80&w=1694&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="banner"
              className="w-full h-full object-cover rounded-tr-lg rounded-br-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProfile;
