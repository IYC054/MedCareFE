import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import token from '../../api/token';
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
                room.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (statusFilter === 'All' || room.status === statusFilter)
        ).length / roomsPerPage
    );

    const filteredRooms = appointments
        .filter(
            (room) =>
                room.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (statusFilter === 'All' || room.status === statusFilter)
        )
        .slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage);

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
                            className={`px-4 py-2 mx-1 rounded ${
                                statusFilter === 'All' ? 'bg-[#da624a] text-white' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleStatusChange('Confirmed')}
                            className={`px-4 py-2 mx-1 rounded ${
                                statusFilter === 'Confirmed'
                                    ? 'bg-[#da624a] text-white'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        >
                            Confirmed
                        </button>
                        <button
                            onClick={() => handleStatusChange('Pending')}
                            className={`px-4 py-2 mx-1 rounded ${
                                statusFilter === 'Pending'
                                    ? 'bg-[#da624a] text-white'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        >
                            Pending
                        </button>
                    </div>
                </div>

                <div className="max-h-screen overflow-y-auto border bg-white border-gray-300 rounded">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Bệnh nhân</th>
                                <th className="border border-gray-300 p-2">Loại cuộc hẹn</th>
                                <th className="border border-gray-300 p-2">Mô tả</th>
                                <th className="border border-gray-300 p-2">Trạng thái</th>
                                <th className="border border-gray-300 p-2">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRooms.map((room) => (
                                <tr key={room.id}>
                                    <td className="border border-gray-300 p-2">
                                        {room.patient.account.name || 'Unknown'} 
                                    </td>
                                    <td className="border border-gray-300 p-2">{room.type}</td>
                                    <td className="border border-gray-300 p-2">{room.patient.descriptions}</td>
                                    <td className="border border-gray-300 p-2">{room.status}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                              onClick={() => handleView(room.id)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showDetail && <AppointmentDetail roomId={selectedRoomId} onClose={handleClose} />}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${
                            currentPage === 1 ? 'bg-gray-300' : 'bg-[#da624a] hover:bg-[#b2503c] text-white'
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
                        className={`px-4 py-2 rounded ${
                            currentPage === totalPages
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
