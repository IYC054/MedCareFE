import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
// import '../scss/AccountDoctor.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../components/Authentication/authService';
import { FaCrown } from "react-icons/fa";

function AccountDoctor(props) {
    const token = getToken();
    const [doctor, setdoctor] = useState([])

    useEffect(() => {
        const fetchdoctorAccounts = async () => {

            const response = await axios.get('http://localhost:8080/api/doctors', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const filtereddoctors = response.data
            setdoctor(filtereddoctors);

        };
        fetchdoctorAccounts();
    }, []);

    const navigate = useNavigate();

    const handleDetailClick = (id) => {
        navigate(`/admin/doctor/doctorDetail/${id}`);
    };
    console.log(doctor);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 10;
    // console.log("ASDSAA" + JSON.stringify(doctor[0].account.name));
    const filtereddoctors = doctor.filter(doctor =>
        doctor.account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filtereddoctors.length / doctorsPerPage);
    const displaydoctor = filtereddoctors.slice(
        (currentPage - 1) * doctorsPerPage,
        currentPage * doctorsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="tab-content">
            <div className='tool pb-10 flex justify-between '>
                <div className='place-content-center'>
                    <Link to="/admin/doctor/CreateDoctor" className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-[#da624a] border-primary rounded-md hover:bg-[#b2503c] transition"
                    >
                        Tạo tài khoản mới
                    </Link>
                </div>
                <div className='flex'>

                    <div className='input-group px-4 py-6 flex' >
                        <button className='input-group-prepend  border px-3 py-2 rounded-l-md bg-[#faeae7]'>
                            <div className='input-group-text'>
                                <i className='bi bi-search '></i>
                            </div>
                        </button>
                        <input placeholder="Tìm theo tên  ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text" className="form-control px-3 border rounded-r-md " />
                    </div>
                </div> 
            </div>
            <div className="container-fluid">
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 max-h-screen overflow-y-auto">

                    {displaydoctor.map((item, index) => (
                        <div
                            key={index}
                            className={`shadow-lg border mb-4 rounded-lg overflow-hidden 
            bg-white transition duration-300 
            ${item.vip ? "border-yellow-400 bg-yellow-100" : "border-gray-200"}
        `}
                        >
                            {/* Header với ảnh nền mờ */}
                            <div className={`relative p-6 rounded-t-lg ${item.vip ? "bg-[#4A90E2]" : "bg-[#4A90E2]"}`}>
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
                                    style={{
                                        backgroundImage: item.account?.avatar
                                            ? `url(${item.account.avatar})`
                                            : "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq89CiAzo83k2OJHzwV4hsrgE7Cm0sAWlkpw&s)"
                                    }}
                                />

                                {/* Nội dung phía trên ảnh nền */}
                                <div className="relative text-center">
                                    {/* Avatar */}
                                    <div className="relative w-16 h-16 mx-auto rounded-full border-4 border-white overflow-hidden shadow-md">
                                        <img
                                            src={item.account?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq89CiAzo83k2OJHzwV4hsrgE7Cm0sAWlkpw&s"}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Hiển thị icon vương miện nếu là VIP */}

                                    </div>
                                    {item.vip && (
                                        <FaCrown
                                            className="absolute top-1 left-14 transform -translate-x-1/3 -translate-y-1/3 text-yellow-600 drop-shadow-lg"
                                            size={24}
                                        />
                                    )}
                                    {/* Tên tài khoản */}
                                    <h5 className="text-white text-lg font-semibold mt-3"> {item.vip ? `${item.account?.name} (VIP)` : item.account?.name || "N/A"}
                                    </h5>
                                </div>
                            </div>

                            {/* Thông tin và nút */}
                            <div className="bg-white p-4 text-center">
                                <div className="flex justify-center space-x-3">
                                    <button
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-md transition duration-300"
                                        onClick={() => handleDetailClick(item.id)}
                                    >
                                        Xem thông tin
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

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

export default AccountDoctor;
