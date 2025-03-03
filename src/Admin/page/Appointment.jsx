import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import AppointmentDetail from './subPage/AppointmentDetail';
import { Select } from "antd";
function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tất cả');
    const roomsPerPage = 10;

    const statusoption = ["Tất cả",  "Huỷ bỏ", "Chờ xử lý", "Hoàn thành"];
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const [appointmentsRes, vipAppointmentsRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/appointment'),
                    axios.get('http://localhost:8080/api/vip-appointments')
                ]);

                let vipAppointmentsaccount = vipAppointmentsRes.data;

                // Lọc danh sách ID bệnh nhân từ VIP appointments (chỉ lấy ID hợp lệ)
                const patientIds = [...new Set(vipAppointmentsaccount
                    .filter(item => typeof item.patient_id === "number")
                    .map(item => item.patient_id)
                )];

                // Gọi API lấy thông tin bệnh nhân theo từng ID (nếu có ID)
                const patientResponses = patientIds.length > 0
                    ? await Promise.all(patientIds.map(id => axios.get(`http://localhost:8080/api/patients/${id}`)))
                    : [];

                // Lọc danh sách ID bác sĩ từ VIP appointments
                const doctorIds = [...new Set(vipAppointmentsaccount
                    .filter(item => typeof item.doctor_id === "number")
                    .map(item => item.doctor_id)
                )];

                // Gọi API lấy thông tin bác sĩ theo từng ID (nếu có ID)
                const doctorResponses = doctorIds.length > 0
                    ? await Promise.all(doctorIds.map(id => axios.get(`http://localhost:8080/api/doctors/${id}`)))
                    : [];

                // Tạo map từ ID -> thông tin bệnh nhân
                const patientMap = {};
                patientResponses.forEach((res, index) => {
                    patientMap[patientIds[index]] = res.data;
                });

                // Tạo map từ ID -> thông tin bác sĩ
                const doctorMap = {};
                doctorResponses.forEach((res, index) => {
                    doctorMap[doctorIds[index]] = res.data;
                });

                // Chuẩn hóa dữ liệu từ API thường
                const appointments = appointmentsRes.data.map(item => ({
                    ...item,
                    workDate: item.worktime?.workDate || 'Không có dữ liệu'
                }));

                // Chuẩn hóa dữ liệu từ API VIP
                const vipAppointments = vipAppointmentsaccount.map(item => ({
                    ...item,
                    isVIP: true, // Đánh dấu VIP
                    workDate: item.workDate || 'Không có dữ liệu',
                    patient: typeof item.patient_id === "number" ? (patientMap[item.patient_id] || {}) : item.patient_id,
                    doctor: typeof item.doctor_id === "number" ? (doctorMap[item.doctor_id] || {}) : item.doctor_id
                }));

                // Gộp danh sách và sắp xếp theo ngày mới nhất
                setAppointments([...appointments, ...vipAppointments])
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
            }
        };

        fetchAppointments();
    }, []);


    console.log(appointments);
    const filteredRooms = appointments.filter((room) => {
        const matchesName = room.patient?.account?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'Tất cả' ||
            room.status === statusFilter ;
        const matchesDate = !searchDate || room.workDate === searchDate || (!searchDate && room.isVIP && room.workDate === searchDate);
        return matchesName && matchesStatus && matchesDate;
    });
    console.log("sd", filteredRooms);


    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
    const paginatedRooms = filteredRooms.slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage);
    console.log("paginatedRooms", paginatedRooms);
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handleStatusChange = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [isVIP, setIsVIP] = useState(null);
    const handleView = (roomId, isVIP) => {
        setSelectedRoomId(roomId);
        setIsVIP(isVIP);
        setShowDetail(true);
    };


    const handleClose = () => {
        setShowDetail(false);
        setSelectedRoomId(null);
    };
    console.log("Appointments:", appointments);

    const handleExportExcel = () => {
        if (filteredRooms.length === 0) {
            alert("Không có dữ liệu để xuất.");
            return;
        }


        const exportData = filteredRooms.map((room, index) => {
            const descriptions = room.patientFiles
                ? room.patientFiles
                    .filter((file) => file.appointment_id === room.id)
                    .map((file) => file.description)
                    .join(', ')
                : 'No description';

            return {
                "STT": index + 1,
                "Tên bệnh nhân": room.patient?.account?.name || 'Unknown',
                "Chuyên khoa": room.type,
                "Mô tả": descriptions || 'No description',
                // "Số tiền": room.payment[0].amount,
                "Bác sĩ": room.doctor.account.name,
                "Trạng thái": room.status,
                "Loại cuộc hẹn": room.isVIP ? "VIP" : "Thường",
            };
        });


        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "appointments");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

        saveAs(data, "appointments.xlsx");
    };
    return (
        <div className="flex">
            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Tìm bệnh nhân..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#da624a]"
                        />
                    </div>
                    <div className='gap-20'> 
                        <input
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            className="p-2 mx-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#da624a]"
                        />
                        <Select
                            value={statusFilter}
                            onChange={(value) => handleStatusChange(value)}
                            style={{ width: 200 }}
                        >
                            {statusoption.map((status, index) => (
                                <Select.Option key={index} value={status}>
                                    {status}
                                </Select.Option>
                            ))}
                        </Select>
                        <button onClick={handleExportExcel} className="mx-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded ">
                            <i className="bi bi-file-earmark-arrow-down pr-2"></i>Xuất Excel
                        </button>
                    </div>
                </div>
                <div className="max-h-screen overflow-y-auto border bg-white border-gray-300 rounded">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Bệnh nhân</th>
                                <th className="border border-gray-300 p-2">Chuyên khoa</th>
                                <th className="border border-gray-300 p-2">Ngày đặt</th>
                                <th className="border border-gray-300 p-2">Số tiền</th>
                                <th className="border border-gray-300 p-2">Trạng thái</th>
                                <th className="border border-gray-300 p-2">Loại cuộc hẹn</th>
                                <th className="border border-gray-300 p-2">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRooms.map((room) => {
                                const isVIP = room.isVIP;
                                return (
                                    <tr key={room.id} className={isVIP ? "bg-yellow-200 font-bold" : ""}>

                                        <td className="border p-2">{room.patient?.account?.name || 'Unknown'}</td>
                                        <td className="border p-2">{room.type}</td>
                                        <td className="border p-2">{room.workDate}</td>
                                        <td className="border p-2">{room.amount} VNĐ</td>
                                        <td className="border p-2">{room.status}</td>
                                        <td className="border p-2">
                                            {isVIP ? "VIP" : "Thường"}
                                        </td>
                                        <td className="border p-2">
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                onClick={() => handleView(room.id, room.isVIP)}
                                            >
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>



                    </table>
                    {showDetail && (
                        <AppointmentDetail
                            roomId={selectedRoomId}
                            isVIP={isVIP}
                            onClose={() => setShowDetail(false)}
                        />
                    )}

                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#da624a] hover:bg-[#b2503c] text-white'
                            }`}
                    >
                        Sau
                    </button>
                    <span>
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages
                            ? 'bg-gray-300'
                            : 'bg-[#da624a] hover:bg-[#b2503c] text-white'
                            }`}
                    >
                        Trước
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
