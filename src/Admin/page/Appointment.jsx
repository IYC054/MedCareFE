import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import AppointmentDetail from './subPage/AppointmentDetail';
import { Select } from "antd";
import { constrainPoint } from '@fullcalendar/core/internal';
function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tất cả');
    const roomsPerPage = 10;

    const statusoption = ["Tất cả", "Đã huỷ", "Chờ xử lý", "Hoàn thành"];
    const [activeTab, setActiveTab] = useState("normal"); // 'normal' hoặc 'vip'

    useEffect(() => {
        fetchAppointments();
    }, [activeTab]); // Gọi lại API khi activeTab thay đổi

    const fetchAppointments = async () => {
        try {
            const apiUrl =
                activeTab === "vip"
                    ? "http://localhost:8080/api/vip-appointments"
                    : "http://localhost:8080/api/appointment";

            const response = await axios.get(apiUrl);

            let fetchedAppointments = response.data;

            if (activeTab === "vip") {
                // Xử lý dữ liệu VIP
                const patientIds = [
                    ...new Set(
                        fetchedAppointments
                            .filter((item) => typeof item.patient_id === "number")
                            .map((item) => item.patient_id)
                    ),
                ];

                const doctorIds = [
                    ...new Set(
                        fetchedAppointments
                            .filter((item) => typeof item.doctor_id === "number")
                            .map((item) => item.doctor_id)
                    ),
                ];

                const patientResponses =
                    patientIds.length > 0
                        ? await Promise.all(
                            patientIds.map((id) =>
                                axios.get(`http://localhost:8080/api/patients/${id}`)
                            )
                        )
                        : [];

                const doctorResponses =
                    doctorIds.length > 0
                        ? await Promise.all(
                            doctorIds.map((id) =>
                                axios.get(`http://localhost:8080/api/doctors/${id}`)
                            )
                        )
                        : [];
                const patientMap = {};
                patientResponses.forEach((res, index) => {
                    patientMap[patientIds[index]] = res.data;
                });
                const doctorMap = {};
                doctorResponses.forEach((res, index) => {
                    doctorMap[doctorIds[index]] = res.data;
                });
                fetchedAppointments = fetchedAppointments.map((item) => ({
                    ...item,
                    isVIP: true,
                    workDate: item.workDate || "Không có dữ liệu",
                    patient: typeof item.patient_id === "number" ? patientMap[item.patient_id] || {} : item.patient_id,
                    doctor: typeof item.doctor_id === "number" ? doctorMap[item.doctor_id] || {} : item.doctor_id,
                }));
            } else {
                // Đối với khám thường, lấy `worktime.workDate`
                fetchedAppointments = fetchedAppointments.map((item) => ({
                    ...item,
                    workDate: item.worktime?.workDate || "Không có dữ liệu",
                    isVIP: false
                }));
            }
            setAppointments(fetchedAppointments);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        }
    };


    const filteredRooms = appointments.filter((room) => {
        const matchesName = room.patient?.account?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'Tất cả' ||
            room.status === statusFilter;
        const matchesDate = !searchDate || room.workDate === searchDate || (!searchDate && room.isVIP && room.workDate === searchDate);
        return matchesName && matchesStatus && matchesDate;
    });
    console.log(appointments);


    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
    const paginatedRooms = filteredRooms.slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage);

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
        console.log(roomId);
    };


    const handleClose = () => {
        setShowDetail(false);
        setSelectedRoomId(null);
    };


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
                "Số tiền": room.payment[0]?.amount,
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
                    <div >
                        <button
                            onClick={() => setActiveTab("normal")}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 mx-4 
                                    ${activeTab === "normal"
                                    ? "bg-[#da624a] text-white shadow-lg"
                                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"}
                                `}
                        >
                            Khám Thường
                        </button>
                        <button
                            onClick={() => setActiveTab("vip")}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 
                             ${activeTab === "vip"
                                    ? "bg-yellow-500 text-white shadow-lg"
                                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"}
                              `}
                        >
                            Khám VIP
                        </button>
                    </div>


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
                                        <td className="border p-2">{room.payments[0]?.amount} VND </td>
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
