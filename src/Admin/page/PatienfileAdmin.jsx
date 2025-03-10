import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../components/Authentication/authService";
import { Link } from "react-router-dom";

function PatientProfileAdmin() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const token = getToken();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/patientsprofile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patient profiles:", error);
            }
        };

        fetchPatients();
    }, []);

    // Lọc danh sách theo tìm kiếm
    const filteredPatients = patients?.filter((patient) =>
        patient?.fullname?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    ) || [];

    // Tính toán số trang
    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

    // Lấy danh sách bệnh nhân dựa trên trang hiện tại
    const paginatedPatients = filteredPatients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Xử lý chuyển trang
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="place-content-center">
                <Link to="/admin/profileadmin/create" className="w-[250px] flex items-center justify-center mb-5 px-4 py-2 text-base font-medium text-white bg-[#da624a] border-primary rounded-md hover:bg-[#b2503c] transition">
                    Tạo hồ sơ cho bệnh nhân
                </Link>
            </div>

            {/* Tiêu đề và ô tìm kiếm */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Danh sách hồ sơ bệnh nhân</h2>
                <input
                    type="text"
                    placeholder="Tìm kiếm tên..."
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Bảng hiển thị bệnh nhân */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3">Họ Tên</th>
                            <th className="p-3">Ngày sinh</th>
                            <th className="p-3">Giới Tính</th>
                            <th className="p-3">Số Điện Thoại</th>
                            <th className="p-3">Địa Chỉ</th>
                            <th className="p-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPatients.length > 0 ? (
                            paginatedPatients.map((patient) => (
                                <tr key={patient.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{patient.fullname}</td>
                                    <td className="p-3">
                                        {patient.birthdate}
                                    </td>
                                    <td className='border px-4 py-2'>
                                        {patient.gender === "Nữ" || patient.gender === "Nam"
                                            ? patient.gender
                                            : patient.gender?.toLowerCase() === "female"
                                                ? "Nữ"
                                                : patient.gender?.toLowerCase() === "male"
                                                    ? "Nam"
                                                    : patient.gender}
                                    </td>

                                    <td className="p-3">{patient.phone}</td>
                                    <td className="p-3">{patient.address}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-md transition duration-300"
                                            onClick={() => setSelectedPatient(patient)}
                                        >
                                            Xem Chi Tiết
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-500">
                                    Không tìm thấy hồ sơ bệnh nhân nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal hiển thị thông tin chi tiết */}
            {selectedPatient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-xl font-semibold mb-4">Thông tin chi tiết</h3>
                        <p><strong>Họ tên:</strong> {selectedPatient.fullname}</p>
                        <p><strong>Ngày sinh:</strong> {selectedPatient.birthdate}</p>
                        <p><strong>Giới tính:</strong> {selectedPatient.gender}</p>
                        <p><strong>Số điện thoại:</strong> {selectedPatient.phone}</p>
                        <p><strong>Địa chỉ:</strong> {selectedPatient.address}</p>
                        {/* <p><strong>Mã CCCD:</strong> {selectedPatient.identificationCard}</p> */}
                        <p><strong>Dân tộc:</strong> {selectedPatient.nation}</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow-md transition duration-300"
                                onClick={() => setSelectedPatient(null)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Phân trang */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#da624a] hover:bg-[#b2503c] text-white'}`}
                >
                    Trước
                </button>
                <span>
                    Trang {currentPage} / {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#da624a] hover:bg-[#b2503c] text-white'}`}
                >
                    Sau
                </button>
            </div>
        </div>
    );
}

export default PatientProfileAdmin;
