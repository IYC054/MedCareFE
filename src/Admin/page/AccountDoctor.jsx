import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
// import '../scss/AccountDoctor.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../components/Authentication/authService';


function AccountDoctor(props) {
    const token = getToken();
    const [doctor, setdoctor] = useState([])

    useEffect(() => {
        const fetchdoctorAccounts = async () => {

            const response = await axios.get('http://localhost:8080/api/account', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const filtereddoctors = response.data.result.filter(account =>
                account.role.some(r => r.name === "DOCTOR")
            );
            setdoctor(filtereddoctors);

        };
        fetchdoctorAccounts();
    }, []);
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/specialty');
                setSpecialties(response.data);
            } catch (error) {
                console.error("Error fetching specialties:", error);
            }
        };

        fetchSpecialties();
    }, []); // Fetch data once when the component mounts
    console.log(specialties);
    // Handle specialty selection
    const handleSpecialtyChange = (e) => {
        setSelectedSpecialty(e.target.value);
    };
    const navigate = useNavigate();

    const handleDetailClick = (id) => {
        navigate(`/admin/doctor/doctorDetail/${id}`);
    };
    console.log(doctor);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 10;

    const filtereddoctors = doctor.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <div className='place-content-center'>
                        <select
                            className="form-select px-5 py-3 border rounded-md"
                            value={selectedSpecialty}
                            onChange={handleSpecialtyChange}
                        >
                            <option value="">Chọn một bộ phận</option>
                            {specialties.map((specialty) => (
                                <option key={specialty.id} value={specialty.id}>
                                    {specialty.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='input-group px-4 py-6 flex' >
                        <button className='input-group-prepend  border px-3 py-2 rounded-l-md bg-[#faeae7]'>
                            <div className='input-group-text'>
                                <i className='bi bi-search '></i>
                            </div>
                        </button>
                        <input placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text" className="form-control px-3 border rounded-r-md " />
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 max-h-screen overflow-y-auto">
                    {/* Repeat for each card */}
                    {displaydoctor.map((item, index) => (
                        <div key={index} className="shadow-lg border mb-3 p-0 rounded-md z-0">
                            <div className="bg-[#da624a] p-4 rounded-t-md relative z-6">
                                <div
                                    className="absolute inset-0 bg-center bg-no-repeat opacity-25 filter grayscale"
                                    style={{
                                        backgroundImage: item.avatar ? `url(${item.avatar})` : "none",
                                    }}
                                />

                                <div className="relative z-10 text-center">
                                    <div className="inline-block mr-2">
                                        <div className="w-14 h-14 rounded-full border-4 border-white overflow-hidden">
                                            <img
                                                src={item.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s"}
                                                alt="Avatar of Tuan"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-white text-xl font-medium">{item.name}</h5>
                                    </div>
                                    <div className="flex justify-center space-x-2 mt-2" onClick={() => handleDetailClick(item.id)}>
                                        <button className="btn btn-info btn-sm text-white">View Profile</button>
                                        <button className="btn btn-warning btn-sm text-white">
                                            <i className="bi bi-gear"></i>
                                        </button>
                                    </div>
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
