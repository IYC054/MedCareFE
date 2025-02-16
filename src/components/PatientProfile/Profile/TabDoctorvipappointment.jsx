import React, { useContext, useEffect, useState } from "react";
import {
  getAppointmentByDoctorId,
  getVIPAppointmentByDoctorId,
  UpdateStatusAppointment,
  UpdateStatusVipAppointment,
} from "../../../api/Doctor/appointment";
import {
  getallPaymentByAppoint,
  getallPaymentByVipAppoint,
} from "../../../api/Bank/payment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { ProfilebypatientprofileId } from "../../../api/Profile/profilebyaccount";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { AppContext } from "../../Context/AppProvider";
import { getDoctorbyId } from "../../../api/Doctor/doctor";
import { getToken } from "../../Authentication/authService";

function TabDoctorvipappointment() {
  const [appointments, setAppointments] = useState([]);
  const { User } = useContext(AppContext);

  // const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(7);
  const statusoption = ["Xác nhận", "Huỷ bỏ", "Chờ xử lý", "Thành công"];
  const fetchAppointments = async () => {
    try {
      const doctorId = await getDoctorbyId(User?.id);
      const data = await getVIPAppointmentByDoctorId(doctorId?.id);
      if (data && data.length > 0) {
        const enrichedAppointments = await Promise.all(
          data.map(async (appointment) => {
            const [patientDetails, paymentDetails] = await Promise.all([
              ProfilebypatientprofileId(appointment.patientprofile_id),
              getallPaymentByVipAppoint(appointment.id),
            ]);
            return { ...appointment, patientDetails, paymentDetails };
          })
        );
        setAppointments(enrichedAppointments);
        // console.log("env: " + enrichedAppointments)
      }
      // }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  // Fetch appointments once on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStauts = async (
    id,
    status,
    doctorid,
    patientfile_id,
    appointment_id
  ) => {
    try {
      await UpdateStatusVipAppointment(id, status);
      if (status === "Thành công") {
        const checksuccess = axios.post(
          `http://localhost:8080/api/patientsfile/vip-appointment?doctors_id=${doctorid}&patients_profile_id=${patientfile_id}&vipappointment_id=${appointment_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (checksuccess != null) {
          enqueueSnackbar("Cập nhật thành công!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        } else {
          enqueueSnackbar("Cập nhật không thành công!", {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      }
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
  return (
    <div className="w-full h-full  border-l border-[#00b5f1] pl-10 ">
      <span className="text-[24px] font-medium">
        Quản lý lịch hẹn đặt khám VIP{" "}
      </span>
      <div className="flex gap-2">
        <div
          className=" p-2 bg-[#00b5f1] text-[#fff] rounded-lg"
          style={{ width: "fit-content" }}
        >
          Bạn đang hiện có{" "}
          {appointments.filter((item) => item.status === "Chờ xử lý").length}{" "}
          cuộc hẹn
        </div>
        <div
          className=" p-2 bg-[#00b5f1] text-[#fff] rounded-lg"
          style={{ width: "fit-content" }}
        >
          Bạn khám thành công{" "}
          {appointments.filter((item) => item.status === "Thành công").length}{" "}
          cuộc hẹn
        </div>
        <div
          className=" p-2 bg-[#00b5f1] text-[#fff] rounded-lg"
          style={{ width: "fit-content" }}
        >
          Bạn huỷ{" "}
          {appointments.filter((item) => item.status === "Huỷ bỏ").length} cuộc
          hẹn
        </div>
      </div>
      <div className="mt-4 w-full h-[500px] bg-[#fff] rounded-lg shadow-lg">
        <div className="flex flex-col w-full h-full text-gray-700 bg-white overflow-auto overflow-y-hidden shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Tên
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Dịch vụ
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Mã phiếu
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Giờ khám
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Trạng thái
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70"></p>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {currentAppointments.map((item, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 capitalize">
                      {item.patientDetails.fullname}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {item.type}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {item.paymentDetails.map((payment, index) => (
                        <div key={index}>{payment.transactionCode}</div>
                      ))}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {item.startTime} - {item.endTime}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {/* {item.status} */}
                      <Select
                        className={`w-full`}
                        value={item.status}
                        onChange={(value) =>
                          handleUpdateStauts(
                            item.id,
                            value,
                            item.doctor_id,
                            item.patientprofile_id,
                            item.id
                          )
                        }
                      >
                        {statusoption.map((status) => (
                          <Option
                            key={status}
                            value={status}
                            className="w-full"
                            disabled={
                              item.status === "Thành công" &&
                              item.status !== status
                            }
                          >
                            {item.status === status ? item.status : status}
                          </Option>
                        ))}
                      </Select>
                    </p>
                  </td>
                  {/* <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="p-2 bg-[#00b5f1] block font-sans text-sm antialiased font-medium leading-normal text-[#fff] rounded-xl"
                      onClick={(e) => {
                        console.log("Selected ID:", item.patientDetails.id);
                        handlePopupDetail(item.patientDetails.id);
                      }}
                    >
                      Edit
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded mr-2"
        >
          Previous
        </button>
        <span className="py-2 px-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded ml-2"
        >
          Next
        </button>
      </div>
      {/* <div
        className={w-full h-screen ${
          popup ? "fixed" : "hidden"
        } z-20 bg-slate-400/60 top-0 right-0}
        onClick={() => handlePopupDetail()} // Đóng popup khi click vào nền
      >
        <div
          className="w-full h-full flex justify-center items-center"
           // Ngăn chặn sự kiện nổi từ vùng nội dung popup
        >
          <div className="w-2/5 h-[500px] p-4 bg-[#fff] rounded-xl shadow-lg border border-solid border-[#c2c2c2]" onClick={(e) => e.stopPropagation()}>
          <div className="w-full flex justify-end cursor-pointer hover:text-[red]" onClick={() => handlePopupDetail()}>X</div>
            <span className="text-[18px]">
              Bệnh nhân:{" "}
              <span className="text-[#00b5f1] font-medium text-[20px] capitalize">
                {appointments.map(item => {
                  if(item.patientDetails.id == selectedPatientId){
                    return item.patientDetails.account.name
                  }
                })}
              </span>
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default TabDoctorvipappointment;
