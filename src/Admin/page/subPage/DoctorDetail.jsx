import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../../components/Authentication/authService";
import DatePicker from "react-datepicker";
import { format, set } from "date-fns";
import { enUS } from "date-fns/locale";
import { FaCrown } from "react-icons/fa";
import EditCv from "../editPage/EditCv";
function DoctorDetail() {
  const { id } = useParams(); // Lấy ID bác sĩ từ URL
  const [doctor, setDoctor] = useState(null);
  const [patientFile, setPatientFile] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [workingHours, setWorkingHours] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const shiftTimes = {
    morning: { startTime: "08:00:00", endTime: "12:00:00" },
    afternoon: { startTime: "13:00:00", endTime: "17:00:00" },
    both: [
      { startTime: "08:00:00", endTime: "12:00:00" },
      { startTime: "13:00:00", endTime: "17:00:00" }
    ]
  };

  // Khi chọn ca làm việc
  const handleShiftSelect = (shift) => {
    setSelectedShift(shift);

    if (shift === "morning") {
      const { startTime, endTime } = shiftTimes.morning;
      console.log("Start Time:", startTime);
      console.log("End Time:", endTime);
    } else if (shift === "afternoon") {
      const { startTime, endTime } = shiftTimes.afternoon;
      console.log("Start Time:", startTime);
      console.log("End Time:", endTime);
    } else if (shift === "both") {
      shiftTimes.both.forEach(({ startTime, endTime }, index) => {
        console.log(`Ca ${index + 1}: ${startTime} - ${endTime}`);
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd");
  };
  const handleEditSchedule = async () => {
    if (doctor.vip) {
      setSelectedShift("both");
    }

    if (!selectedShift || !startDate || !endDate) {
      alert("Vui lòng chọn ca làm việc và ngày làm!");
      return;
    }

    try {
      if (selectedShift === "both") {
        // Nếu chọn "both", gửi 2 lần POST cho 2 ca
        for (const { startTime, endTime } of shiftTimes.both) {
          const shiftData = {
            doctor: id,
            workStart: formatDate(startDate),
            workDate: formatDate(endDate),
            startTime,
            endTime,
          };

          await axios.post("http://localhost:8080/api/workinghours", shiftData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
      } else {
        // Nếu chỉ chọn 1 ca, gửi 1 lần POST bình thường
        const shiftData = {
          doctor: id,
          workStart: formatDate(startDate),
          workDate: formatDate(endDate),
          startTime: shiftTimes[selectedShift].startTime,
          endTime: shiftTimes[selectedShift].endTime,
        };

        await axios.post("http://localhost:8080/api/workinghours", shiftData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      console.log("Lịch làm việc đã lưu thành công!");

      // Sau khi POST thành công, tải lại dữ liệu để cập nhật bảng
      fetchDoctorData();

      alert("Lịch làm việc đã được lưu thành công!");
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Lỗi khi lưu lịch làm việc:", error);
      alert("Đã xảy ra lỗi khi lưu lịch làm việc!");
    }
  };




  const [loading, setLoading] = useState(true);
  const token = getToken();
  const fetchDoctorData = async () => {
    try {
      // Fetch dữ liệu bác sĩ, hồ sơ bệnh nhân và lịch làm việc song song
      const [doctorResponse, patientfileResponse, rateResponse, workingHoursResponse] =
        await Promise.all([
          axios.get("http://localhost:8080/api/doctors"),
          axios.get("http://localhost:8080/api/patientsfile"),
          axios.get('http://localhost:8080/api/rates'),
          axios.get("http://localhost:8080/api/workinghours", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
      const rateofDoc = rateResponse.data.filter(doc => doc.doctor_id.id === parseInt(id));

      // Tính trung bình rating
      const totalRates = rateofDoc.reduce((sum, item) => sum + item.rate, 0);
      const averageRate = rateofDoc.length > 0 ? totalRates / rateofDoc.length : 0;

      setRates(averageRate.toFixed(1)); //

      console.log(rates)
      const doctorData = doctorResponse.data.find(
        (doc) => doc.id === parseInt(id)
      );

      if (doctorData) {
        setDoctor(doctorData);

        // Lọc hồ sơ bệnh nhân của bác sĩ
        const patientsForDoctor = patientfileResponse.data.filter(
          (pa) => pa.doctor_id === parseInt(id)
        );
        setPatientFile(patientsForDoctor);

        // Lọc lịch làm việc của bác sĩ
        const doctorWorkingHours = workingHoursResponse.data.filter(
          (item) => item.doctor_id === parseInt(id)
        );

        setWorkingHours(doctorWorkingHours);
      } else {
        console.error("Không tìm thấy bác sĩ với ID:", id);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bác sĩ:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();

  }, [id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [selectedWorkDate, setSelectedWorkDate] = useState(null);
  const [error, setError] = useState("");
  const [rates, setRates] = useState([]);

  const handleShiftUpdate = async () => {

    if (!selectedShiftId || selectedShiftId.length === 0) {
      setError("Không có ca làm việc nào được chọn!");
      return;
    }

    try {
      if (doctor.vip) {
        let startTime, endTime;
        if (selectedShift === "morning") {
          startTime = "08:00:00";
          endTime = "12:00:00";
        } else if (selectedShift === "afternoon") {
          startTime = "13:00:00";
          endTime = "17:00:00";
        } else if (selectedShift === "both") {
          startTime = "08:00:00";
          endTime = "17:00:00";
        }
        console.log("ID cần tìm:", id);
        const doctorId = Number(id);
        const responsea = await axios.get("http://localhost:8080/api/vip-appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Lọc ra những mục có doctorId trùng với id hiện tại
        const doctorAppointment = responsea.data.find(appointment =>
          appointment.doctor.id === doctorId
          &&
          appointment.workDate === selectedWorkDate
        );
        const bookTime = doctorAppointment.startTime;

        if (bookTime < startTime || bookTime > endTime) {
          alert("Cập nhật giờ bị trùng!");
          return;
        }
        if (doctorAppointment) {

          const response = await axios.get(`http://localhost:8080/api/vip-appointments/check`, {
            params: {
              workDate: selectedWorkDate,
              bookTime: doctorAppointment.startTime,
              startTime: startTime,
              endTime: endTime,
              doctorId: id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data === true) {
            alert("Đã có người đặt lịch trong khoảng thời gian này. Không thể thay đổi!");
            return;
          }
        }
      }
      // 1. Xoá từng ca làm việc theo danh sách shiftIds
      await Promise.all(
        selectedShiftId.map(async (id) => {
          await axios.delete(`http://localhost:8080/api/workinghours/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
      );

      // 2. Tạo lại ca làm việc mới dựa vào ca đã chọn
      let newShifts = [];

      if (selectedShift === "morning" || selectedShift === "both") {
        newShifts.push({
          workStart: selectedWorkDate,
          workDate: selectedWorkDate,
          startTime: "08:00:00",
          endTime: "12:00:00",
          doctor: id, // Kiểm tra xem 'id' có đúng không
        });
      }

      if (selectedShift === "afternoon" || selectedShift === "both") {
        newShifts.push({
          workStart: selectedWorkDate,
          workDate: selectedWorkDate,
          startTime: "13:00:00",
          endTime: "17:00:00",
          doctor: id,
        });
      }

      // 3. Gửi từng yêu cầu POST riêng biệt nếu API không hỗ trợ mảng
      await Promise.all(
        newShifts.map(async (shift) => {
          await axios.post("http://localhost:8080/api/workinghours", shift, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        })
      );

      // 4. Đóng modal và làm mới dữ liệu
      setIsModalOpen(false);
      alert("Cập nhật thành công!");
      fetchDoctorData();
    } catch (error) {
      console.error("Lỗi cập nhật ca làm việc:", error);
      setError("Cập nhật thất bại! Vui lòng thử lại.");
    }

  };




  const openUpdateModal = (shift, shiftId, workDate) => {
    console.log("Shift:", shift);
    console.log("Shift ID(s):", shiftId);
    console.log("Work Date:", workDate);
    setSelectedShift(shift);
    setSelectedShiftId(shiftId);
    setSelectedWorkDate(workDate);
    setIsModalOpen(true); // Mở modal chỉnh sửa
    setError("");
  };

  const [showEditCv, setShowEditCv] = useState(false);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const navigate = useNavigate();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");


  const sortedWorkingHours = [...workingHours].sort(
    (a, b) => new Date(b.workDate) - new Date(a.workDate)
  );
  // Nhóm các ca làm việc theo workDate
  const groupedShifts = sortedWorkingHours
    .filter((shift) => {
      const shiftDate = new Date(shift.workDate);
      const from = start ? new Date(start) : null;
      const to = end ? new Date(end) : null;

      // Chỉ giữ lại các ca làm việc nằm trong khoảng ngày được chọn
      return (!from || shiftDate >= from) && (!to || shiftDate <= to);
    })
    .reduce((acc, shift) => {
      const { id, workDate, startTime, endTime } = shift;

      // Nếu ngày này chưa có trong acc, thêm vào
      if (!acc[workDate]) {
        acc[workDate] = { workDate, shifts: [] };
      }

      // Thêm ca vào danh sách shifts
      acc[workDate].shifts.push({ id, startTime, endTime });

      return acc;
    }, {});

  // Chuyển đổi thành mảng để render
  const groupedShiftArray = Object.values(groupedShifts);



  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">Tải dữ liệu...</div>
    );
  }
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 me-1 ${i <= rating ? "text-yellow-300" : "text-gray-300"
            }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  };




  return (
    <div className="bg-gray-100 min-h-screen p-6 relative" id="goup">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Doctor Details Section */}
        <h1 className="text-3xl font-extrabold mb-6 text-[#da624a] text-center">
          Thông tin bác sĩ
        </h1>
        <div className="mb-6 flex items-start gap-8">
          {/* Avatar & Chỉnh sửa */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#da624a] shadow-lg">
              <img
                src={doctor.account.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq89CiAzo83k2OJHzwV4hsrgE7Cm0sAWlkpw&s"}
                alt="Doctor Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" items-center mb-2">
              <div className="flex">
                {renderStars(rates)}

              </div>
              <div className="flex my-2 justify-center">
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{rates}</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
              </div>
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate(`/admin/editdoctor/${doctor.id}`)}
            >
              Cập nhật lại thông tin
            </button>
          </div>

          {/* Thông tin bác sĩ */}
          <div className="flex-1">
            {doctor ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {doctor.vip && (
                    <div className="flex items-center">
                      <span>Dr. {doctor.account.name}</span>
                      <FaCrown className="text-[gold] ml-2" />
                    </div>
                  )}
                </h2>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Email:</span> {doctor.account.email}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Số điện thoại:</span> {doctor.account.phone}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Giới tính:</span>{" "}
                  {doctor.account.gender === "Female" ? "Nữ" : doctor.account.gender === "Male" ? "Nam" : "Không xác định"}
                </p>

                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Năm kinh nghiệm:</span> {doctor.experienceYears}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Địa chỉ:</span> {doctor.address}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Số CCCD:</span> {doctor.cccd}
                </p>
                <p className="text-gray-600 text-lg">
                  <span className="font-medium">Chuyên khoa:</span>{" "}
                  {doctor.specialties.length > 0 ? (
                    doctor.specialties.map((specialty, index) => (
                      <span key={specialty.id}>
                        {specialty.name}
                        {index < doctor.specialties.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    <span>Not specified</span>
                  )}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Không có thông tin Bác sĩ.</p>
            )}
          </div>

          {/* Cập nhật hình & Ảnh bác sĩ (Căn bên phải) */}
          <div className="flex flex-col items-end space-y-4 ml-auto">
            {doctor.filesImages && doctor.filesImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {doctor.filesImages.map((file, index) => (
                  <img
                    key={index}
                    src={file.urlImage}
                    alt={`Doctor Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedImage2(file.urlImage)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Chưa có thông tin CV</p>
            )}
            <button
              onClick={() => setShowEditCv(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Cập nhật lại hình CV
            </button>
            {showEditCv && <EditCv onClose={() => setShowEditCv(false)} doctorId={doctor.id} fileImages={doctor.filesImages} onUpdate={fetchDoctorData} />}
          </div>
        </div>

        {selectedImage2 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="relative">
              <button
                className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
                onClick={() => setSelectedImage2(null)}
              >
                ✕
              </button>
              <img src={selectedImage2} alt="Selected" className="max-w-full max-h-[90vh] rounded-lg shadow-lg" />
            </div>
          </div>
        )}

        <div className="mb-6 flex justify-center">
          <button
            className="bg-[#da624a] text-white px-4 py-2 rounded-md hover:bg-[#da624a] transition"
            onClick={() => setIsOpenEdit(true)}
          >
            Cập nhật lịch làm việc
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Lịch làm việc của bác sĩ
          </h2>
          <div className="mb-4 flex gap-4">
            {/* Chọn ngày bắt đầu */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Từ ngày:
              </label>
              <input
                type="date"
                className="border p-2 rounded-md w-full"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>

            {/* Chọn ngày kết thúc */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Đến ngày:
              </label>
              <input
                type="date"
                className="border p-2 rounded-md w-full"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>


          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Ngày
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Ca làm việc
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Giờ bắt đầu
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Giờ kết thúc
                  </th>

                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Cập nhật
                  </th>

                </tr>
              </thead>
              <tbody>
                {groupedShiftArray.length > 0 ? (
                  groupedShiftArray.map((group, index) => {
                    const { workDate, shifts } = group;

                    // Kiểm tra nếu có cả sáng và chiều
                    const hasMorning = shifts.some(s => s.startTime === "08:00:00" && s.endTime === "12:00:00");
                    const hasAfternoon = shifts.some(s => s.startTime === "13:00:00" && s.endTime === "17:00:00");

                    return (
                      <tr key={index} className="bg-gray-50 border-b">
                        <td className="px-4 py-2 text-gray-700">{formatDate(workDate)}</td>
                        <td className="px-4 py-2 text-gray-700">
                          {hasMorning && hasAfternoon
                            ? "Cả ngày (08:00 - 17:00)"
                            : hasMorning
                              ? "Ca sáng (08:00 - 12:00)"
                              : hasAfternoon
                                ? "Ca chiều (13:00 - 17:00)"
                                : `Ca từ ${shifts[0].startTime} đến ${shifts[0].endTime}`}
                        </td>
                        <td className="px-4 py-2 text-gray-700">{shifts.map(s => s.startTime).join(" / ")}</td>
                        <td className="px-4 py-2 text-gray-700">{shifts.map(s => s.endTime).join(" / ")}</td>

                        <td className="px-4 py-2 text-gray-700">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                              const shiftIds = group.shifts.map(shift => shift.id);
                              openUpdateModal(
                                hasMorning && hasAfternoon
                                  ? "both"
                                  : hasMorning
                                    ? "morning"
                                    : "afternoon",
                                shiftIds,
                                workDate
                              );
                              console.log(shiftIds);
                            }}
                          >
                            Cập nhật
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                      Không có lịch làm việc trong khoảng thời gian này.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
              <div
                className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="bg-white p-6 rounded-lg shadow-lg w-[400px]"
                  onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện để không đóng modal khi nhấn vào trong
                >
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Chỉnh sửa ca làm việc của ngày{" "}
                  </h2>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Chọn ca làm việc:
                    </label>
                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

                    <div className="flex gap-3 justify-center">
                      {["morning", "afternoon", "both"].map((shift) => {
                        const shiftLabel = {
                          morning: "Ca sáng (08:00 - 12:00)",
                          afternoon: "Ca chiều (13:00 - 17:00)",
                          both: "Cả hai ca (8:00 - 17:00)",
                        }[shift];
                        const isSelected = selectedShift === shift;
                        return (
                          <button
                            key={shift}
                            className={`px-5 py-3 text-lg font-medium rounded-md transition ${isSelected
                              ? "bg-[#da624a] text-white"
                              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                              }`}
                            onClick={() => setSelectedShift(shift)}
                          >
                            {shiftLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      className="bg-gray-500 text-white px-5 py-3 rounded-md text-lg hover:bg-gray-600"
                      onClick={() => setIsModalOpen(false)} // Đóng modal khi nhấn "Hủy"
                    >
                      Hủy
                    </button>
                    <button
                      className="bg-[#da624a] text-white px-5 py-3 rounded-md text-lg hover:bg-[#da624a]"
                      onClick={handleShiftUpdate} // Lưu lịch làm việc
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>

            )}
          </div>
        </div>
      </div>

      {isOpenEdit && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsOpenEdit(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[700px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Thiết lập lại giờ làm</h2>

            {/* Nếu không phải VIP thì hiển thị chọn ca làm việc */}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-lg">
                Chọn ca làm việc:
              </label>
              <div className="flex gap-3 justify-center">
                {["morning", "afternoon", "both"].map((shift) => {
                  const shiftLabel = {
                    morning: "Ca sáng (08:00 - 12:00)",
                    afternoon: "Ca chiều (13:00 - 17:00)",
                    both: "2 Ca sáng - chiều (08:00 - 17:00)",
                  }[shift];
                  const isSelected = selectedShift === shift;
                  return (
                    <button
                      key={shift}
                      className={`px-5 py-3 text-lg font-medium rounded-md transition ${isSelected
                        ? "bg-[#da624a] text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                      onClick={() => handleShiftSelect(shift)}
                    >
                      {shiftLabel}
                    </button>
                  );
                })}
              </div>
            </div>
            {(selectedShift || doctor.vip) && (
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-lg">
                  Chọn ngày làm việc:
                </label>
                <div className="border p-4 rounded-md bg-gray-100">
                  <div className="flex justify-between space-x-4">
                    {/* Chọn ngày bắt đầu */}
                    <div className="w-1/2">
                      <label className="block font-medium mb-2">Ngày bắt đầu:</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          if (endDate && date > endDate) {
                            setEndDate(null);
                          }
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        inline
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block font-medium mb-2">Ngày kết thúc:</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate || new Date()}
                        inline
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-md shadow">
                    <p>
                      <strong>Ngày bắt đầu:</strong> {formatDate(startDate)}
                    </p>
                    <p>
                      <strong>Ngày kết thúc:</strong> {formatDate(endDate)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Nút lưu */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-500 text-white px-5 py-3 rounded-md text-lg hover:bg-gray-600"
                onClick={() => setIsOpenEdit(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-5 py-3 rounded-md text-lg hover:bg-blue-600"
                onClick={handleEditSchedule}
              >
                Lưu lịch làm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDetail;
