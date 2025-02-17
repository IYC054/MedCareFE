import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../../components/Authentication/authService';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
function DoctorDetail() {
    const { id } = useParams(); // Lấy ID bác sĩ từ URL
    const [doctor, setDoctor] = useState(null);
    const [patientFile, setPatientFile] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);

    // Chuyển shift thành startTime & endTime
    const shiftTimes = {
        morning: { startTime: "08:00:00", endTime: "12:00:00" },
        afternoon: { startTime: "13:00:00", endTime: "16:00:00" },
        both: [
            { startTime: "08:00:00", endTime: "12:00:00" },
            { startTime: "13:00:00", endTime: "16:00:00" },
        ],
    };

    // Khi chọn ca làm việc
    const handleShiftSelect = (shift) => {
        setSelectedShift(shift);
    };

    // Khi chọn ngày làm việc


    const handleDateChange = (dates) => {
        let formattedDates = [];

        if (Array.isArray(dates)) {
            // Nếu dates là một mảng, xử lý từng ngày trong mảng
            formattedDates = dates.map(date => format(date, "yyyy-MM-dd"));
        } else if (dates instanceof Date) {
            // Nếu dates là một ngày đơn lẻ, định dạng nó
            formattedDates = [format(dates, "yyyy-MM-dd")];
        } else {
            console.error("Invalid date format", dates);
        }

        console.log("Formatted Dates:", formattedDates);
        setSelectedDates(formattedDates);
    };

    // Tạo danh sách lịch làm việc để gửi API
    const handleSaveSchedule = () => {
        if (!selectedShift || selectedDates.length === 0) {
            alert("Vui lòng chọn ca làm việc và ngày làm!");
            return;
        }

        const workSchedule = []; // Khởi tạo mảng workSchedule

        selectedDates.forEach((date) => {
            if (selectedShift === "both") {
                shiftTimes.both.forEach((shift) => {
                    workSchedule.push({
                        workDate: date, 
                        startTime: shift.startTime,
                        endTime: shift.endTime,
                        doctor_id: id,
                    });
                });
            } else {
                workSchedule.push({
                    workDate: date, // Sử dụng date đã định dạng
                    startTime: shiftTimes[selectedShift].startTime,
                    endTime: shiftTimes[selectedShift].endTime,
                    doctor_id: id,
                });
            }
        });

        console.log("Lịch làm việc gửi API:", workSchedule);
        // TODO: Gọi API lưu dữ liệu vào hệ thống
        setIsOpen(false);
    };


    const token = getToken();
    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                // Lấy danh sách bác sĩ
                const response = await axios.get('http://localhost:8080/api/doctors');
                const doctorData = response.data.find(doc => doc.account.id === parseInt(id));
                if (doctorData) {
                    setDoctor(doctorData);
                    const patientfileResponse = await axios.get('http://localhost:8080/api/patientsfile');
                    const patientsForDoctor = patientfileResponse.data.filter(
                        pa => pa.doctor_id === parseInt(id)
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
    console.log(doctor);
    console.log("patientFile", patientFile);
    if (loading) {
        return <div className="text-center text-gray-600 mt-10">Loading data...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6 relative" id="goup" >
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Doctor Details Section */}
                <h1 className="text-3xl font-extrabold mb-6 text-[#da624a] text-center">Doctor Information</h1>
                <div className="w-60 flex items-center justify-center px-2 py-2 mb-4 text-base font-medium text-white bg-[#da624a] border-primary rounded-md hover:bg-[#b2503c] transition"
                    onClick={() => setIsOpen(true)}  >
                    Tạo giờ làm
                </div>
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
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-[500px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center">Thiết lập giờ làm</h2>

                        {/* Chọn ca làm việc */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2 text-lg">Chọn ca làm việc:</label>
                            <div className="flex gap-3 justify-center">
                                {["morning", "afternoon", "both"].map((shift) => {
                                    const shiftLabel = {
                                        morning: "Ca sáng (08:00 - 12:00)",
                                        afternoon: "Ca chiều (13:00 - 16:00)",
                                        both: "Cả 2 ca",
                                    }[shift];

                                    const isSelected = selectedShift === shift;

                                    return (
                                        <button
                                            key={shift}
                                            className={`px-5 py-3 text-lg font-medium rounded-md transition ${isSelected
                                                ? "bg-[#da624a] text-white"
                                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                                }`}
                                            onClick={() => handleShiftSelect(shift)}
                                        >
                                            {shiftLabel}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Chọn ngày làm việc */}
                        {selectedShift && (
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2 text-lg">Chọn ngày làm việc:</label>
                                <div className="border p-4 rounded-md bg-gray-100">
                                    <DatePicker
                                        selected={null}
                                        onChange={handleDateChange}
                                        highlightDates={selectedDates}
                                        inline
                                        multiple
                                        minDate={new Date()} // Chỉ cho phép chọn từ ngày hôm nay trở đi
                                    />

                                </div>
                            </div>
                        )}

                        {/* Nút lưu */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                className="bg-gray-500 text-white px-5 py-3 rounded-md text-lg hover:bg-gray-600"
                                onClick={() => setIsOpen(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-blue-500 text-white px-5 py-3 rounded-md text-lg hover:bg-blue-600"
                                onClick={handleSaveSchedule}
                            >
                                Lưu lịch làm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DoctorDetail;
