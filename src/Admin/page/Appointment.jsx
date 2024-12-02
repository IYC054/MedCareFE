import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Appointment() {
    const rooms = Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        name: `Room ${index + 1}`
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const roomsPerPage = 10;
    const totalPages = Math.ceil(rooms.length / roomsPerPage);
    const startIndex = (currentPage - 1) * roomsPerPage;
    const currentRooms = rooms
        .filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(startIndex, startIndex + roomsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 p-4 bg-gray-100 border-r border-gray-300">
                <h2 className="text-lg font-bold mb-4">Actions</h2>
                <ul className="space-y-2 flex flex-col items-center">
                    <li>
                        <Link to="/admin/appointment/createApp"
                            className="bg-[#da624a] text-white px-6 py-2 rounded hover:bg-[#b2503c] flex items-center justify-center"
                           
                        >
                            Create Room
                        </Link>
                    </li>
                   
                </ul>

            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search rooms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#da624a]"
                    />

                </div>

                <div className="max-h-96 overflow-y-auto border border-gray-300 rounded">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Room Name</th>
                                <th className="border border-gray-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRooms.map((room) => (
                                <tr key={room.id}>
                                    <td className="border border-gray-300 p-2">{room.name}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                            Edit
                                        </button>
                                        <button className="bg-green-500 text-white px-3 py-1 ml-2 rounded hover:bg-green-600">
                                            Add Doctor
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#da624a] hover:bg-[#b2503c] text-white'}`}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#da624a] hover:bg-[#b2503c] text-white'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
