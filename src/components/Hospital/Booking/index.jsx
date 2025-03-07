import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Breadcrumbs from "../Breadcrumbs";
import {
  FaBuilding,
  FaRegCalendarAlt,
  FaStethoscope,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { FaMagnifyingGlass, FaUserDoctor } from "react-icons/fa6";
import { BsCalendar2DateFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import "./booking.scss";
import { IoReturnDownBack } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Calender from "../Calender";
import { AppContext } from "../../Context/AppProvider";
import { doctorApi } from "../../../api/Doctor/doctor";
import { format } from "crypto-js";
import { getWorkTimeDoctor } from "../../../api/Doctor/workinghour";
import { stringify } from "postcss";
import {
  getallSpecialty,
  getSpecialtyByDoctor,
} from "../../../api/Doctor/specialty";
import { checkslotAppointment } from "../../../api/Doctor/appointment";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const faketime2 = [
  { id: 1, settime: "13:30 - 14:30" },
  { id: 2, settime: "14:30 - 15:30" },
  { id: 3, settime: "15:30 - 16:30" },
];

function Booking() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeselect = queryParams.get("type");
  const { setBHYT } = useContext(AppContext);
  // chọn chuyên khoa của bác sĩ
  const [dataSpecialty, setdataSpecialty] = useState([]);
  const [specialtyDoctor, setSpecialtyDoctor] = useState([]);
  const [WorkTimeDoctor, setWorkTimeDoctor] = useState([]);
  const [queryType, setQueryType] = useState("doctor");
  // chọn các data
  const [searchQuery, setSearchQuery] = useState("");
  const [txnSpecialty, setTxnSpecialty] = useState();
  const [txnIdWorkTime, setTxnIdWorkTime] = useState(0);
  const [txnSpecialtyId, setTxnSpecialtyId] = useState(0);
  //

  const [doctorId, setdoctorId] = useState(0);
  const [dataDoctor, setDataDoctor] = useState([]);
  const [title, setTitle] = useState("Thông tin cơ sở y tế");
  const [ChooseDoctor, setChooseDoctor] = useState(true);
  const [selectName, setSelectName] = useState();
  const [selectBHYT, setSelectBHYT] = useState(false);
  const [selectspecialty, setSelectSpecialty] = useState(
    typeselect == "specialty" ? true : false
  );
  const [selectDate, setSelectDate] = useState(true);
  const navigate = useNavigate();
  // start chọn ngày

  const [chooseDate, setChooseDate] = useState(null);
  // chọn chuyên khoa
  const handleShowSpecialty = (e) => {
    setSelectSpecialty(false);
    setSelectDate(true);
    setTxnSpecialty(e);
  };
  const handleSelectedDate = (date) => {
    setChooseDate(date);
  };
  const handleSelectidByWorktime = async (id) => {
    setTxnIdWorkTime(id);
    const checkslot = await checkslotAppointment(doctorId, id);
    if (checkslot) {
      navigate(
        `/choose-profile?doctor=${doctorId}&work=${id}&specialty=${txnSpecialtyId}`
      );
    } else {
      enqueueSnackbar(
        "Hiện tải giờ này đã hết slot xin vui lòng đặt giờ khác.",
        {
          variant: "warning",
          autoHideDuration: 3000,
        }
      );
    }
  };
  // end chọn ngày

  // start điều hướng quay lại
  const handlegoBackDoctor = () => {
    setSelectBHYT(false);
    setSelectDate(true);
    setChooseDate("");
  };
  const handlegoBackSpec = () => {
    setChooseDoctor(true);
    setSelectName(null);
    setSelectSpecialty(false);
    setTitle("Vui lòng chọn bác sĩ");
  };
  const handlegoBackHospital = () => {
    navigate("/hospital");
  };

  const handlegoBack = () => {
    setSelectSpecialty(true);
    setTitle("Vui lòng chọn chuyên khoa");
  };
  //end điều hướng quay lại

  //đã chọn bác sĩ
  const HandleChooseDoctor = (name, id) => {
    setChooseDoctor(false);
    setSelectName(name);
    setSelectSpecialty(true);
    setTitle("Vui lòng chọn chuyên khoa");
    setdoctorId(id);
    console.log("ID bác sĩ" + id);
  };

  const handleBHYT = () => {
    // setSelectDate(true);
    console.log("BAO HIEM");
    setTitle("Vui lòng chọn ngày khám");
    // bật nếu cần thêm bhyt
    setSelectBHYT(true);
  };
  // bật nếu cần thêm bhyt
  const handleSelectDate = (bhyt) => {
    setSelectDate(false);
    setTitle("Vui lòng chọn ngày khám");
    setBHYT(bhyt);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await doctorApi.get();
        setDataDoctor(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // Gọi hàm lấy dữ liệu khi component mount
  }, []);
  // lay chuyen khoa cua bac si
  useEffect(() => {
    const fetchSpecialty = async () => {
      const data = await getSpecialtyByDoctor(doctorId); // Chờ dữ liệu từ API
      setSpecialtyDoctor(data); // Cập nhật state với dữ liệu nhận được
    };

    fetchSpecialty();
  }, [doctorId]);
  // lay ngay lam viec cua bác sĩ
  useEffect(() => {
    const fetchWorkTime = async () => {
      const data = await getWorkTimeDoctor(doctorId);
      setWorkTimeDoctor(data);
    };

    fetchWorkTime();
  }, [doctorId]);
  const filteredDoctors =
    queryType === "doctor"
      ? dataDoctor.filter((doctor) => {
          return (
            doctor.vip === false &&
            doctor.account.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        })
      : dataDoctor.filter((doctor) => {
          return (
            doctor.vip === false &&
            doctor.specialties.some((specialty) =>
              specialty.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        });

  useEffect(() => {
    const fetchSpecialty = async () => {
      const data = await getallSpecialty();
      setdataSpecialty(data);
    };

    fetchSpecialty();
  }, []);
  useEffect(() => {
    if (typeselect === "specialty") {
      const filterDoctorbyspecialtyId = dataDoctor.filter((doctor) =>
        doctor.specialties.some((specialty) => specialty.id === txnSpecialtyId)
      );
      console.log("filterDoctorbyspecialtyId", filterDoctorbyspecialtyId);
      if (filterDoctorbyspecialtyId.length > 0) {
        const randomDoctor =
          filterDoctorbyspecialtyId[
            Math.floor(Math.random() * filterDoctorbyspecialtyId.length)
          ];
        console.log("randomDoctor" + JSON.stringify(randomDoctor.account.name));
        setdoctorId(randomDoctor.id);
        setSelectName(randomDoctor.account.name);
      } else {
        console.log("Không có bác sĩ nào với specid này.");
      }
    }
  }, [typeselect, dataDoctor, txnSpecialtyId]);

  const [doctorRatings, setDoctorRatings] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/rates")
      .then((response) => {
        const data = response.data;
        const ratingsMap = {};

        data.forEach((rating) => {
          const doctorId = rating.doctor_id.id;
          const rate = rating.rate;

          if (!ratingsMap[doctorId]) {
            ratingsMap[doctorId] = { totalRate: 0, count: 0 };
          }

          ratingsMap[doctorId].totalRate += rate;
          ratingsMap[doctorId].count += 1;
        });

        const calculatedRatings = {};
        Object.keys(ratingsMap).forEach((doctorId) => {
          calculatedRatings[doctorId] = (
            ratingsMap[doctorId].totalRate / ratingsMap[doctorId].count
          ).toFixed(1);
        });

        setDoctorRatings(calculatedRatings);
      })
      .catch((error) => console.error("Lỗi khi gọi API đánh giá:", error));
  }, []);

  // Hàm render số sao với màu sắc phù hợp
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Số sao vàng đầy đủ ⭐
    const halfStar = rating % 1 !== 0; // Kiểm tra có nửa sao không ⭐️½
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao xám ⭐

    return (
      <span className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="text-gray-300" />
        ))}
      </span>
    );
  };

  console.log("BHYTaaaaaaaa", selectDate);
  // useEffect(() => {
  //   console.log("txnSpecialtyId: " + txnSpecialtyId);
  // }, [txnSpecialtyId])
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 ">
        <Breadcrumbs />
        {/* end bread */}
        <div className="grid grid-cols-4 gap-4">
          {/* start col 1 */}
          <div className="col-span-4 md:col-span-1 md:order-1 order-2 w-full  py-4">
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
                {/* <li className="flex gap-2 mb-10 text-[#003553]">
                  {selectName != null ? (
                    <Fragment>
                      <FaStethoscope className="text-[#c2c2c2] text-[30px]" />
                      <span>Bác Sĩ : {selectName}</span>
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </li> */}
                <li className="flex gap-2 mb-10">
                  {chooseDate ? (
                    <Fragment>
                      <BsCalendar2DateFill className="text-[#c2c2c2] text-[30px]" />
                      <span className="text-[#003553]">
                        Ngày khám
                        <br />
                        <span className="text-[15px] text-[#c2c2c2]">
                          {chooseDate}
                        </span>
                      </span>
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

          {typeselect == "specialty" ? (
            // kham theo chuyen khoa
            <div className="col-span-4 md:col-span-3 order-1 md:order-2 py-4 w-full ">
              <div className="w-full h-full ">
                <div className="w-full h-[50px] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-t-lg text-[#fff] py-1 px-4 flex items-center justify-center">
                  <span className="font-medium text-[20px]">
                    Chọn chuyên khoa
                  </span>
                </div>
                {selectspecialty ? (
                  <div className="w-full h-[435px] bg-[#fff] px-4 pt-10 rounded-lg overflow-auto">
                    <div>
                      <div className="w-full  bg-[#fff] rounded-lg">
                        <div className="w-full h-full py-2 px-4 " id="goup-2">
                          <hr className="h-[2px] border-[1.5px] mb-5" />
                          {dataSpecialty.map((item, index) => (
                            <div
                              key={index}
                              className="w-full hover:text-[#00e0ff] mb-5  cursor-pointer"
                              onClick={() => handleShowSpecialty(item.name)}
                            >
                              <span
                                className="text-[20px] font-medium"
                                onClick={() => {
                                  setTxnSpecialtyId(item.id);
                                }}
                              >
                                Khám {item.name}
                              </span>
                              <hr className="h-1 mt-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectDate ? (
                  <Fragment>
                    <div className="w-full bg-[#fff] rounded-lg">
                      <div className="w-full h-full py-2 px-4 " id="goup-2">
                        <table className="table text-[#003553] mb-10 w-full">
                          <thead className="border-solid border-b-2 border-[#f2f2f2] w-full">
                            <th className="w-10 py-5">#</th>
                            <th className="py-5">Tên dịch vụ</th>
                            <th className="py-5">Giá tiền ne</th>
                            <th className="py-5 "></th>
                          </thead>
                          <tbody className="w-full text-center">
                            <tr className="my-2">
                              <td className="text-center pt-5">1</td>
                              <td className="w-[550px] px-4 pt-5">
                                Dịch vụ khám : {txnSpecialty}
                              </td>
                              <td className="pt-5">Thanh toán tại Bệnh viện</td>
                              <td className="pt-5">
                                <button
                                  onClick={handleBHYT}
                                  className="px-2 py-2 bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-[#fff] rounded-xl whitespace-nowrap"
                                >
                                  Đặt khám ngay
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {selectBHYT ? (
                          <div className="w-full h-[40px] bg-[#f2f2f2]/60 px-14 flex justify-between items-center text-[#003553]">
                            <span className="text-[17px] font-medium ">
                              Bạn có đăng ký BHYT
                            </span>
                            <div className="mr-10">
                              <input
                                type="radio"
                                id="yes"
                                name="bhyt"
                                onClick={() => handleSelectDate(true)}
                              />
                              <label htmlFor="yes" className="mx-2">
                                Có
                              </label>
                              <input
                                type="radio"
                                id="no"
                                name="bhyt"
                                onClick={() => handleSelectDate(false)}
                              />
                              <label htmlFor="no" className="mx-2">
                                Không
                              </label>
                            </div>
                          </div>
                        ) : (
                          <Fragment></Fragment>
                        )}
                      </div>
                    </div>
                    {/* back từ đặt khám */}
                    <button
                      className="flex text-[#003553] gap-2 items-center  hover:bg-[#c2c2c2]/20 mt-4 rounded-lg"
                      onClick={handlegoBack}
                    >
                      Quay lại
                      <IoReturnDownBack className="text-[30px]" />
                    </button>
                    {/* back từ đặt khám */}
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="w-full bg-[#fff] px-4 pt-5 rounded-lg mb-10 flex flex-col">
                      <div className="w-full text-center text-[24px] font-medium mb-10">
                        <Calender
                          onDateSelect={handleSelectedDate}
                          doctorId={doctorId}
                        />
                      </div>
                      {chooseDate ? (
                        <Fragment>
                          <hr className="w-full h-[2px] border-[1px]  bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] border-none" />
                          <div className="w-full text-[20px] my-5">
                            <span>Giờ làm việc</span>
                          </div>
                          <div className="w-full my-2 flex gap-5 flex-wrap ">
                            {WorkTimeDoctor.map((item, index) => {
                              const chooseDateParts = chooseDate.split("/");
                              const formattedChooseDate = `${chooseDateParts[2]}-${chooseDateParts[1]}-${chooseDateParts[0]}`;

                              const workDate = new Date(item.workDate);
                              const chooseDateFormatted = new Date(
                                formattedChooseDate
                              );

                              if (
                                isNaN(workDate.getTime()) ||
                                isNaN(chooseDateFormatted.getTime())
                              ) {
                                return null;
                              }

                              const formattedWorkDate =
                                workDate.toLocaleDateString("vi-VN");
                              const formattedChooseDates =
                                chooseDateFormatted.toLocaleDateString("vi-VN");

                              if (formattedWorkDate === formattedChooseDates) {
                                const startTimeFormatted = new Date(
                                  `1970-01-01T${item.startTime}`
                                ).toLocaleTimeString("vi-VN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                });
                                const endTimeFormatted = new Date(
                                  `1970-01-01T${item.endTime}`
                                ).toLocaleTimeString("vi-VN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                });

                                return (
                                  // <Link
                                  //   key={index}
                                  //   to={`/choose-profile?doctor=${doctorId}&work=${item.id}&specialty=${txnSpecialtyId}`}
                                  // >
                                  <div
                                    className="py-2 px-4 border-[1px] cursor-pointer  border-[#00b5f1] hover:bg-gradient-to-r hover:from-[#00b5f1] hover:to-[#00e0ff] hover:text-[#fff] rounded-lg border-solid text-[20px]"
                                    key={index}
                                    onClick={() =>
                                      handleSelectidByWorktime(item.id)
                                    }
                                  >
                                    {startTimeFormatted} - {endTimeFormatted}
                                  </div>
                                  // </Link>
                                );
                              }

                              return null;
                            })}
                          </div>
                          <div className="w-full mt-4">
                            <span className="text-[#d98634] text-[16px]">
                              Tất cả thời gian theo múi giờ Việt Nam GMT +7
                            </span>
                          </div>
                          <div className="w-full h-[170px] bg-black my-4">
                            <img
                              src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBanner-Telemed.1ae88663.png&w=828&q=75"
                              alt="banner"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment></Fragment>
                      )}
                    </div>
                  </Fragment>
                )}
                {selectDate ? (
                  <Fragment></Fragment>
                ) : (
                  <Fragment>
                    <button
                      className="flex text-[#003553] gap-2 items-center hover:bg-[#c2c2c2]/20 mt-4 rounded-lg"
                      onClick={handlegoBackDoctor}
                    >
                      Quay lại <IoReturnDownBack className="text-[30px]" />
                    </button>
                  </Fragment>
                )}
              </div>
            </div>
          ) : (
            // kham theo bac si

            <div className="col-span-4 md:col-span-3 order-1 md:order-2 py-4 w-full ">
              <div className="w-full h-full ">
                <div className="w-full h-[50px] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] rounded-t-lg text-[#fff] py-1 px-4 flex items-center justify-center">
                  <span className="font-medium text-[20px]">{title}</span>
                </div>
                {ChooseDoctor ? (
                  <div className="w-full h-[435px] bg-[#fff] px-4 pt-10 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-4 mb-2">
                      <span
                        className={`font-medium cursor-pointer ${
                          queryType === "doctor" ? "text-[#00e0ff]" : ""
                        }`}
                        onClick={() => setQueryType("doctor")}
                      >
                        Tìm bác sĩ
                      </span>
                      <span
                        className={`font-medium cursor-pointer ${
                          queryType === "specialty" ? "text-[#00e0ff]" : ""
                        }`}
                        onClick={() => setQueryType("specialty")}
                      >
                        Tìm chuyên khoa
                      </span>
                    </div>
                    <div className="w-full h-[40px] relative mb-5" id="goup">
                      {queryType === "doctor" ? (
                        <input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full h-full rounded-md px-4 boder-[#00e0ff] border-solid border-[#c2c2c2] border-[1px] focus:border-[#00e0ff] shadow-xl focus:outline-none"
                          placeholder="Tìm bác sĩ"
                        />
                      ) : (
                        <input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full h-full rounded-md px-4 boder-[#00e0ff] border-solid border-[#c2c2c2] border-[1px] focus:border-[#00e0ff] shadow-xl focus:outline-none"
                          placeholder="Tìm chuyên khoa"
                        />
                      )}
                      <div className="absolute w-[40px] h-full border-solid border-[#c2c2c2] border-[1px] top-0 right-0 rounded-tr-md rounded-br-md flex justify-center items-center">
                        <FaMagnifyingGlass className="text-[#c2c2c2]/60" />
                      </div>
                    </div>
                    <div
                      className="w-full h-[335px] overflow-auto"
                      id="style-5"
                    >
                      {filteredDoctors.map((item, index) => (
                        <div
                          key={index}
                          className="w-full bg-white p-4 list-none text-[#053353] mb-4 rounded-xl border-solid border-[1px] border-[#00e0ff] cursor-pointer"
                          id="goup"
                          onClick={() =>
                            HandleChooseDoctor(item.account.name, item.id)
                          }
                        >
                          <li className="w-full text-[#ffb54a] text-[20px] flex gap-2 items-center mb-2">
                            <FaUserDoctor />
                            <span className="font-medium text-[18px]">
                              BS. {item.account.name}
                            </span>
                            <span className="text-[14px] flex items-center gap-2">
                              {doctorRatings[item.id]
                                ? renderStars(
                                    parseFloat(doctorRatings[item.id])
                                  )
                                : "Chưa có đánh giá"}
                            </span>
                          </li>

                          <li className="w-full text-[18px] flex gap-2 items-center mb-2">
                            <BsGenderAmbiguous />
                            <span className="text-[14px]">
                              Giới Tính: {item.account.gender}
                            </span>
                          </li>
                          <li className="w-full text-[18px] flex gap-2 items-center mb-2">
                            <FaStethoscope />
                            <span className="text-[14px]">
                              Chuyên khoa:{" "}
                              {item.specialties.map((specialty, index) => (
                                <span key={index}>
                                  {specialty.description}
                                  {index < item.specialties.length - 1 && ", "}
                                </span>
                              ))}
                            </span>
                          </li>
                          {/* <li className="w-full text-[18px] flex gap-2 items-center mb-2 ">
                        <FaRegCalendarAlt />
                        <span className="text-[14px]">
                          Lịch khám : Mọi ngày nhưng chỉ 11h tối
                        </span>
                      </li> */}
                          <li className="w-full text-[18px] flex gap-2 items-center mb-2 ">
                            <MdAttachMoney />
                            <span className="text-[14px]">
                              Giá khám : Thanh toán tại bệnh viện
                            </span>
                          </li>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectspecialty ? (
                  <div>
                    <div className="w-full  bg-[#fff] rounded-lg">
                      <div className="w-full h-full py-2 px-4 " id="goup-2">
                        <div
                          className="w-full h-[40px] relative mb-5"
                          id="goup"
                        >
                          <input
                            className="w-full h-full rounded-md px-4 boder-[#00e0ff] border-solid border-[#c2c2c2] border-[1px] focus:border-[#00e0ff] focus:outline-none"
                            placeholder="Tìm theo chuyên khoa"
                          />
                          <div className="absolute w-[40px] h-full border-solid border-[#c2c2c2] border-[1px] top-0 right-0 rounded-tr-md rounded-br-md flex justify-center items-center">
                            <FaMagnifyingGlass className="text-[#c2c2c2]/60" />
                          </div>
                        </div>
                        <hr className="h-[2px] border-[1.5px] mb-5" />
                        {specialtyDoctor.map((item, index) => (
                          <div
                            key={index}
                            className="w-full hover:text-[#00e0ff] mb-5  cursor-pointer"
                            onClick={() => handleShowSpecialty(item.name)}
                          >
                            <span
                              className="text-[20px] font-medium"
                              onClick={() => {
                                setTxnSpecialtyId(item.id);
                              }}
                            >
                              Khám {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : selectDate ? (
                  <Fragment>
                    <div className="w-full bg-[#fff] rounded-lg">
                      <div className="w-full h-full py-2 px-4 " id="goup-2">
                        <table className="table text-[#003553] mb-10 w-full">
                          <thead className="border-solid border-b-2 border-[#f2f2f2] w-full">
                            <th className="w-10 py-5">#</th>
                            <th className="py-5">Tên dịch vụ</th>
                            <th className="py-5">Giá tiền</th>
                            <th className="py-5 "></th>
                          </thead>
                          <tbody className="w-full text-center">
                            <tr className="my-2">
                              <td className="text-center pt-5">1</td>
                              <td className="w-[550px] px-4 pt-5">
                                Dịch vụ khám : {txnSpecialty}
                              </td>
                              <td className="pt-5">Thanh toán tại Bệnh viện</td>
                              <td className="pt-5">
                                <button
                                  onClick={handleBHYT}
                                  className="px-2 py-2 bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] text-[#fff] rounded-xl whitespace-nowrap"
                                >
                                  Đặt khám ngay
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {selectBHYT ? (
                          <div className="w-full h-[40px] bg-[#f2f2f2]/60 px-14 flex justify-between items-center text-[#003553]">
                            <span className="text-[17px] font-medium ">
                              Bạn có đăng ký BHYT
                            </span>
                            <div className="mr-10">
                              <input
                                type="radio"
                                id="yes"
                                name="bhyt"
                                onClick={() => handleSelectDate(true)}
                              />
                              <label htmlFor="yes" className="mx-2">
                                Có
                              </label>
                              <input
                                type="radio"
                                id="no"
                                name="bhyt"
                                onClick={() => handleSelectDate(false)}
                              />
                              <label htmlFor="no" className="mx-2">
                                Không
                              </label>
                            </div>
                          </div>
                        ) : (
                          <Fragment></Fragment>
                        )}
                      </div>
                    </div>
                    {/* back từ đặt khám */}
                    <button
                      className="flex text-[#003553] gap-2 items-center  hover:bg-[#c2c2c2]/20 mt-4 rounded-lg"
                      onClick={handlegoBack}
                    >
                      Quay lại
                      <IoReturnDownBack className="text-[30px]" />
                    </button>
                    {/* back từ đặt khám */}
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="w-full bg-[#fff] px-4 pt-5 rounded-lg mb-10 flex flex-col">
                      <div className="w-full text-center text-[24px] font-medium mb-10">
                        <Calender
                          onDateSelect={handleSelectedDate}
                          doctorId={doctorId}
                        />
                      </div>
                      {chooseDate ? (
                        <Fragment>
                          <hr className="w-full h-[2px] border-[1px]  bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] border-none" />
                          <div className="w-full text-[20px] my-5">
                            <span>Giờ làm việc</span>
                          </div>
                          <div className="w-full my-2 flex gap-5 flex-wrap ">
                            {WorkTimeDoctor.map((item, index) => {
                              const chooseDateParts = chooseDate.split("/");
                              const formattedChooseDate = `${chooseDateParts[2]}-${chooseDateParts[1]}-${chooseDateParts[0]}`;

                              const workDate = new Date(item.workDate);
                              const chooseDateFormatted = new Date(
                                formattedChooseDate
                              );

                              if (
                                isNaN(workDate.getTime()) ||
                                isNaN(chooseDateFormatted.getTime())
                              ) {
                                return null;
                              }

                              const formattedWorkDate =
                                workDate.toLocaleDateString("vi-VN");
                              const formattedChooseDates =
                                chooseDateFormatted.toLocaleDateString("vi-VN");

                              if (formattedWorkDate === formattedChooseDates) {
                                const startTimeFormatted = new Date(
                                  `1970-01-01T${item.startTime}`
                                ).toLocaleTimeString("vi-VN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                });
                                const endTimeFormatted = new Date(
                                  `1970-01-01T${item.endTime}`
                                ).toLocaleTimeString("vi-VN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                });

                                return (
                                  // <Link
                                  //   key={index}
                                  //   to={`/choose-profile?doctor=${doctorId}&work=${item.id}&specialty=${txnSpecialtyId}`}
                                  // >
                                  <div
                                    className="py-2 px-4 border-[1px] cursor-pointer  border-[#00b5f1] hover:bg-gradient-to-r hover:from-[#00b5f1] hover:to-[#00e0ff] hover:text-[#fff] rounded-lg border-solid text-[20px]"
                                    key={index}
                                    onClick={() =>
                                      handleSelectidByWorktime(item.id)
                                    }
                                  >
                                    {startTimeFormatted} - {endTimeFormatted}
                                  </div>
                                  // </Link>
                                );
                              }

                              return null;
                            })}
                          </div>
                          <div className="w-full mt-4">
                            <span className="text-[#d98634] text-[16px]">
                              Tất cả thời gian theo múi giờ Việt Nam GMT +7
                            </span>
                          </div>
                          <div className="w-full h-[170px] bg-black my-4">
                            <img
                              src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBanner-Telemed.1ae88663.png&w=828&q=75"
                              alt="banner"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment></Fragment>
                      )}
                    </div>
                  </Fragment>
                )}
                {ChooseDoctor ? (
                  // back từ chọn bác sĩ
                  <button
                    className="flex text-[#003553] gap-2 items-center hover:bg-[#c2c2c2]/20 mt-4 rounded-lg"
                    onClick={handlegoBackHospital}
                  >
                    Quay lại <IoReturnDownBack className="text-[30px]" />
                  </button>
                ) : (
                  <Fragment></Fragment>
                )}
                {/* back từ chọn date */}
                {selectDate ? (
                  <Fragment></Fragment>
                ) : (
                  <Fragment>
                    <button
                      className="flex text-[#003553] gap-2 items-center hover:bg-[#c2c2c2]/20 mt-4 rounded-lg"
                      onClick={handlegoBackDoctor}
                    >
                      Quay lại <IoReturnDownBack className="text-[30px]" />
                    </button>
                  </Fragment>
                )}
                {selectspecialty ? (
                  <Fragment>
                    <button
                      className="flex text-[#003553] gap-2 items-center hover:bg-[#c2c2c2]/20 mt-4 rounded-lg"
                      onClick={handlegoBackSpec}
                    >
                      Quay lại <IoReturnDownBack className="text-[30px]" />
                    </button>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
              </div>
            </div>
          )}
          {/* end col 2 */}
        </div>
      </div>
    </div>
  );
}

export default Booking;
