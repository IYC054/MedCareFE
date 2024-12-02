import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../Hospital/Breadcrumbs";
import { Select } from "antd";
import { districtApi, provinceApi, wardApi } from "../../../api/province";
function AddProfile(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [selectProvince, setSelectProvince] = useState(null);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await provinceApi.get("");
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh:", error);
      }
    };
    fetchProvinces();
  }, []);
  useEffect(() => {
    setDistricts([]);
    const fetchDistricts = async () => {
      try {
        const response = await districtApi(selectProvince).get("");
        setDistricts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDistricts();
  }, [selectProvince]);
  useEffect(() => {
    setWards([]);
    const fetchWars = async () => {
      try {
        const response = await wardApi(selectDistrict).get("");
        setWards(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWars();
  }, [selectDistrict]);
  useEffect(() => {
    console.log("selectProvinces", selectDistrict);
  }, [selectDistrict]);
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 mb-2">
        <Breadcrumbs />
        <div className="w-full justify-center grid grid-cols-2  rounded-lg mt-5">
          <div className="col-span-1 p-4 w-full h-full border border-solid border-[#f2f2f2] my-2 bg-[#e8f2f7] rounded-tl-lg rounded-bl-lg">
            <span className="text-[red] text-[24px]">
              ( * ) Thông tin bắt buộc nhập
            </span>
            <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
              <div className="col-span-1 ">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Họ và tên (có dấu) <span className="text-[red]"> *</span>{" "}
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
                  Ngày Sinh
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Select className="mt-2 h-10" defaultValue={"Ngày"}>
                    <Select.Option value="15">15</Select.Option>
                  </Select>
                  <Select className="mt-2 h-10" defaultValue={"Tháng"}>
                    <Select.Option value="1">1</Select.Option>
                  </Select>
                  <Select className="mt-2 h-10" defaultValue={"Năm"}>
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
                  Số điện thoại <span className="text-[red]"> *</span>{" "}
                </label>
                <input
                  type="text"
                  placeholder="NHẬP SỐ ĐIỆN THOẠI"
                  className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                />{" "}
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Giới Tính
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <Select className="mt-2 h-10">
                    <Select.Option value="Male">Nam</Select.Option>
                    <Select.Option value="Female">Nữ</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Nghề nghiệp
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <Select className="mt-2 h-10">
                    <Select.Option value="#">Bác sĩ</Select.Option>
                    <Select.Option value="#">Cảnh sát</Select.Option>
                  </Select>
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Số CCCD
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    placeholder="NHẬP SỐ CCCD"
                    className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Địa chỉ Email
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    placeholder="NHẬP ĐỊA CHỈ EMAIL "
                    className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Dân tộc
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <Select className="mt-2 h-10">
                    <Select.Option value="#">Kinh</Select.Option>
                    <Select.Option value="#">Hoa</Select.Option>
                    <Select.Option value="#">Khơ-me</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Tỉnh / thành
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <Select
                    className="mt-2 h-10"
                    onChange={(value) => setSelectProvince(value)}
                  >
                    {provinces.map((item, index) => (
                      <Select.Option value={item.id} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Quận / Huyện
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <Select
                    className="mt-2 h-10"
                    onChange={(value) => setSelectDistrict(value)}
                    disabled={!districts.length}
                  >
                    {districts.map((item, index) => (
                      <Select.Option value={item.id} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Phường / Xã
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <Select className="mt-2 h-10" disabled={!wards.length}>
                  {wards.map((item, index) => (
                      <Select.Option value={item.id} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-[20px] text-[#003553]"
                >
                  Địa chỉ hiện tại
                  <span className="text-[red]"> *</span>{" "}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    placeholder="NHẬP ĐỊA CHỈ HIỆN TẠI CỦA BẠN"
                    className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button className="py-2 px-4 text-[#fff] font-medium rounded-lg bg-gradient-to-r from-[#00b5f1] to-[#00e0ff]">
                Cập nhật
              </button>
            </div>
          </div>
          <div className="col-span- w-full h-full ">
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
