import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../Hospital/Breadcrumbs";
import { Select } from "antd";
import { districtApi, provinceApi, wardApi } from "../../../api/province";
import axios from "axios";
function AddProfile(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [selectProvince, setSelectProvince] = useState(null);
  const [txtProvinces, setTxtProvinces] = useState(null);
  const [txtDistricts, setTxtDistricts] = useState(null);
  const [txtAddress, settxtAddress] = useState(null);
  const [txtWards, setTxtWards] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [formValues, setFormValues] = useState({
    fullname: "",
    birthdate: { day: "15", month: "1", year: "2002" },
    phone: "",
    gender: "Male",
    occupation: "",
    codeBhyt: "",
    email: "",
    nation: "",
    address: "",
    accountid: 1,
  });
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

  ////////////////////////////////////////////////////////////////////////////////////////
  const years = [];
  for (let i = 1950; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  // Tạo mảng tháng từ 1 đến 12
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  // Tạo mảng ngày cho từng tháng
  const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  // Tạo mảng ngày tùy theo tháng và năm
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysInSelectedMonth = daysInMonth(
      formValues.birthdate.year,
      formValues.birthdate.month
    );
    setDays(
      Array.from({ length: daysInSelectedMonth }, (_, index) => index + 1)
    );
  }, [formValues.birthdate.year, formValues.birthdate.month]);

  const handleInputChange = (field, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const validateForm = () => {
    const errors = {};

    // Validate fullname (more than 6 characters)
    if (formValues.fullname.length <= 6) {
      errors.fullname = "Tên phải có ít nhất 6 ký tự!";
    }

    // Validate phone (must be 10 digits)
    if (!/^\d{10}$/.test(formValues.phone)) {
      errors.phone = "Số điện thoại phải có 10 chữ số!";
    }

    

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email không hợp lệ!";
    }

    return errors;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // If there are errors, display them and stop submission
      setErrorMessages(errors);
      return;
    }
    const formattedDate = `${formValues.birthdate.year}-${formValues.birthdate.month}-${formValues.birthdate.day}`;
    const formatAddress = `${txtProvinces} ${txtDistricts} ${txtWards} ${txtAddress}`;
    const dataToSend = {
      ...formValues,
      birthdate: formattedDate,
      address: formatAddress,
    };
    try {
      axios
        .post("http://localhost:8080/api/patientsprofile", dataToSend)
        .then(() => {
          navigator("/hospital");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 mb-2">
        <Breadcrumbs />
        <div className="w-full justify-center grid grid-cols-2  rounded-lg mt-5">
          <form onSubmit={handleOnSubmit}>
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
                    value={formValues.fullname}
                    onChange={(e) =>
                      handleInputChange("fullname", e.target.value)
                    }
                    className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                  />{" "}
                  {errorMessages.fullname && (
                    <small className="text-red-500 text-sm ">
                      {errorMessages.fullname}
                    </small>
                  )}
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
                    <Select
                      className="mt-2 h-10"
                      value={formValues.birthdate.day}
                      onChange={(value) =>
                        handleInputChange("birthdate", {
                          ...formValues.birthdate,
                          day: value,
                        })
                      }
                    >
                      {days.map((day) => (
                        <Select.Option key={day} value={day}>
                          {day}
                        </Select.Option>
                      ))}
                    </Select>
                    <Select
                      className="mt-2 h-10"
                      value={formValues.birthdate.month}
                      onChange={(value) =>
                        handleInputChange("birthdate", {
                          ...formValues.birthdate,
                          month: value,
                        })
                      }
                    >
                      {months.map((month) => (
                        <Select.Option key={month} value={month}>
                          {month}
                        </Select.Option>
                      ))}
                    </Select>
                    <Select
                      className="mt-2 h-10"
                      value={formValues.birthdate.year}
                      onChange={(value) =>
                        handleInputChange("birthdate", {
                          ...formValues.birthdate,
                          year: value,
                        })
                      }
                    >
                      {years.map((year) => (
                        <Select.Option key={year} value={year}>
                          {year}
                        </Select.Option>
                      ))}
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
                    value={formValues.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                  />{" "}
                  {errorMessages.phone && (
                    <small className="text-red-500 text-sm ">
                      {errorMessages.phone}
                    </small>
                  )}
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
                    <Select
                      className="mt-2 h-10"
                      value={formValues.gender}
                      onChange={(value) => handleInputChange("gender", value)}
                    >
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
                    <span className="text-[red]"></span>{" "}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    <Select
                      className="mt-2 h-10"
                      value={formValues.occupation}
                      onChange={(value) =>
                        handleInputChange("occupation", value)
                      }
                    >
                      <Select.Option value="Bác sĩ">Bác sĩ</Select.Option>
                      <Select.Option value="Cảnh sát">Cảnh sát</Select.Option>
                    </Select>
                  </div>
                </div>
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
                      value={formValues.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                    />
                  </div>
                  {errorMessages.email && (
                    <small className="text-red-500 text-sm ">
                      {errorMessages.email}
                    </small>
                  )}
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
                    <Select
                      className="mt-2 h-10"
                      value={formValues.nation}
                      onChange={(value) => handleInputChange("nation", value)}
                    >
                      <Select.Option value="Kinh">Kinh</Select.Option>
                      <Select.Option value="Hoa">Hoa</Select.Option>
                      <Select.Option value="Khơ-me">Khơ-me</Select.Option>
                    </Select>
                  </div>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="username"
                    className="text-[20px] text-[#003553]"
                  >
                    Mã số BHYT
                    <span className="text-[red]"> *</span>{" "}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    <input
                      type="text"
                      placeholder="NHẬP SỐ BHYT"
                      value={formValues.codeBhyt}
                      onChange={(e) =>
                        handleInputChange("codeBhyt", e.target.value)
                      }
                      className="w-full h-10 border p-2 mt-2 border-solid border-[#c2c2c2] rounded-lg focus:border-[#47bfff] focus:ring-2 focus:ring-[#1da1f2]/20 focus:outline-none"
                    />{" "}

                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
                  <div className="col-span-2">
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
                        onChange={(value) => {
                          const selectedItem = provinces.find(
                            (item) => item.id === value
                          );
                          setSelectProvince(value);
                          if (selectedItem) {
                            setTxtProvinces(selectedItem.name);
                          }
                        }}
                      >
                        {provinces.map((item, index) => (
                          <Select.Option value={item.id} key={index}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
                  <div className="col-span-2">
                    <label
                      htmlFor="username"
                      className="text-[20px] text-[#003553]"
                    >
                      Quận / Huyện
                      <span className="text-[red]"> *</span>
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <Select
                        className="mt-2 h-10"
                        onChange={(value) => {
                          const selectedItem = districts.find(
                            (item) => item.id === value
                          );
                          setSelectDistrict(value);
                          if (selectedItem) {
                            setTxtDistricts(selectedItem.name);
                          }
                        }}
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
                  <div className="col-span-2">
                    <label
                      htmlFor="username"
                      className="text-[20px] text-[#003553]"
                    >
                      Phường / Xã
                      <span className="text-[red]"> *</span>{" "}
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <Select
                        className="mt-2 h-10"
                        disabled={!wards.length}
                        onChange={(value) => {
                          const selectedItem = wards.find(
                            (item) => item.id === value
                          );
                          if (selectedItem) {
                            setTxtWards(selectedItem.name);
                          }
                        }}
                      >
                        {wards.map((item, index) => (
                          <Select.Option value={item.id} key={index}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-5 font-medium ">
                  <div className="col-span-2">
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
                        value={txtAddress}
                        onChange={(e) => settxtAddress(e.target.value)}
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
            </div>
          </form>
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
