import React, { Fragment, useContext, useEffect, useState } from "react";
import { FaHandHoldingMedical, FaHospital } from "react-icons/fa";
import { FaKitMedical } from "react-icons/fa6";
import loading from "../../../../asset/loading.gif";
import { getpatientbyaccountid } from "../../../api/Doctor/patient";
import { getAppointmentByPatientId,getAppointmentByIdUser } from "../../../api/Doctor/appointment";
import { getallPaymentByAppoint } from "../../../api/Bank/payment";
import { AppContext } from "../../Context/AppProvider";
import { Link } from "react-router-dom";

function TabAppointment(props) {
  const [appointment, setAppointment] = useState([]);
  const [appointmentAcc, setAppointmentAcc] = useState([]);
  const { User } = useContext(AppContext);
  useEffect(() => {
    const getPatient = async () => {
      try {
        const result = await getpatientbyaccountid(User?.id);

        const resultAppointment = await getAppointmentByPatientId(
          result[0]?.id
        );
        setAppointment(resultAppointment);
        const getappointmentAcc = await getAppointmentByIdUser(User?.id);
        setAppointmentAcc(getappointmentAcc);
       
      } catch (error) {
       
      }
    };
    getPatient();
  }, []);
  console.log("dss",appointment);
  console.log("nghị lo",appointmentAcc);
  return (
    <div className="w-full h-full border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">Danh sách phiếu khám bệnh</span>
      {appointment.length > 0 ? (
        appointment.map((app, index) => {
          return (
            <div
              className="w-full bg-[#fff] border-solid border border-[#c2c2c2]/50 rounded-lg p-4 my-4"
              key={index}
            >
              <div className="flex justify-between">
                <span className="text-[15px]">
                  Mã phiếu:{" "}
                  <span className="text-[18px] font-medium">
                    {app.transactionCode}
                  </span>
                </span>
                <div>
                  <button
                    className={`px-4 py-2 ${
                      app.status == "Đã thanh toán"
                        ? "bg-[#03C03C]"
                        : app.status == "Chưa thanh toán"
                        ? "bg-[#F1C40F]"
                       // : app.status == "Hoàn tiền"
                     //   ? "bg-[#C0392B]"
                       // : app.status == "Chưa thanh toán"
                       // ? "bg-[#F1C40F]"
                        : ""
                    } rounded-xl text-[#fff] font-medium`}
                  >
                    {app.status}
                  </button>
                </div>
              </div>
              <div className="w-full">
                <p className="text-[20px] ">- Họ và tên:  {appointmentAcc[index]?.patientprofile?.fullname}</p>
                <p className="text-[20px] ">- Ngày sinh:  {appointmentAcc[index]?.patientprofile?.birthdate}</p>
                <p className="text-[20px] ">- Số BHYT:  {appointmentAcc[index]?.patientprofile?.codeBhyt}</p>
                <p className="text-[20px] ">- Bác Sĩ Khám:  {appointmentAcc[index]?.doctor?.account?.name}</p>
              </div>
              <hr className="h-[2px] mt-4 border-0 border-t-2 border-dashed border-[#00b5f1]" />
              <div className="w-full my-4">
                <div className="flex items-center text-[#00b5f1] gap-4 text-[24px]">
                  <FaHospital className="text-[25px] " />
                  <span className="uppercase">Bệnh viện MEDCARE</span>
                </div>
                <div className="flex items-center gap-4 text-[15px] my-2">
                  <div className="flex items-center gap-4">
                    <FaKitMedical className="text-[18px] text-[#F1C40F]" />

                    <span>Chuyên khoa: </span>
                  </div>
                  <span>
                    {app.appointmentType != null
                      ? app.appointmentType
                      : app.vipAppointmentType}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[15px] my-2">
                  <div className="flex items-center gap-4">
                    <FaHandHoldingMedical className="text-[18px] text-[#F1C40F]" />
                    <span>Dịch vụ: </span>
                  </div>
                  <span>Khám tại bệnh viện</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Fragment>
          <Link to={"/hospital"}>
          <div className="flex justify-center items-center w-full">
            <button className="w-full py-4 mt-20 text-[#fff] text-[20px] font-semibold rounded-xl border-[#00b5f1] bg-gradient-to-r from-[#00b5f1] to-[#00e0ff]">
              Bạn chưa có lịch khám bấm vào để đặt lịch
            </button>
          </div></Link>
        </Fragment>
      )}
    </div>
  );
}

export default TabAppointment;
