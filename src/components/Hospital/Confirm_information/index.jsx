import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import { FaAddressCard, FaBuilding } from "react-icons/fa";
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
import { IoCard } from "react-icons/io5";
import { Link } from "react-router-dom";
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
          <div className="col-span-3 py-4 w-full ">
            <div className="w-full ">
              <div className="w-full h-[50px] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-t-lg text-[#fff] py-1 px-4 flex items-center justify-center">
                <span className="font-medium text-[20px]">
                  Xác nhận thông tin
                </span>
              </div>
              <div className="w-full bg-[#fff] rounded-bl-lg rounded-br-lg">
                <div className="w-full h-full py-2 px-4 " id="goup-2">
                  <table className="table text-[#003553] mb-10 w-full">
                    <thead className="border-solid border-b-2 border-[#f2f2f2] w-full">
                      <th className="w-10 py-5">#</th>
                      <th className="py-5">Chuyên khoa</th>
                      <th className="py-5">Dịch vụ</th>
                      <th className="py-5 ">Bác sĩ</th>
                      <th className="py-5 ">Thời gian khám</th>
                      <th className="py-5 ">Tiền khám</th>
                    </thead>
                    <tbody className="w-full text-center">
                      <tr className="my-2">
                        <td className="text-center pt-5">1</td>
                        <td className="px-2 pt-5">Khám Nội Tổng Quát</td>
                        <td className="pt-5">
                          Khám Tự Chọn Yêu Cầu (Tầng trệt, 1 Khu B)
                        </td>
                        <td className="pt-5">ÂU DƯƠNG BẢO TRÂN</td>
                        <td className="pt-5">09:30 - 10:30 10/12/2024</td>
                        <td className="pt-5">Thanh toán tại Bệnh viện</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="w-full mt-5 ">
              <div className="w-full h-[50px] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-t-lg text-[#fff] py-1 px-4 flex items-center justify-center">
                <span className="font-medium text-[20px]">
                  Thông tin bệnh nhân
                </span>
              </div>
              <div className="w-full bg-[#fff] rounded-bl-lg rounded-br-lg">
                <div
                  className="w-full h-full py-2 px-4 grid grid-cols-2 gap-5"
                  id="goup-2"
                >
                  <div className="col-span-1">
                    <ul className="list-none flex flex-wrap justify-between mb-5">
                      <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                        <span className="flex items-center gap-2 ">
                          <FaUserCircle className="text-[#B1B1B1] text-[18px]" />
                          <span>Họ và tên :</span>
                        </span>
                        <span className="text-[14px] font-medium text-[#003553]">
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
                          Nam Nữ
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-1">
                    <ul className="list-none flex flex-wrap justify-between mb-5">
                      <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                        <span className="flex items-center gap-2 ">
                          <IoCard className="text-[#B1B1B1] text-[18px]" />
                          <span>Mã số BHYT :</span>
                        </span>
                        <span className="text-[14px] font-medium text-[#003553]">
                          Chưa cập nhật
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
                      <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                        <span className="flex items-center gap-2 ">
                          <FaAddressCard className="text-[#B1B1B1] text-[18px]" />
                          <span>CMND :</span>
                        </span>
                        <span className="text-[14px] font-medium text-[#003553]">
                          075201133477
                        </span>
                      </li>
                      <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                        <span className="flex items-center gap-2 ">
                          <FaLocationDot className="text-[#B1B1B1] text-[18px]" />
                          <span>Địa chỉ :</span>
                        </span>
                        <span className="text-[14px] font-medium text-[#003553]">
                          cmt 8 quận 10 Thị trấn Tân Túc Huyện Bình Chánh Thành
                          phố Hồ Chí Minh
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[40px] flex items-center justify-end my-5">
              <Link to={`/choose-payment`}>
                <button
                  className="py-2 flex items-center justify-center gap-2 px-6 bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-lg text-[#fff]"
                  id="godown"
                >
                  Xác nhận
                  <span>
                    <FaArrowRight id="goright" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmInfo;
