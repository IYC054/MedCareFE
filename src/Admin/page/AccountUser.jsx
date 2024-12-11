import React, { useState } from 'react';

function AccountUser() {
    const [users] = useState([
        { id: 1, name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'Active' },
        { id: 2, name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0987654321', status: 'Inactive' },
        { id: 3, name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'Active' },
        { id: 4, name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0987654321', status: 'Inactive' },
        { id: 5, name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'Active' },
        { id: 2, name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0987654321', status: 'Inactive' },

        { id: 6, name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'Active' },
        { id: 7, name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0987654321', status: 'Inactive' },
        { id: 8, name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'Active' },
        { id: 9, name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0987654321', status: 'Inactive' },
        { id: 10, name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'Active' },
        { id: 11, name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0987654321', status: 'Inactive' },

        { id: 12, name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'Active' },
        { id: 13, name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0987654321', status: 'Inactive' },
        { id: 14, name: 'Nguyen Van A', email: 'nguyenvana@example.com', phone: '0123456789', status: 'Active' },
        { id: 15, name: 'Tran Thi B', email: 'tranthib@example.com', phone: '0987654321', status: 'Inactive' },

        // Add more users as needed
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#da624a]">User Management</h1>
                <div className="mb-4 w-60">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-[#da624a]"
                    />
                </div>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="sticky top-0 z-10 bg-[#da624a] text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Phone</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedUsers.map((user, index) => (
                                <tr key={user.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                    <td className="border px-4 py-2">{(currentPage - 1) * usersPerPage + index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.phone}</td>
                                    <td className={`border px-4 py-2 ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{user.status}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-[#da624a] text-white px-4 py-2 rounded shadow hover:bg-[#c75240] transition">Detail</button>
                                        <button className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 ml-2 transition">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 mx-1 rounded shadow ${page === currentPage ? 'bg-[#da624a] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                } transition`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AccountUser;
