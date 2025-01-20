import React, { useEffect, useState } from "react";
import { getAppointmentByDoctorId } from "../../../api/Doctor/appointment";
import { getpatientbyid } from "../../../api/Doctor/patient";
import { getallPaymentByAppoint } from "../../../api/Bank/payment";

function TabDoctorwithpatient() {
  const [appointments, setAppointments] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointmentByDoctorId(1);
        if (data && data.length > 0) {
          const enrichedAppointments = await Promise.all(
            data.map(async (appointment) => {
              const [patientDetails, paymentDetails] = await Promise.all([
                getpatientbyid(appointment.patient.id),
                getallPaymentByAppoint(appointment.id),
              ]);
              return { ...appointment, patientDetails, paymentDetails };
            })
          );
          setAppointments(enrichedAppointments);
          console.log("App" + JSON.stringify(appointments));
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);
  const handlePopupDetail = (id = null) => {
    if (id) {
      setSelectedPatientId(id);
      setPopup(true);
    } else {
      setSelectedPatientId(null);
      setPopup(false);
    }
  };
  return (
    <div className="w-full h-full  border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">Quản lý bệnh nhân </span>
      <div
        className=" p-2 bg-[#00b5f1] text-[#fff] rounded-lg"
        style={{ width: "fit-content" }}
      >
        Bạn đã khám 100 bệnh nhân
      </div>
    </div>
  );
}

export default TabDoctorwithpatient;
