import React, { Fragment, useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { FaBuilding, FaRegCalendarAlt, FaStethoscope } from "react-icons/fa";
import { FaMagnifyingGlass, FaUserDoctor } from "react-icons/fa6";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import "./booking.scss";
import { IoReturnDownBack } from "react-icons/io5";
const fake = [
  { id: 1, name: "Trần Thanh Phong", gender: "Male" },
  { id: 2, name: "Cho In Yeong", gender: "Female" },
  { id: 3, name: "Nguyễn Văn Nghị", gender: "Underfind" },
  { id: 4, name: "Nguyễn Anh Tuấn", gender: "Male" },
];
function Booking() {
  const [ChooseDoctor, setChooseDoctor] = useState(true);
  const [selectName, setSelectName] = useState();
  const HandleChooseDoctor = (name) => {
    setChooseDoctor(false);
    setSelectName(name);
  };
  const handlegoBack = () => {
    setChooseDoctor(true);
    setSelectName(null);
  };
  useEffect(() => {
    console.log(selectName);
    console.log(ChooseDoctor);
  }, [ChooseDoctor, selectName]);
  return (
    <div className="container flex justify-center py-5">
      <div className="w-4/5 ">
        <Breadcrumbs />
        {/* end bread */}
        <div className="grid grid-cols-4 gap-4">
          {/* start col 1 */}
          <div className="col-span-1 w-full  py-4">
            <div className="w-full  bg-[#fff] rounded-lg ">
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
                <li className="flex gap-2 mb-10 text-[#003553]">
                  {selectName != null ? (
                    <Fragment>
                      <FaStethoscope className="text-[#c2c2c2] text-[30px]" />
                      <span>Bác Sĩ : {selectName}</span>
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </li>
              </div>
            </div>
          </div>
          {/* end col 1 */}
          {/* start col 2 */}

          <div className="col-span-3 py-4 w-full ">
            <div className="w-full h-full ">
              <div className="w-full h-[50px] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-t-lg text-[#fff] py-1 px-4 flex items-center justify-center">
                <span className="font-medium text-[20px]">
                  Thông tin cơ sở y tế
                </span>
              </div>
              {ChooseDoctor ? (
                <div className="w-full h-[435px] bg-[#fff] px-4 pt-10 rounded-lg">
                  <div className="w-full h-[40px] relative mb-5">
                    <input
                      className="w-full h-full rounded-md px-4 boder-[#00e0ff] border-solid border-[#c2c2c2] border-[1px] focus:border-[#00e0ff] shadow-xl focus:outline-none"
                      placeholder="Tìm bác sĩ"
                    />
                    <div className="absolute w-[40px] h-full border-solid border-[#c2c2c2] border-[1px] top-0 right-0 rounded-tr-md rounded-br-md flex justify-center items-center">
                      <FaMagnifyingGlass className="text-[#c2c2c2]/60" />
                    </div>
                  </div>
                  <div className="w-full h-[335px] overflow-auto" id="style-5">
                    {fake.map((item, index) => (
                      <div
                        key={index}
                        className="w-full bg-white p-4 list-none text-[#053353] mb-4 rounded-xl border-soid border-[1px] border-[#00e0ff] cursor-pointer"
                        id="goup"
                        onClick={() => HandleChooseDoctor(item.name)}
                      >
                        <li className="w-full text-[#ffb54a] text-[20px] flex gap-2 items-center mb-2">
                          <FaUserDoctor />
                          <span className="font-medium text-[18px]">
                            BS. {item.name}
                          </span>
                        </li>
                        <li className="w-full text-[18px] flex gap-2 items-center mb-2 ">
                          <BsGenderAmbiguous />
                          <span className="text-[14px]">
                            Giới Tính : {item.gender}
                          </span>
                        </li>
                        <li className="w-full text-[18px] flex gap-2 items-center mb-2 ">
                          <FaStethoscope />
                          <span className="text-[14px]">
                            Chuyên khoa : Anh này chuyên khám tại nhà riêng{" "}
                            <span className="text-[red] font-medium">
                              ( lưu ý chị e phụ nữ nên dẫn theo chồng )
                            </span>{" "}
                          </span>
                        </li>
                        <li className="w-full text-[18px] flex gap-2 items-center mb-2 ">
                          <FaRegCalendarAlt />
                          <span className="text-[14px]">
                            Lịch khám : Mọi ngày nhưng chỉ 11h tối
                          </span>
                        </li>
                        <li className="w-full text-[18px] flex gap-2 items-center mb-2 ">
                          <MdAttachMoney />
                          <span className="text-[14px]">
                            Giá khám : Lấy giá tình cảm
                          </span>
                        </li>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Fragment>
                  <div className="w-full bg-[#fff] rounded-lg">
                    <div className="w-full h-full py-2 px-4 ">
                      <table className="table text-[#003553] mb-10">
                        <thead className="border-solid border-b-2 border-[#f2f2f2]">
                          <th className="w-10 py-5">#</th>
                          <th className="py-5">Tên dịch vụ</th>
                          <th className="py-5">Giá tiền</th>
                          <th className="py-5 "></th>
                        </thead>
                        <tbody>
                          <tr className="my-2">
                            <td className="text-center pt-5">1</td>
                            <td className="w-[550px] px-4 pt-5">
                              Lịch khám: Thứ 2, 3, 5, 7 (Phí Khám Khám Tự Chọn
                              Yêu Cầu: 119,500 đ, sử dụng BHYT sẽ giảm trừ theo
                              quy định.)
                            </td>
                            <td className="pt-5">Thanh toán tại Bệnh viện</td>
                            <td className="pt-5">
                              <button className="px-2 py-2 bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-[#fff] rounded-xl whitespace-nowrap">
                                Đặt khám ngay
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button
                    className="flex text-[#003553] gap-2 items-center hover:bg-[#c2c2c2]/20 mt-4 rounded-lg"
                    onClick={handlegoBack}
                  >
                    Quay lại <IoReturnDownBack className="text-[30px]" />
                  </button>
                </Fragment>
              )}
            </div>
          </div>
          {/* end col 2 */}
        </div>
      </div>
    </div>
  );
}

export default Booking;
