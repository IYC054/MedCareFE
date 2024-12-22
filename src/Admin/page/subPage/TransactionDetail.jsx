import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TransactionDetail() {
    const { id } = useParams();
    const [tran, setTran] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch transaction data
                const tranResponse = await axios.get(`http://localhost:8080/api/payments/${id}`);
                const transactionData = tranResponse.data;

                if (!transactionData) {
                    throw new Error("Transaction not found.");
                }

                setTran(transactionData);

                // Fetch appointment if transaction data is valid
                const appointmentResponse = await axios.get(`http://localhost:8080/api/appointment/${transactionData.appointment_id}`);
                const appointmentData = appointmentResponse.data;

                if (!appointmentData || appointmentData.id !== transactionData.appointment_id) {
                    throw new Error("Appointment not found or mismatched.");
                }
                console.log(appointment);
                setAppointment(appointmentData.patient.account_id);

                // Fetch patient information using the account ID from appointment
                const patientResponse = await axios.get(`http://localhost:8080/api/account/${appointmentData.patient.account_id}`);
                const patientData = patientResponse.data;
              

                setPatient(patientData);
                console.log(patient);
              
            } catch (err) {
                setError(err.message || "An error occurred while fetching data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // Dependency on transaction ID

    // Loader while fetching data
    if (loading) {
        return <div>Loading transaction details...</div>;
    }

    // Error display
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tran) {
        return <div>Transaction not found.</div>;
    }

    // If everything is fetched successfully
    return (
        <div className="w-full bg-white py-4 px-4 rounded-md shadow-sm">
            <div className="flex content-center justify-between">
                {/* Left Section */}
                <div className="px-4">
                    <span className="text-2xl font-bold">Transaction Details</span>
                    <div className="py-2 w-full">
                        <div className="flex text-gray-500 py-2">
                            <span className="min-w-[250px]">Transaction Code :</span>
                            <span className="text-gray-900 font-medium">{tran.transactionCode || "N/A"}</span>
                        </div>
                        <div className="flex text-gray-500">
                            <span className="min-w-[250px]">Payer:</span>
                            <span className="text-gray-900 font-medium">{patient.name || "N/A"}</span>
                        </div>
                        <div className="flex text-gray-500">
                            <span className="min-w-[250px]">Phone:</span>
                            <span className="text-gray-900 font-medium">{patient.phone || "N/A"}</span>
                        </div>
                        <div className="flex text-gray-500">
                            <span className="min-w-[250px]">Time :</span>
                            <span className="text-gray-900 font-medium">{new Date(tran.transactionDate).toLocaleString()}</span>
                        </div>
                        <div className="flex text-gray-500 py-2">
                            <span className="min-w-[250px]">Status :</span>
                            <span className={`px-2 py-1 rounded text-sm ${tran.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{tran.status}</span>
                        </div>
                        <div className="flex text-gray-500">
                            <span className="min-w-[250px]">Description :</span>
                            <span className="text-gray-900 font-medium">{tran.transactionDescription || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <div className="py-2 w-full">
                        <div className="bg-[#fef4fa] content-center align-center p-10 mr-20 rounded-md shadow-lg">
                            <div className="flex justify-center">
                                <span className="text-2xl font-bold border-gray-300">
                                    Transaction Overview
                                </span>
                            </div>
                            <div className="border-t-2 border-dashed border-[#da624a] my-2"></div>

                            <div className="flex text-gray-500">
                                <span className="min-w-[250px]">Transaction Code :</span>
                                <span className="text-gray-900 font-medium">{tran.transactionCode}</span>
                            </div>

                            <div className="flex text-gray-500">
                                <span className="min-w-[250px]">Amount :</span>
                                <span className="text-gray-900 font-medium break-words">{tran.amount} VNĐ</span>
                            </div>

                            <div className="flex text-gray-500">
                                <span className="min-w-[250px]">Payment Method :</span>
                                <span className="text-gray-900 font-medium">{tran.paymentMethod || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionDetail;
