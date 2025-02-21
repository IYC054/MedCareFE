import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../components/Authentication/authService';


function AccountUser() {
    const [user, setUser] = useState([])
    const token = getToken();
    useEffect(() => {
        const fetchUserAccounts = async () => {

            const response = await axios.get('http://localhost:8080/api/account', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const filteredUsers = response.data.result.filter(account =>
                account.role.some(r => r.name === "PATIENTS")
            );
            setUser(filteredUsers);

        };
        fetchUserAccounts();
    }, []);
    const navigate = useNavigate();
    console.log(user.role);
    const handleDetailClick = (id) => {
        navigate(`/admin/user/userDetail/${id}`);
    };
    console.log(user);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const filteredUsers = user.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const displayuser = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#da624a]">Quản lý người dùng</h1>
                <div className="mb-4 w-60">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên..."
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
                                <th className="px-4 py-2 text-left">Tên</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Điện thoại</th>
                                <th className="px-4 py-2 text-left">Giới tính</th>
                                <th className="px-4 py-2 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayuser.map((user, index) => (
                                <tr key={user.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                    <td className="border px-4 py-2">{(currentPage - 1) * usersPerPage + index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.phone}</td>
                                    <td className='border px-4 py-2'>{user.gender}</td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-[#da624a] text-white px-4 py-2 rounded shadow hover:bg-[#c75240] transition" onClick={() => handleDetailClick(user.id)}>Chi tiết</button>
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
