import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import token from '../../../api/token';

function UserDetail() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                // Fetch patient data
                const response = await axios.get(`http://localhost:8080/api/account/${id}`);
                const patientData = response.data;
                console.log(patientData);
                if (patientData && patientData.id === parseInt(id)) {
                    setPatient(patientData);

                    // Fetch all appointments
                    const responseApp = await axios.get(`http://localhost:8080/api/appointment`);   
                
                    const filteredAppointments = responseApp.data.filter(
                        (appointment) => appointment.patient.account.id === parseInt(id)
                    );
               
                    setAppointments(filteredAppointments);

                    // Extract IDs of filtered appointments
                    const appointmentIds = filteredAppointments.map((appointment) => appointment.id);

                    if (appointmentIds.length > 0) {
                        // Fetch payment data using the appointment IDs
                        const responsePayments = await axios.get(`http://localhost:8080/api/payments`);
                        const filteredPayments = responsePayments.data.filter((payment) =>
                            appointmentIds.includes(payment.appointment_id)
                        );
                        setPayments(filteredPayments);
                    }
                } else {
                    setError('Patient not found or mismatched account.');
                }
            } catch (err) {
                setError('Failed to fetch patient or related data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    console.log("App", appointments);
    console.log("pay", payments);

    return (
        <div className="bg-gray-100 min-h-screen p-6" id="goup">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#da624a]">Thông tin bệnh nhân
</h1>
                <div className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex">
                            <div className="w-24 h-24 rounded-full overflow-hidden mr-4 border-4 border-[#da624a] shadow-lg">
                                <img
                                    src={patient.avatar || "https://via.placeholder.com/96"}
                                    alt="User Avatar"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Họ và tên đầy đủ
                                :</label>
                                <p className="text-gray-800 mb-7">{patient.name || 'N/A'}</p>
                                <label className="block text-gray-600 text-sm mb-2">Số điện thoại
                                :</label>
                                <p className="text-gray-800">{patient.phone || 'N/A'}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600 text-sm mb-2">E-mail
                            :</label>
                            <p className="text-gray-800 mb-7">{patient.email || 'N/A'}</p>
                            <label className="block text-gray-600 text-sm mb-2">Địa chỉ
                            :</label>
                            <p className="text-gray-800">{patient.address || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Lịch sử giao dịch
</h2>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead className="top-0 sticky z-10">
                                <tr className="bg-gray-50">
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">STT</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Mã giao dịch	</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Ngày</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Phương thức thanh toán	</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Trạng thái
                                    </th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-gray-700">{item.transactionCode || 'N/A'}</td>
                                            <td className="px-4 py-2 text-gray-700">{item.transactionDate || 'N/A'}</td>
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
