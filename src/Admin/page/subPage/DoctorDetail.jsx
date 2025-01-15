import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import token from '../../../api/token';

function DoctorDetail() {
    const { id } = useParams(); // Lấy ID bác sĩ từ URL
    const [doctor, setDoctor] = useState(null);
    const [patientFile, setPatientFile] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                // Lấy danh sách bác sĩ
                const response = await axios.get('http://localhost:8080/api/doctors');
                const doctorData = response.data.find(doc => doc.account.id === parseInt(id));

                if (doctorData) {
                    setDoctor(doctorData);


                    // Lấy danh sách bệnh nhân
                    const patientfileResponse = await axios.get('http://localhost:8080/api/patientsfile');
                    const patientsForDoctor = patientfileResponse.data.filter(
                        pa => pa.patients.doctor.account.id === parseInt(id)
                    );
                    setPatientFile(patientsForDoctor);
                } else {
                    console.error("Doctor not found for ID:", id);
                }
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [id]);
    console.log(doctor)

    if (loading) {
        return <div className="text-center text-gray-600 mt-10">Loading data...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6" id="goup">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Doctor Details Section */}
                <h1 className="text-3xl font-extrabold mb-6 text-[#da624a] text-center">Doctor Information</h1>
                <div className="mb-6 flex items-center gap-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#da624a] shadow-lg">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s" alt="Doctor Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        {doctor ? (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                    Dr. {doctor.account.name}
                                </h2>
                                <p className="text-gray-600 text-lg mb-2">
                                    <span className="font-medium">Email:</span> {doctor.account.email}
                                </p>
                                <p className="text-gray-600 text-lg mb-2">
                                    <span className="font-medium">Phone:</span> {doctor.account.phone}
                                </p>
                                <p className="text-gray-600 text-lg mb-2">
                                    <span className="font-medium">Gender:</span> {doctor.account.gender}
                                </p>
                                <p className="text-gray-600 text-lg mb-2">
                                    <span className="font-medium">Experience Years:</span> {doctor.experienceYears}
                                </p>

                                <p className="text-gray-600 text-lg">
                                    <span className="font-medium">Specialty:</span>
                                    {doctor.specialties.length > 0 ? (
                                        doctor.specialties.map((specialty, index) => (
                                            <span key={specialty.id}>
                                                {specialty.name}
                                                {index < doctor.specialties.length - 1 && ', '}
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

                {/* Patient History Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Patient History</h2>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead className="sticky top-0 z-10">
                                <tr className="bg-gray-50">
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">No.</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Patient Name</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Price</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Prescription</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Images</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientFile.length > 0 ? (
                                    patientFile.map((patient, index) => (
                                        <tr key={index} className="bg-gray-50 border-b">
                                            <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-gray-700">{patient.patients.account.name}</td>
                                            <td className="px-4 py-2 text-gray-700">{patient.totalPrice} VNĐ</td>
                                            <td className="px-4 py-2 text-gray-700">{patient.prescription}</td>
                                            <td className="px-4 py-2 text-gray-700">
                                                {patient.patients.imageUrl ? (
                                                    <img src={patient.patients.imageUrl} alt="Patient" className="w-12 h-12 rounded" />
                                                ) : (
                                                    <span>No image</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                                            No patient history available.
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

export default DoctorDetail;
