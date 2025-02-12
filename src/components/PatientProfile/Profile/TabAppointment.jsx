import React, { useContext, useEffect, useState } from "react";
import { FaHandHoldingMedical, FaHospital } from "react-icons/fa";
import { FaKitMedical } from "react-icons/fa6";
import loading from "../../../../asset/loading.gif";
import { getpatientbyaccountid } from "../../../api/Doctor/patient";
import { getAppointmentByPatientId } from "../../../api/Doctor/appointment";
import { getallPaymentByAppoint } from "../../../api/Bank/payment";
import { AppContext } from "../../Context/AppProvider";

function TabAppointment(props) {
  const [patient, setPatient] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [dataPayment, setDataPayment] = useState([]);
  const { User } = useContext(AppContext);
  useEffect(() => {
    const getPatient = async () => {
      try {
        const result = await getpatientbyaccountid(User?.id);
        const resultAppointment = await getAppointmentByPatientId(result[0].id);
        setAppointment(resultAppointment);

        const allPayments = await Promise.all(
          resultAppointment.map(async (appointment) => {
            const paymentData = await getallPaymentByAppoint(appointment.id);
            return paymentData;
          })
        );
        setDataPayment(allPayments.flat());
        setPatient(result);
      } catch (error) {
        // console.log("Error fetching patient by account ID:", error);
      }
    };
    getPatient();
  }, []);

  return (
    <div className="w-full h-full border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">Danh sách phiếu khám bệnh</span>
      {appointment.map((app, index) => {
        // console.log("Appointment: " + JSON.stringify(app.doctor.specialties))
        const resultcode = dataPayment.filter(
          (payment) => payment.appointment_id === app.id
        );
        var statuspayment = resultcode
          .map((payment) => {
            if (payment.status === "Chờ xử lý") {
              return "Chờ xử lý";
            } else if (payment.status === "Hoàn thành") {
              return "Hoàn thành";
            } else if (payment.status === "Hoàn tiền") {
              return "Hoàn tiền";
            }
          })
          .find((status) => status !== undefined);
        return (
          <div
            className="w-full bg-[#fff] border-solid border border-[#c2c2c2]/50 rounded-lg p-4 my-4"
            key={index}
          >
            <div className="flex justify-between">
              <span className="text-[15px]">
                Mã phiếu:{" "}
                <span className="text-[18px] font-medium">
                  {resultcode.length > 0 ? resultcode[0].transactionCode : ""}
                </span>
              </span>
              <div>
                <button
                  className={`px-4 py-2 ${
                    statuspayment == "Hoàn thành"
                      ? "bg-[#03C03C]"
                      : statuspayment == "Chờ xử lý"
                      ? "bg-[#F1C40F]"
                      : statuspayment == "Hoàn tiền"
                      ? "bg-[#C0392B]"
                      : ""
                  } rounded-xl text-[#fff] font-medium`}
                >
                  {statuspayment}
                </button>
              </div>
            </div>
            <div className="w-full">
              <span className="text-[20px] font-semibold">Thanh Phong</span>
            </div>
            <hr className="h-[2px] mt-4 border-0 border-t-2 border-dashed border-[#00b5f1]" />
            <div className="w-full my-4">
              <div className="flex items-center text-[#00b5f1] gap-4 text-[24px]">
                <FaHospital className="text-[25px] " />
                <span className="uppercase">Bệnh viện chợ rẫy</span>
              </div>
              <div className="flex items-center gap-4 text-[15px] my-2">
                <div className="flex items-center gap-4">
                  <FaKitMedical className="text-[18px] text-[#F1C40F]" />
                  <span>Chuyên khoa: </span>
                </div>
                <span>{app.type}</span>
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
      })}
    </div>
  );
}

export default TabAppointment;
