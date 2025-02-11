import axios from "axios";
import React, { useEffect, useState } from "react";


function AppointmentDetail({ roomId, onClose }) {
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:8080/api/appointment/${roomId}`,

                );
                setAppointmentDetails(response.data);
            } catch (error) {
                console.error("Error fetching appointment details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (roomId) {
            fetchDetails();
        }
    }, [roomId]);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white p-6 rounded shadow text-center">
                    <p className="text-gray-700 font-semibold">Loading...</p>
                </div>
            </div>
        );
    }

    if (!appointmentDetails) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div className="bg-white p-6 rounded shadow text-center">
                    <p className="text-red-600 font-semibold">Error: Could not load appointment details</p>
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
            case "Completed":
                return "bg-green-100 text-green-600";
            case "Pending":
                return "bg-yellow-100 text-yellow-600";
            case "Cancelled":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-[#da624a] mb-4 text-center">
                    Appointment Details
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
                            <p className="text-gray-600">{appointmentDetails?.amount ? `${appointmentDetails.amount} VNĐ` : "N/A"}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-700">Trạng thái:</h3>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusClass(appointmentDetails?.status)}`}>
                                {appointmentDetails?.status || "N/A"}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700">Hồ sơ bệnh nhân:</h3>
                        {appointmentDetails?.patientFiles &&
                            appointmentDetails.patientFiles.filter(file => file.appointment_id === roomId).length > 0 ? (
                            <ul className="list-disc pl-6 space-y-2">
                                {appointmentDetails.patientFiles
                                    .filter(file => file.appointment_id === roomId)
                                    .map((file) => (
                                        <li key={file.id} className="text-gray-600">
                                            <span className="font-semibold text-gray-600">{file.description}</span>
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">Không có hồ sơ bệnh nhân</p>
                        )}
                    </div>

                </div>
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 focus:outline-none"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AppointmentDetail;
