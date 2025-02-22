import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../../components/Authentication/authService";
import { useNavigate } from "react-router-dom";

function CreateAccountDoctor() {
    const token = getToken();
    const [specialties, setSpecialties] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        phone: "",
        gender: "",

        birthdate: "",
        role: "DOCTOR",
        avatar: null,
        lastFeedbackTime: "",
    });
    const [formData2, setFormData2] = useState({
        experienceYears: 0,
        status: "Hoạt động",
        vip: "",
        account: 0,
        selectedSpecialties: [],
    });
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/specialty");
                setSpecialties(response.data);
            } catch (error) {
                console.error("Error fetching specialties:", error);
            }
        };
        fetchSpecialties();
    }, []);
    console.log(specialties)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        // Cập nhật trực tiếp trong state
        setFormData2((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Lưu thông tin file vào state, bao gồm cả file object
            setFormData({
                ...formData,
                avatar: file, // File object (binary)

            });
        }
    };

    console.log()

    const handleSpecialtyChange = (id) => {
        setFormData2((prevData) => {
            // Nếu specialty đã được chọn, bỏ chọn nó
            const newSelectedSpecialties = prevData.selectedSpecialties.includes(id)
                ? prevData.selectedSpecialties.filter((specialtyId) => specialtyId !== id)
                : [...prevData.selectedSpecialties, id]; // Nếu chưa chọn, thêm nó vào

            return { ...prevData, selectedSpecialties: newSelectedSpecialties };
        });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("email", formData.email);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("birthdate", formData.birthdate);
        formDataToSend.append("role", formData.role);
        formDataToSend.append("avatar", formData.avatar);
        // Gửi tên file
        formDataToSend.append("lastFeedbackTime", null);
        console.log(formData);
        if (formData2.selectedSpecialties.length === 0) {
            setError("Vui lòng chọn ít nhất một  chuyên khoa!");
            return;
        }

        setIsLoading(true);
        setError(""); // Xóa thông báo lỗi nếu có

        try {
            // Gửi yêu cầu API đầu tiên (Tạo tài khoản)
            const response = await axios.post("http://localhost:8080/api/account", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Form Data Submitted Successfully:", response.data.result);
            const accountId = response.data.result.id;

            // Sau khi tạo tài khoản thành công, tiếp tục gọi API thứ hai (Tạo bác sĩ)
            const formDataToSend2 = {
                experienceYears: formData2.experienceYears,
                status: "Available",
                vip: formData2.vip,
                account: {
                    id: accountId
                },
                specialties: formData2.selectedSpecialties.map(id => ({ id }))
            };

            // Gửi yêu cầu API thứ hai (Tạo bác sĩ)
            const doctorResponse = await axios.post(
                "http://localhost:8080/api/doctors",
                formDataToSend2,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            // Nếu cả 2 API thành công, hiển thị thông báo thành công
            alert("Tạo thành công!");
            navigate("/admin/doctor");

        } catch (error) {
            console.error("Error submitting form:", error);

            setError(`Lỗi: ${error.response?.data?.message || error.message}`);
         
        } finally {
            setIsLoading(false); // Kết thúc trạng thái loading
        }


    };

    const navigate = useNavigate();

    return (
        <div className="max-h-full pb-3 flex " id="goup">
            <div className="w-full bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
                <form className="space-y-4 w-full sm:px-96" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold text-[#da624a]">Create Doctor Account</h3>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        />
                    </div>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Họ và Tên
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập họ và tên"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập Mật Khẩu"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                    </div>

                    {/* Gender Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                        <div className="mt-2 flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                />{" "}
                                Nam
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                />{" "}
                                Nữ
                            </label>
                        </div>
                    </div>

                    {/* Birthdate Field */}
                    <div>
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                            Ngày sinh
                        </label>
                        <input
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                    </div>

                    {/* Profile Image Upload */}
                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                            Hình chân dung
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                        {formData.avatar && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(formData.avatar)}
                                    alt="Avatar Preview"
                                    className="w-16 h-16 rounded-full"
                                />
                            </div>
                        )}
                    </div>
                    {/* Experience Years Field */}
                    <div>
                        <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">
                            Năm kinh nghiệm
                        </label>
                        <input
                            id="experienceYears"
                            name="experienceYears"
                            type="number"
                            value={formData2.experienceYears}
                            onChange={handleChange2}

                            placeholder="Nhập năm kinh nghiệm"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bác sĩ khám</label>
                        <div className="mt-2 flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    name="vip"
                                    value="true"
                                    checked={formData2.vip === true}
                                    onChange={(e) => handleChange2({ target: { name: "vip", value: e.target.value === "true" } })}
                                />{" "}
                                vip
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="vip"
                                    value="false"
                                    checked={formData2.vip === false}
                                    onChange={(e) => handleChange2({ target: { name: "vip", value: e.target.value === "true" } })}
                                />{" "}
                                thường
                            </label>

                        </div>
                    </div>
                    <div>
                        <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">
                            Chuyên khoa
                        </label>
                        {/* Specialty Selection */}
                        <div className="flex flex-wrap gap-2">
                            {specialties.map((specialty) => (
                                <div
                                    key={specialty.id}
                                    onClick={() => handleSpecialtyChange(specialty.id)} // Cập nhật với id của specialty
                                    className={`px-4 py-2 border rounded-md cursor-pointer ${formData2.selectedSpecialties.includes(specialty.id)
                                        ? "bg-[#da624a] text-white font-bold"
                                        : "bg-white text-[#da624a]"
                                        }`}
                                >
                                    {specialty.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 mb-2 p-2 border border-red-500 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}
                    {/* Submit Button */}
                    <div className="flex items-center justify-between mt-6">
                        <button type="submit" className="px-6 py-2 bg-[#da624a] text-white rounded-md " disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Tạo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAccountDoctor;
