import axios from "axios";
import React, { useEffect, useState } from "react";

function AppointmentDetail({ roomId, isVIP, onClose }) {
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const apiUrl = isVIP
                    ? `http://localhost:8080/api/vip-appointments/${roomId}`
                    : `http://localhost:8080/api/appointment/${roomId}`;

                const response = await axios.get(apiUrl);
                let appointmentData = response.data;
                console.log(appointmentData);
                if (isVIP) {
                    const { patient_id,  } = appointmentData || {};

                    // Kiểm tra nếu doctor_id tồn tại trước khi gọi API
                    if (!patient_id) {
                        throw new Error("Invalid patient_id");
                    }

                    // Gọi song song 2 API để lấy thông tin bệnh nhân và bác sĩ
                    const [patientRes] = await Promise.all([
                        axios.get(`http://localhost:8080/api/patients/${patient_id}`),
                        
                    ]);

                    // Gán thông tin vào dữ liệu cuộc hẹn
                    appointmentData = {
                        ...appointmentData,
                        patient: patientRes.data,
                       
                    };
                    console.log("da",appointmentData);
                }
                setAppointmentDetails(appointmentData);
            } catch (error) {
                console.error("Error fetching appointment details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (roomId) {
            fetchDetails();
        }
    }, [roomId, isVIP]);

  
    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white p-6 rounded shadow text-center">
                    <p className="text-gray-700 font-semibold">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!appointmentDetails) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white p-6 rounded shadow text-center">
                    <p className="text-red-600 font-semibold">Error: Không tìm thấy cuộc hẹn</p>
                    <button
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "Hoàn thành":
                return "bg-green-100 text-green-600";
            case "Chờ xử lý":
                return "bg-yellow-100 text-yellow-600";
            case "Đã huỷ":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-[#da624a] mb-4 text-center">
                    Chi tiết lịch đặt {isVIP ? "(VIP)" : ""}
                </h1>
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h3 className="font-medium text-gray-700">Bác sĩ:</h3>
                            <p className="text-gray-600">{appointmentDetails?.doctor?.account?.name || "N/A"}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Bệnh nhân:</h3>
                            <p className="text-gray-600">{appointmentDetails?.patient?.account?.name || "N/A"}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Loại cuộc hẹn:</h3>
                            <p className="text-gray-600">{appointmentDetails?.type || "N/A"}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Số tiền:</h3>
                            <p className="text-gray-600">{appointmentDetails.payments[0]?.amount ? `${appointmentDetails.payments[0]?.amount} VNĐ` : "N/A"}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Trạng thái:</h3>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusClass(appointmentDetails?.status)}`}>
                                {appointmentDetails?.status || "N/A"}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Ngày đặt:</h3>
                            <p className="text-gray-600">
                                {isVIP
                                    ? appointmentDetails?.workDate || "N/A"
                                    : appointmentDetails?.worktime?.workDate || "N/A"
                                }
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Giờ đặt:</h3>
                            <p className="text-gray-600">
                                {isVIP
                                    ? appointmentDetails?.startTime || "N/A"
                                    : appointmentDetails?.worktime?.startTime + "-" + appointmentDetails?.worktime?.endTime || "N/A"
                                }
                            </p>
                        </div>
                    </div>

                </div>
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 focus:outline-none"
                        onClick={onClose}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AppointmentDetail;
