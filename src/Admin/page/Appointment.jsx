import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import AppointmentDetail from './subPage/AppointmentDetail';

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [accounts, setAccounts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const roomsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/appointment');
                setAppointments(response.data);
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
            }
        };

        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/account');
                // Map account ID to account name for quick lookup
                const accountsMap = response.data.result.reduce((acc, account) => {
                    acc[account.id] = account.name;
                    return acc;
                }, {});
                setAccounts(accountsMap);
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        fetchAppointments();
        fetchAccounts();
    }, []);
    console.log(appointments);
    const totalPages = Math.ceil(
        appointments.filter(
            (room) =>
                room.patient?.account?.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
                (statusFilter === 'All' || room.status === statusFilter) // Lọc theo trạng thái
        ).length / roomsPerPage
    );

    const filteredRooms = appointments
        .filter(
            (room) =>
                room.patient?.account?.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
                (statusFilter === 'All' || room.status === statusFilter) // Lọc theo trạng thái
        )
        .slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage); // Phân trang


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
    const handleView = (roomId) => {
        setSelectedRoomId(roomId);
        setShowDetail(true);
    };

    const handleClose = () => {
        setShowDetail(false);
        setSelectedRoomId(null);
    };
    console.log("ád", appointments);
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
                "Loại cuộc hẹn": room.type,
                "Mô tả": descriptions || 'No description',
                "Số tiền": room.amount,
                "Bác sĩ": room.doctor.account.name,
                "Trạng thái": room.status,
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
                    <input
                        type="text"
                        placeholder="Search appointments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#da624a]"
                    />
                    <div>
                        <button
                            onClick={() => handleStatusChange('All')}
                            className={`px-4 py-2 mx-1 rounded ${statusFilter === 'All' ? 'bg-[#da624a] text-white' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleStatusChange('Confirmed')}
                            className={`px-4 py-2 mx-1 rounded ${statusFilter === 'Confirmed'
                                ? 'bg-[#da624a] text-white'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        >
                            Confirmed
                        </button>
                        <button
                            onClick={() => handleStatusChange('Pending')}
                            className={`px-4 py-2 mx-1 rounded ${statusFilter === 'Pending'
                                ? 'bg-[#da624a] text-white'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        >
                            Pending
                        </button>
                    </div>
                    <button onClick={handleExportExcel} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded ">
                        <i className="bi bi-file-earmark-arrow-down pr-2"></i>Xuất Excel
                    </button>
                </div>

                <div className="max-h-screen overflow-y-auto border bg-white border-gray-300 rounded">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Bệnh nhân</th>
                                <th className="border border-gray-300 p-2">Loại cuộc hẹn</th>
                                <th className="border border-gray-300 p-2">Mô tả</th>
                                <th className="border border-gray-300 p-2">Số tiền</th>
                                <th className="border border-gray-300 p-2">Trạng thái</th>
                                <th className="border border-gray-300 p-2">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRooms.map((room) => {
                                // Lọc danh sách patientFiles theo appointment_id
                                const descriptions = room.patientFiles
                                    ? room.patientFiles
                                        .filter((file) => file.appointment_id === room.id)
                                        .map((file) => file.description)
                                        .join(', ') // Nối các mô tả bằng dấu phẩy nếu có nhiều
                                    : 'No description';

                                return (
                                    <tr key={room.id}>
                                        <td className="border border-gray-300 p-2">
                                            {room.patient?.account?.name || 'Unknown'}
                                        </td>
                                        <td className="border border-gray-300 p-2">{room.type}</td>
                                        <td className="border border-gray-300 p-2">{descriptions || 'No description'}</td>
                                        <td className="border border-gray-300 p-2">{room.amount}VNĐ</td>
                                        <td className="border border-gray-300 p-2">{room.status}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                onClick={() => handleView(room.id)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                    {showDetail && <AppointmentDetail roomId={selectedRoomId} onClose={handleClose} />}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#da624a] hover:bg-[#b2503c] text-white'
                            }`}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages
                            ? 'bg-gray-300'
                            : 'bg-[#da624a] hover:bg-[#b2503c] text-white'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
