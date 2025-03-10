import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getToken } from '../../../components/Authentication/authService';

function UserDetail() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const token = getToken();
        const fetchPatientData = async () => {
            try {
                // Kiểm tra nếu không có token


                // Fetch patient data
                const response = await axios.get(`http://localhost:8080/api/account/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const patientData = response.data;
                console.log("Patient data:", patientData);
                setPatient(patientData);
                if (patientData.id === parseInt(id)) {
                    setPatient(patientData);

                    const responseApp = await axios.get(`http://localhost:8080/api/appointment`);

                    const filteredAppointments = responseApp.data.filter(
                        (appointment) => appointment.patient.account.id === parseInt(id)
                    );
                    console.log(filteredAppointments);
                    setAppointments(filteredAppointments);

                    // Extract IDs of filtered appointments
                    const appointmentIds = filteredAppointments.map((appointment) => appointment.id);

                    if (appointmentIds.length > 0) {
                        // Fetch payment data using the appointment IDs
                        const responsePayments = await axios.get(`http://localhost:8080/api/payments`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const filteredPayments = responsePayments.data.filter((payment) =>
                            appointmentIds.includes(payment.appointment_id)
                        );
                        setPayments(filteredPayments);
                    }
                } else {
                    setError('Patient not found or mismatched account.');
                }
            } catch (error) {
                console.error("Error:", error);
                setError('Failed to fetch patient or related data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-6" id="goup">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#da624a]">Thông tin bệnh nhân</h1>
                <div className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex">
                            <div className="w-24 h-24 rounded-full overflow-hidden mr-4 border-4 border-[#da624a] shadow-lg">
                                <img
                                    src={patient?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"}
                                    alt="User Avatar"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Họ và tên đầy đủ :</label>
                                <p className="text-gray-800 mb-7">{patient?.name || 'N/A'}</p>
                                <label className="block text-gray-600 text-sm mb-2">Số điện thoại :</label>
                                <p className="text-gray-800">{patient?.phone || 'N/A'}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600 text-sm mb-2">E-mail :</label>
                            <p className="text-gray-800 mb-7">{patient?.email || 'N/A'}</p>
                            <label className="block text-gray-600 text-sm mb-2">Giới tính :</label>
                            <p className="text-gray-800">
                                {patient?.gender === "Nữ" || patient?.gender === "Nam"
                                    ? patient.gender
                                    : patient?.gender?.toLowerCase() === "female"
                                        ? "Nữ"
                                        : patient?.gender?.toLowerCase() === "male"
                                            ? "Nam"
                                            : "N/A"}
                            </p>

                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Lịch sử giao dịch</h2>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead className="top-0 sticky z-10">
                                <tr className="bg-gray-50">
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">STT</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Mã giao dịch</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Ngày</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Phương thức thanh toán</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Trạng thái</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-gray-700">{item.transactionCode || 'N/A'}</td>
                                            <td className="px-4 py-2 text-gray-700">
                                                {new Date(item.transactionDate).toLocaleString('vi-VN', {
                                                    timeZone: 'Asia/Ho_Chi_Minh',
                                                    hour12: false, // Nếu bạn muốn dùng định dạng 24h
                                                }) || 'N/A'}
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">{item.transactionDescription || 'N/A'}</td>
                                            <td className="px-4 py-2 text-gray-700">{item.amount || 'N/A'}₫</td>
                                            <td className="px-4 py-2 text-gray-700">{item.status || 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                                            No transaction data.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
