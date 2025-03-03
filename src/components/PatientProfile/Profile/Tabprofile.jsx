import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBirthdayCake,
  FaEdit,
  FaMale,
  FaPhoneAlt,
  FaUserCircle,
  FaStar,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import {
  DoctorByProfileId,
  PatientProfileByProfileId,
  profilebyaccount,
} from "../../../api/Profile/profilebyaccount";
import { AppContext } from "../../Context/AppProvider";
import { enqueueSnackbar } from "notistack";
import RateDoctor from "../../../api/Profile/RateDoctor";
import axios from "axios";
import { getpatientbyaccountid } from "../../../api/Doctor/patient";

function Tabprofile() {
  const [dataProfile, setDataProfile] = useState([]);
  const [popup, setPopup] = useState(false);
  const [dataPatientProfile, setDataPatientProfile] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { User } = useContext(AppContext);

  const handlePopupDetail = async (patientfileid = null) => {
    if (patientfileid == null) {
      setPopup(false);
      setDataPatientProfile([]);
    } else {
      const res = await PatientProfileByProfileId(patientfileid);
      console.log("res: ", res);
      if (!res || res.length === 0) {
        enqueueSnackbar("Chưa có hồ sơ bệnh án", {
          variant: "warning",
          autoHideDuration: 3000,
        });
        return;
      }
      setDataPatientProfile(Array.isArray(res) ? res : [res]);
      // Đảm bảo có dữ liệu để render
      setPopup(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < dataPatientProfile.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const getdataprofile = async () => {
      const result = await profilebyaccount(User?.id);
      setDataProfile(result);
    };
    getdataprofile();
  }, []);


  const [rating, setRating] = useState(0);
  const [resid, setResid] = useState("");
  const [description, setDescription] = useState("")
  const [doctorId, setDoctorId] = useState(null)
  const [hover, setHover] = useState(0);
  const [userid, setUserid] = useState(User.id)
  const [doctor, setDoctor] = useState(null)
  const handleRating = (value) => {
    setRating(value);
  };
  useEffect(() => {
    if (dataPatientProfile.length > 0) {
      setResid(dataPatientProfile[0]?.doctor_id || "");
    }
  }, [dataPatientProfile]);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!resid) return;

      try {
        const result = await DoctorByProfileId(resid);
        console.log("res", result.id);
        setDoctorId(result.id);
        setDoctor(result.account);
      } catch (error) {
        console.error("Lỗi khi lấy doctorId:", error);
      }
    };

    fetchDoctor();
  }, [resid]);



  const submitRating = async () => {

    if (!rating) {
      alert("Vui lòng chọn số sao!");
      return;
    }
    try {
      const result = await getpatientbyaccountid(User?.id);

      await RateDoctor(description, rating, doctorId, result[0].id);
      // console.log({ description, rating, doctorId, result[0].id })
      alert(" 🎉 Cảm ơn bạn đã đánh giá!");
      setShowRatingCard(!showRatingCard);
      
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };
  
  const [showRatingCard, setShowRatingCard] = useState(false);
  const handleToggleRatingCard = () => {
    setShowRatingCard(!showRatingCard);
  };

  return (
    <div className="w-full h-full border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">Hồ Sơ Bệnh Nhân</span>
      {dataProfile && Object.keys(dataProfile).length > 0 ? (
        dataProfile.map((item, index) => (
          <div
            className="my-4 w-full bg-[#fff] rounded-xl border border-solid border-[#eaeaea] relative"
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
      {dataPatientProfile.length > 0 && popup && (
        <div
          className={`w-full h-screen fixed z-20 bg-slate-400/60 top-0 right-0`}
          onClick={() => handlePopupDetail()}
        >

          <div className=" w-full gap-4 h-full flex justify-center items-center">
            <div
              className="w-2/5  p-4 bg-[#fff] rounded-xl shadow-lg border border-solid border-[#c2c2c2]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full flex justify-end cursor-pointer hover:text-[red]"
                onClick={() => handlePopupDetail()}
              >
                X              </div>
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
                    value={dataPatientProfile[0].description}
                    readOnly="true"
                    placeholder="Nhập mô tả..."
                  />
                </div>
                {/* Image Selection */}
                <div className="mt-4">
                  <span className="block text-sm font-medium text-gray-700">
                    Hình ảnh
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {dataPatientProfile[currentIndex].filesImages &&
                      dataPatientProfile[currentIndex].filesImages.length > 0 ? (
                      dataPatientProfile[currentIndex].filesImages.map(
                        (img, idx) => (
                          <div key={idx} className="relative col-span-1">
                            <img
                              src={img.urlImage || "default-image.jpg"}
                              className="w-full h-20 object-cover"
                              alt={img.description || "Hình ảnh bệnh án"}
                            />
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-500">Không có hình ảnh</p>
                    )}
                  </div>
                </div>

                <div className="my-4 flex justify-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[red] text-[#fff] rounded-lg hover:scale-[0.9]"
                    onClick={() => handlePopupDetail()}
                  >
                    Đóng{" "}
                  </button>
                  <div className="flex justify-end w-full my-2">
                    <div
                      className="flex items-center justify-center bg-[#FFD700] hover:bg-[#FFC107] transition-all duration-300 text-white font-semibold px-6 py-3 rounded-full shadow-md gap-2 cursor-pointer"
                      onClick={handleToggleRatingCard}
                    >
                      <FaStar className="text-[20px]" />
                      <span>Đánh giá bác sĩ</span>
                    </div>
                  </div>

                </div>

                {/* Next and Previous Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 bg-[#00b5f1] text-white rounded-lg disabled:bg-gray-400"
                  >
                    Previous
                  </button>
                  <div className="mt-4 font-semibold">{currentIndex + 1}/{dataPatientProfile.length}</div>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === dataPatientProfile.length - 1}
                    className="px-4 py-2 bg-[#00b5f1] text-white rounded-lg disabled:bg-gray-400"
                  >
                    Next
                  </button>
                </div>
              </span>
            </div>
            {showRatingCard && (
              <div onClick={(e) => e.stopPropagation()}
                className="w-full   max-w-sm  border border-gray-200 rounded-lg shadow-sm bg-[#fff]">

                <div className="flex justify-center h-96">
                  <img className="p-8 rounded-t-lg " src={doctor.avatar || "https://png.pngtree.com/png-clipart/20210308/original/pngtree-doctor-nurse-cartoon-cute-hand-drawn-anti-epidemic-anti-epidemic-small-png-image_5752490.jpg"} alt="product image" />
                </div>
                <div className=" mb-2 text-2xl flex justify-center   font-bold text-gray-800">
                  <span> {doctor.name}</span>
                </div>
                <div className="px-5 pb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-800">
                    Suy nghĩ của bạn
                  </label>
                  <input hidden onChange={(e) => setResid(e.target.value)} value={dataPatientProfile[0].doctor_id}></input>
                  <textarea
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-800 bg-gray-100 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Viết suy nghĩ của bạn..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                  <div className="flex items-center mt-2.5 mb-5">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <svg
                        key={value}
                        onClick={() => handleRating(value)}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        className={`w-5 h-5 cursor-pointer transition duration-200 ${value <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={submitRating}

                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-800"
                    >
                      Đánh giá ({rating} sao)
                    </button>
                  </div>
                </div>
              </div>

            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tabprofile;
