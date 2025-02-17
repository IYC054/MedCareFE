import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBirthdayCake,
  FaEdit,
  FaMale,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import {
  PatientProfileByProfileId,
  profilebyaccount,
} from "../../../api/Profile/profilebyaccount";
import { AppContext } from "../../Context/AppProvider";

function Tabprofile() {
  const [dataProfile, setDataProfile] = useState([]);
  const [popup, setPopup] = useState(false);
  const [patientImages, setPatientImages] = useState([]);
  const [dataPatientProfile, setDataPatientProfile] = useState([]);

  const { User } = useContext(AppContext);

  const handlePopupDetail = async (patientfileid = null) => {
    if (patientfileid == null) {
      setPopup(false);
      setPatientImages([]);
      setDataPatientProfile([]);
    } else {
      const res = await PatientProfileByProfileId(patientfileid);
      console.log("res: ", res);
      setDataPatientProfile([res]); // Đảm bảo có dữ liệu để render
      setPopup(true);
    }
    console.log("popup state: ", popup);
  };

  useEffect(() => {
    const getdataprofile = async () => {
      const result = await profilebyaccount(User?.id);
      setDataProfile(result);
    };
    getdataprofile();
  }, []);
  return (
    <div className="w-full h-full  border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">Hồ Sơ Bệnh Nhân</span>
      {dataProfile && Object.keys(dataProfile).length > 0 ? (
        dataProfile.map((item, index) => (
          <div
            className="my-4 w-full  bg-[#fff] rounded-xl border border-solid border-[#eaeaea]"
            key={index}
          >
            <ul className="list-none flex flex-wrap p-4 justify-between">
              <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                <span className="flex items-center gap-2 ">
                  <FaUserCircle className="text-[#B1B1B1] text-[18px]" />
                  <span>Họ và tên :</span>
                </span>
                <span className="text-[18px] font-medium text-[#00b5f1]">
                  {item.fullname}
                </span>
              </li>
              <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                <span className="flex items-center gap-2 ">
                  <FaBirthdayCake className="text-[#B1B1B1] text-[18px]" />
                  <span>Ngày Sinh :</span>
                </span>
                <span className="text-[14px] font-medium text-[#003553]">
                  {item.birthdate}
                </span>
              </li>
              <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                <span className="flex items-center gap-2 ">
                  <FaPhoneAlt className="text-[#B1B1B1] text-[18px]" />
                  <span>Số điện thoại :</span>
                </span>
                <span className="text-[14px] font-medium text-[#003553]">
                  {item.phone}
                </span>
              </li>
              <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                <span className="flex items-center gap-2 ">
                  <FaMale className="text-[#B1B1B1] text-[18px]" />
                  <span>Giới tính :</span>
                </span>
                <span className="text-[14px] font-medium text-[#003553]">
                  {item.gender === "Male" ? "Nam" : "Nữ"}
                </span>
              </li>
              <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                <span className="flex items-center gap-2 ">
                  <FaLocationDot className="text-[#B1B1B1] text-[18px]" />
                  <span>Địa chỉ :</span>
                </span>
                <span className="text-[14px] font-medium text-[#003553]">
                  {item.address}
                </span>
              </li>
              <li className="flex w-full items-center gap-2 text-[#003553] my-1 settingli">
                <span className="flex items-center gap-2 ">
                  <MdGroups className="text-[#B1B1B1] text-[18px]" />
                  <span>Dân tộc :</span>
                </span>
                <span className="text-[14px] font-medium text-[#003553]">
                  {item.nation}
                </span>
              </li>
            </ul>
            <div className="w-full h-[50px] rounded-bl-xl rounded-br-xl bg-[#f5f5f5] flex items-center justify-end gap-4 px-5">
              <div
                className="flex items-center justify-end text-[#00b5f1] gap-2 cursor-pointer "
                onClick={() => handlePopupDetail(item.id)}
              >
                <FaEdit />
                <span className="font-medium">Xem hồ sơ bệnh án</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Link to={"/profile/add"}>
          <div className="flex justify-center items-center w-full">
            <button className="w-full py-4 mt-20 text-[#fff] text-[20px] font-semibold rounded-xl border-[#00b5f1] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff]">
              Chưa có hồ sơ bấm vào để tạo
            </button>
          </div>
        </Link>
      )}
      {dataPatientProfile.map((item, index) => (
        <div
          key={index}
          className={`w-full h-screen ${
            popup ? "fixed" : "hidden"
          } z-20 bg-slate-400/60 top-0 right-0`}
          onClick={() => handlePopupDetail()} // Đóng popup khi click vào nền
        >
          <div className="w-full h-full flex justify-center items-center">
            <div
              className="w-2/5 p-4 bg-[#fff] rounded-xl shadow-lg border border-solid border-[#c2c2c2]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full flex justify-end cursor-pointer hover:text-[red]"
                onClick={() => handlePopupDetail()}
              >
                X
              </div>
              <span className="text-[18px]">
                <div className="mt-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="description"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                    value={item[0].description}
                    readOnly="true"
                    placeholder="Nhập mô tả..."
                  />
                </div>
                {/* Chọn hình ảnh */}

                <div className="mt-4">
                  <span className="block text-sm font-medium text-gray-700">
                    Hình ảnh
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {item.filesImages && item.filesImages.length > 0 ? (
                      item.filesImages.map((img, idx) => {
                        return (
                          <div key={idx} className="relative col-span-1">
                            <img
                              src={img.urlImage || "default-image.jpg"}
                              className="w-full h-20 object-cover"
                              alt={img.description || "Hình ảnh bệnh án"}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500">Không có hình ảnh</p>
                    )}
                  </div>
                  <div className="my-4 flex justify-center">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[red] text-[#fff] rounded-lg hover:scale-[0.9]"
                    >
                      Đóng{" "}
                    </button>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tabprofile;
