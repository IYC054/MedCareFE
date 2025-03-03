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
    const [imageFile, setImageFile] = useState(null);
    const [isFetched, setIsFetched] = useState(false); // Kiểm tra dữ liệu có từ API chưa

    const navigate = useNavigate();
    const token = getToken();

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Kiểm tra CCCD đã tồn tại hay chưa
    const checkCCCDExists = async (identification_card) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/patientsprofile/card?identification_card=${identification_card}`);
            return response.data; // true nếu CCCD đã tồn tại
        } catch (error) {
            console.error("Lỗi kiểm tra CCCD:", error);
            return true;
        }
    };

    // Xử lý tải ảnh và gửi lên API FPT.AI
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(
                "https://api.fpt.ai/vision/idr/vnm",
                formData,
                {
                    headers: {
                        "api-key": "rYp5PIAiFN7HaFoeQzp2m4SIHyJFvbVD",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const data = response.data.data[0]; // Lấy thông tin đầu tiên từ API
            console.log("Dữ liệu từ API:", data);

            // Cập nhật state với dữ liệu từ API
            setFormData({
                fullname: data.name || "",
                birthdate: data.dob ? data.dob.split("/").reverse().join("-") : "", // Chuyển ngày từ dd/mm/yyyy -> yyyy-mm-dd
                phone: "",
                gender: data.sex === "NAM" ? "Nam" : "Nữ",
                nation: "",
                address: data.address || "",
                identification_card: data.id || "",
                accountid: 10,
            });

            setIsFetched(true); // Đánh dấu đã lấy dữ liệu
        } catch (error) {
            console.error("Lỗi khi gửi ảnh:", error);
            setMessage("Không thể nhận diện CMND/CCCD. Vui lòng thử lại!");
        }
    };

    // Gửi form sau khi kiểm tra CCCD
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (formData.identification_card.length !== 12 || isNaN(formData.identification_card)) {
            setMessage("CCCD phải có đúng 12 số!");
            return;
        }
        // Kiểm tra CCCD trước khi thêm
        const isExists = await checkCCCDExists(formData.identification_card);
        if (isExists) {
            setMessage("CCCD này đã tồn tại trong hệ thống!");
            return;
        }

        // Nếu CCCD chưa có, tiến hành gửi request POST
        try {
            await axios.post(
                "http://localhost:8080/api/patientsprofile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setMessage("Thêm bệnh nhân thành công!");
            navigate("/admin/patientfileAdmin");
        } catch (error) {
            setMessage("Lỗi khi thêm bệnh nhân. Vui lòng thử lại!");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-4 text-[#da624a]">Thêm Hồ Sơ Bệnh Nhân</h2>

            {message && <p className={`text-center font-semibold ${message.includes("thành công") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

            <div className="pb-2">
                <label className="block font-medium text-gray-700">Tải ảnh CMND/CCCD</label>
                <input type="file" accept="image/*" onChange={handleUploadImage} className="w-full p-2 border border-gray-300 rounded" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">Họ và tên</label>
                    <input type="text" name="fullname" placeholder="Nhập họ và tên" value={formData.fullname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isFetched} />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Ngày sinh</label>
                    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isFetched} />
                </div>


                <div>
                    <label className="block font-medium text-gray-700">CMND/CCCD</label>
                    <input
                        type="text"
                        placeholder="Nhập CCCD"
                        name="identification_card"
                        value={formData.identification_card}
                        onChange={handleChange}
                      
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        disabled={isFetched && formData.identification_card !== ""} // Chỉ disable nếu CCCD có dữ liệu từ API
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Giới tính</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" disabled={isFetched}>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Số điện thoại</label>
                    <input type="text" name="phone" placeholder="Nhập số điện thoại" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Dân tộc</label>
                    <input type="text" placeholder="Nhập Dân tộc" name="nation" value={formData.nation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Địa chỉ</label>
                    <input type="text" placeholder="Nhập Địa chỉ" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isFetched} />
                </div>



                <button type="submit" className="w-full bg-[#da624a] text-white p-2 rounded-lg hover:bg-[#923624]">Thêm hồ sơ</button>
            </form>
        </div>
    );
}

export default CreatePatientFile;
