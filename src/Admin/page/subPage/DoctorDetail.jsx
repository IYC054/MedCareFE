import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../../../components/Authentication/authService";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
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
  // Chuyển shift thành startTime & endTime
  const shiftTimes = {
    morning: { startTime: "08:00:00", endTime: "12:00:00" },
    afternoon: { startTime: "13:00:00", endTime: "16:00:00" },
    both: [
      { startTime: "08:00:00", endTime: "12:00:00" },
      { startTime: "13:00:00", endTime: "16:00:00" },
    ],
  };

  // Khi chọn ca làm việc
  const handleShiftSelect = (shift) => {
    setSelectedShift(shift);

    // Kiểm tra và lưu thời gian cho ca làm việc đã chọn
    if (shift === "morning") {
      const { startTime, endTime } = shiftTimes.morning;
      console.log("Start Time:", startTime); // "08:00:00"
      console.log("End Time:", endTime); // "12:00:00"
    } else if (shift === "afternoon") {
      const { startTime, endTime } = shiftTimes.afternoon;
      console.log("Start Time:", startTime); // "13:00:00"
      console.log("End Time:", endTime); // "16:00:00"
    } else if (shift === "both") {
      shiftTimes.both.forEach((shift, index) => {
        console.log(`Shift ${index + 1}:`);
        console.log("Start Time:", shift.startTime);
        console.log("End Time:", shift.endTime);
      });
    }
  };

  console.log(selectedShift);
  // Khi chọn     ngày làm việc
  const formatDate = (date) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd");
  };
  const handleEditSchedule = async () => {
    if (!selectedShift) {
      alert("Vui lòng chọn ca làm việc và ngày làm!");
      return;
    }

    let shiftsToPost = [];
    if (selectedShift === "both") {
      shiftsToPost = [
        { startTime: "08:00:00", endTime: "12:00:00" },
        { startTime: "13:00:00", endTime: "16:00:00" },
      ];
    } else {
      const { startTime, endTime } = shiftTimes[selectedShift];
      shiftsToPost = [{ startTime, endTime }];
    }

    try {
    //   const deleteResponse = await axios.delete(
    //     `http://localhost:8080/api/workinghours/doctor/${id}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log("Lịch cũ đã được xóa:", deleteResponse.data);

      for (let shift of shiftsToPost) {
        const body = {
          doctor: id,
          workStart: formatDate(startDate),
          workDate: formatDate(endDate),
          startTime: shift.startTime,
          endTime: shift.endTime,
        };

        const postResponse = await axios.post(
          "http://localhost:8080/api/workinghours",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Lịch làm việc đã lưu:", postResponse.data);
      }

      // Sau khi POST thành công, tải lại dữ liệu để cập nhật bảng
      fetchDoctorData(); // Gọi lại hàm để tải lại dữ liệu lịch làm việc

      alert("Lịch làm việc đã được lưu thành công!");
      setIsOpenEdit(false);
    } catch (error) {
      console.error("Lỗi khi lưu lịch làm việc:", error);
      alert("Đã xảy ra lỗi khi lưu lịch làm việc!");
    }
  };

  // Tạo danh sách lịch làm việc để gửi API
  const handleSaveSchedule = async () => {
    if (!selectedShift) {
      alert("Vui lòng chọn ca làm việc và ngày làm!");
      return;
    }

    // Danh sách các ca làm việc cần post
    let shiftsToPost = [];

    if (selectedShift === "both") {
      // Nếu chọn ca 'both', tạo 2 ca
      shiftsToPost = [
        { startTime: "08:00:00", endTime: "12:00:00" },
        { startTime: "13:00:00", endTime: "16:00:00" },
      ];
    } else {
      // Nếu chọn một ca duy nhất, chỉ cần tạo 1 ca
      const { startTime, endTime } = shiftTimes[selectedShift];
      shiftsToPost = [{ startTime, endTime }];
    }

    // Tạo body JSON cho từng ca và gửi đi
    for (let shift of shiftsToPost) {
      const body = {
        doctor: id,
        workStart: formatDate(startDate),
        workDate: formatDate(endDate),
        startTime: shift.startTime,
        endTime: shift.endTime,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/api/workinghours",
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Đảm bảo gửi kiểu nội dung JSON
            },
          }
        );

        console.log("Lịch làm việc đã lưu:", response.data);
        alert("Lịch làm việc đã được lưu thành công!");
        fetchDoctorData();
        setIsOpen(false);
      } catch (error) {
        console.error("Lỗi khi lưu lịch làm việc:", error);
        alert("Đã xảy ra lỗi khi lưu lịch làm việc!");
      }
    }
  };

  const [loading, setLoading] = useState(true);
  const token = getToken();
  const fetchDoctorData = async () => {
    try {
      // Fetch dữ liệu bác sĩ, hồ sơ bệnh nhân và lịch làm việc song song
      const [doctorResponse, patientfileResponse, workingHoursResponse] =
        await Promise.all([
          axios.get("http://localhost:8080/api/doctors"),
          axios.get("http://localhost:8080/api/patientsfile"),
          axios.get("http://localhost:8080/api/workinghours", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      // Lọc bác sĩ theo id
      const doctorData = doctorResponse.data.find(
        (doc) => doc.id === parseInt(id)
      );
      console.log("ASDADSSA " + JSON.stringify(doctorData));
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
        console.log("ASDADSdsadsadasSA " + JSON.stringify(doctorWorkingHours));

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
  console.log(doctor);
  console.log("patientFile", patientFile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [selectedWorkDate, setSelectedWorkDate] = useState(null);
  const handleShiftUpdate = async () => {
    try {
      const updatedShift = {
        startTime: selectedShift === "morning" ? "08:00:00" : "13:00:00",
        endTime: selectedShift === "morning" ? "12:00:00" : "16:00:00",
        workDate: selectedWorkDate,
      };
      // Gửi yêu cầu cập nhật
      await axios.put(
        `http://localhost:8080/api/workinghours/${selectedShiftId}`,
        {
          startTime: selectedShift === "morning" ? "08:00:00" : "13:00:00",
          endTime: selectedShift === "morning" ? "12:00:00" : "16:00:00",
          workDate: selectedWorkDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWorkingHours((prevState) =>
        prevState.map((item) => {
          // Nếu ID khớp, cập nhật thông tin ca làm việc
          if (item.id === selectedShiftId) {
            return {
              ...item,
              startTime: updatedShift.startTime,
              endTime: updatedShift.endTime,
              workDate: updatedShift.workDate,
            };
          }
          return item;
        })
      );

      // Đóng modal sau khi cập nhật thành công
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi cập nhật giờ làm việc", error);
    }
  };

  const openUpdateModal = (shift, shiftId, workDate) => {
    setSelectedShift(shift);
    setSelectedShiftId(shiftId);
    setSelectedWorkDate(workDate);
    setIsModalOpen(true); // Mở modal chỉnh sửa
  };
  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">Loading data...</div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 relative" id="goup">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Doctor Details Section */}
        <h1 className="text-3xl font-extrabold mb-6 text-[#da624a] text-center">
          Doctor Information
        </h1>

        <div className="mb-6 flex items-center gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#da624a] shadow-lg">
            <img
              src={doctor.account.avatar || ""}
              alt="Doctor Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {doctor ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Dr. {doctor.account.name}
                </h2>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Email:</span>{" "}
                  {doctor.account.email}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Phone:</span>{" "}
                  {doctor.account.phone}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Gender:</span>{" "}
                  {doctor.account.gender}
                </p>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-medium">Experience Years:</span>{" "}
                  {doctor.experienceYears}
                </p>

                <p className="text-gray-600 text-lg">
                  <span className="font-medium">Specialty:</span>
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
              <p className="text-gray-500">Doctor information not available.</p>
            )}
          </div>
        </div>
        <div className="mb-6 flex justify-center">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => setIsOpenEdit(true)}
          >
            Cập nhật lịch làm việc
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Lịch làm việc của bác sĩ
          </h2>
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
                {workingHours.length > 0 ? (
                  workingHours.map((shift, index) => (
                    <tr key={index} className="bg-gray-50 border-b">
                      <td className="px-4 py-2 text-gray-700">
                        {formatDate(shift.workDate)}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {shift.startTime === "08:00:00" &&
                        shift.endTime === "12:00:00"
                          ? "Ca sáng (08:00 - 12:00)"
                          : shift.startTime === "13:00:00" &&
                            shift.endTime === "16:00:00"
                          ? "Ca chiều (13:00 - 16:00)"
                          : "Cả 2 ca"}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {shift.startTime}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {shift.endTime}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          onClick={() =>
                            openUpdateModal(
                              shift.startTime === "08:00:00"
                                ? "morning"
                                : "afternoon",
                              shift.id,
                              shift.workDate
                            )
                          }
                        >
                          Cập nhật
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Không có lịch làm việc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
              <div
                className="fixed inset-0 z-20 bg-black bg-opacity-50  backdrop-blur-sm flex items-center justify-center"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="bg-white p-6 rounded-lg shadow-lg w-[400px]"
                  onClick={(e) => e.stopPropagation()} // Ngừng sự kiện để không đóng modal khi nhấn vào trong
                >
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Chỉnh sửa ca làm việc của ngày{" "}
                  </h2>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Chọn ca làm việc:
                    </label>
                    <div className="flex gap-3 justify-center">
                      {["morning", "afternoon"].map((shift) => {
                        const shiftLabel = {
                          morning: "Ca sáng (08:00 - 12:00)",
                          afternoon: "Ca chiều (13:00 - 16:00)",
                        }[shift];

                        const isSelected = selectedShift === shift;

                        return (
                          <button
                            key={shift}
                            className={`px-5 py-3 text-lg font-medium rounded-md transition ${
                              isSelected
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
                      className="bg-blue-500 text-white px-5 py-3 rounded-md text-lg hover:bg-blue-600"
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
        {/* Patient History Section */}
        {/* <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Patient History
          </h2>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    No.
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Patient Name
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Price
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Prescription
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">
                    Images
                  </th>
                </tr>
              </thead>
              <tbody>
                {patientFile.length > 0 ? (
                  patientFile.map((patient, index) => (
                    <tr key={index} className="bg-gray-50 border-b">
                      <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {patient.patients.account.name}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {patient.totalPrice} VNĐ
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {patient.prescription}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {patient.patients.imageUrl ? (
                          <img
                            src={patient.patients.imageUrl}
                            alt="Patient"
                            className="w-12 h-12 rounded"
                          />
                        ) : (
                          <span>No image</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No patient history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50  backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[700px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Thiết lập giờ làm
            </h2>

            {/* Chọn ca làm việc */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-lg">
                Chọn ca làm việc:
              </label>
              <div className="flex gap-3 justify-center">
                {["morning", "afternoon"].map((shift) => {
                  const shiftLabel = {
                    morning: "Ca sáng (08:00 - 12:00)",
                    afternoon: "Ca chiều (13:00 - 16:00)",
                  }[shift];

                  const isSelected = selectedShift === shift;

                  return (
                    <button
                      key={shift}
                      className={`px-5 py-3 text-lg font-medium rounded-md transition ${
                        isSelected
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

            {/* Chọn ngày làm việc */}
            {selectedShift && (
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-lg">
                  Chọn ngày làm việc:
                </label>
                <div className="border p-4 rounded-md bg-gray-100">
                  <div className="flex justify-between space-x-4">
                    {/* Chọn ngày bắt đầu */}
                    <div className="w-1/2">
                      <label className="block font-medium mb-2">
                        Ngày bắt đầu:
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          if (endDate && date > endDate) {
                            setEndDate(null); // Reset nếu ngày bắt đầu lớn hơn ngày kết thúc
                          }
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()} // Chỉ cho phép chọn từ hôm nay trở đi
                        inline
                      />
                    </div>

                    {/* Chọn ngày kết thúc */}
                    <div className="w-1/2">
                      <label className="block font-medium mb-2">
                        Ngày kết thúc:
                      </label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate || new Date()} // Ngày kết thúc >= ngày bắt đầu
                        inline
                      />
                    </div>
                  </div>

                  {/* Hiển thị ngày đã chọn */}
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
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-5 py-3 rounded-md text-lg hover:bg-blue-600"
                onClick={handleSaveSchedule}
              >
                Lưu lịch làm
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpenEdit && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50  backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsOpenEdit(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[700px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Thiết lập lại giờ làm
            </h2>

            {/* Chọn ca làm việc */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-lg">
                Chọn ca làm việc:
              </label>
              <div className="flex gap-3 justify-center">
                {["morning", "afternoon"].map((shift) => {
                  const shiftLabel = {
                    morning: "Ca sáng (08:00 - 12:00)",
                    afternoon: "Ca chiều (13:00 - 16:00)",
                  }[shift];

                  const isSelected = selectedShift === shift;

                  return (
                    <button
                      key={shift}
                      className={`px-5 py-3 text-lg font-medium rounded-md transition ${
                        isSelected
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

            {/* Chọn ngày làm việc */}
            {selectedShift && (
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-lg">
                  Chọn ngày làm việc:
                </label>
                <div className="border p-4 rounded-md bg-gray-100">
                  <div className="flex justify-between space-x-4">
                    {/* Chọn ngày bắt đầu */}
                    <div className="w-1/2">
                      <label className="block font-medium mb-2">
                        Ngày bắt đầu:
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          if (endDate && date > endDate) {
                            setEndDate(null); // Reset nếu ngày bắt đầu lớn hơn ngày kết thúc
                          }
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()} // Chỉ cho phép chọn từ hôm nay trở đi
                        inline
                      />
                    </div>

                    {/* Chọn ngày kết thúc */}
                    <div className="w-1/2">
                      <label className="block font-medium mb-2">
                        Ngày kết thúc:
                      </label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate || new Date()} // Ngày kết thúc >= ngày bắt đầu
                        inline
                      />
                    </div>
                  </div>

                  {/* Hiển thị ngày đã chọn */}
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
