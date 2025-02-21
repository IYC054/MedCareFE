import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../../components/Authentication/authService";
import { useNavigate } from "react-router-dom";

function CreatePatientFile() {
    const [formData, setFormData] = useState({
        fullname: "",
        birthdate: "",
        phone: "",
        gender: "Nam",
        nation: "",
        address: "",
        identification_card: "",
        accountid: 10,
    });

    const [message, setMessage] = useState("");

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Kiểm tra CCCD trong database
    const checkCCCDExists = async (identification_card) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/patientsprofile/card?identification_card=${identification_card}`);
            return response.data; // true nếu CCCD đã tồn tại, false nếu chưa có
        } catch (error) {
            console.error("Lỗi kiểm tra CCCD:", error);
            return true; // Giả sử có lỗi thì không cho tạo mới
        }
    };
    const token = getToken();
    const navigate = useNavigate();
    // Gửi form sau khi kiểm tra CCCD
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // Kiểm tra CCCD trước khi thêm
        const isExists = await checkCCCDExists(formData.identification_card);
        if (isExists) {
            setMessage("CCCD này đã tồn tại trong hệ thống!");
            return;
        }

        // Nếu CCCD chưa có, tiến hành gửi request POST
        try {
            const response = await axios.post(
                "http://localhost:8080/api/patientsprofile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json", // Đảm bảo gửi JSON
                    }
                }
                , formData);
            setMessage("Thêm bệnh nhân thành công!");

            setFormData({
                fullname: "",
                birthdate: "",
                phone: "",
                gender: "Nam",
                nation: "",
                address: "",
                identification_card: "",
                accountid: 10,
            });
            navigate("/admin/patientfileAdmin");
        } catch (error) {
            setMessage("Lỗi khi thêm bệnh nhân. Vui lòng thử lại!");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4 text-[#da624a]">Thêm Hồ Sơ Bệnh Nhân</h2>
            {message && <p className={`text-center font-semibold ${message.includes("thành công") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Họ và tên" className="w-full p-2 border border-gray-300 rounded" required />

                <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />

                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" className="w-full p-2 border border-gray-300 rounded" required />

                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>

                <input type="text" name="nation" value={formData.nation} onChange={handleChange} placeholder="Dân tộc" className="w-full p-2 border border-gray-300 rounded" required />

                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ" className="w-full p-2 border border-gray-300 rounded" required />
                <input
                    type="text"
                    name="identification_card"
                    value={formData.identification_card}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Kiểm tra chỉ nhập số & giới hạn 12 số
                        if (/^\d{0,12}$/.test(value)) {
                            handleChange(e);
                        }
                    }}
                    onBlur={() => {
                        if (formData.identification_card.length !== 12) {
                            alert("CCCD phải có đúng 12 số!");
                        }
                    }}
                    placeholder="CMND/CCCD"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    maxLength={12} // Giới hạn độ dài tối đa
                />


                <button type="submit" className="w-full bg-[#da624a] text-white p-2 rounded-lg hover:bg-[#923624]">Thêm Bệnh Nhân</button>
            </form>
        </div>
    );
}

export default CreatePatientFile;
