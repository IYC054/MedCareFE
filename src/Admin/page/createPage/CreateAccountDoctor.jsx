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
        cccd: "",
        address: "",
        vip: "",
        account: 0,
        selectedSpecialties: [],
    });
    const [formData3, setFormData3] = useState({
        urlImage: null,
        doctor_files_id: 0,

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
    const handleCvImagesChange = (event) => {
        const files = Array.from(event.target.files); // Chuyển FileList thành Array
        if (files.length > 0) {
            setFormData3((prevData) => ({
                ...prevData,
                cvImages: files, // Lưu danh sách file vào state
            }));
        }
    };


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
        formDataToSend.append("lastFeedbackTime", null);

        if (formData2.selectedSpecialties.length === 0) {
            setError("Vui lòng chọn ít nhất một chuyên khoa!");
            return;
        }

        if (!formData3.cvImages || formData3.cvImages.length === 0) {
            setError("Vui lòng chọn ảnh CV!");
            return;
        }

        setIsLoading(true);
        setError("");

        let accountId = null;
        let docId = null;

        try {
            // 1️⃣ **Tạo tài khoản**
            const response = await axios.post("http://localhost:8080/api/account", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            accountId = response.data.result.id;
            console.log("✅ Tạo tài khoản thành công:", accountId);

            // 2️⃣ **Tạo bác sĩ**
            const formDataToSend2 = {
                experienceYears: formData2.experienceYears,
                status: "Hoạt động",
                vip: formData2.vip,
                cccd: formData2.cccd,
                address: formData2.address,
                account: { id: accountId },
                specialties: formData2.selectedSpecialties.map(id => ({ id }))
            };

            const doctorResponse = await axios.post("http://localhost:8080/api/doctors", formDataToSend2, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            docId = doctorResponse.data.id;
            console.log("✅ Tạo bác sĩ thành công:", docId);

            // 3️⃣ **Upload ảnh CV**
            const formDataUpload = new FormData();

            formData3.cvImages.forEach((file) => {
                formDataUpload.append("url_image", file);
                // ✅ Đúng
            });



            console.log(formData3);
            formDataUpload.append("doctorfile_id", docId);

            await axios.post("http://localhost:8080/api/cvimage", formDataUpload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("✅ Upload ảnh CV thành công");

            alert("Tạo tài khoản bác sĩ thành công!");
            navigate("/admin/doctor");
        } catch (error) {
            console.error("❌ Lỗi trong quá trình tạo:", error);
            setError(`Lỗi: ${error.response?.data?.message || error.message}`);
            // Nếu `docId` đã tạo, cần rollback xóa nó nếu API `cvimage` thất bại
            if (docId) {
                try {
                    await axios.delete(`http://localhost:8080/api/doctors/${docId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log("🛑 Đã rollback xóa bác sĩ");
                } catch (rollbackError) {
                    console.error("⚠️ Lỗi rollback bác sĩ:", rollbackError);
                }
            }
            // Nếu `accountId` đã tạo, cần rollback để xóa nó nếu API `doctor` hoặc `cvimage` thất bại
            if (accountId) {
                try {
                    await axios.delete(`http://localhost:8080/api/account/${accountId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log("🛑 Đã rollback xóa tài khoản");
                } catch (rollbackError) {
                    console.error("⚠️ Lỗi rollback tài khoản:", rollbackError);
                }
            }


        } finally {
            setIsLoading(false);
        }
    };

    console.log(formData3);
    const navigate = useNavigate();

    return (
        <div className="max-h-full pb-3 flex justify-center" id="goup">
            <div className="w-full bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
                <h3 className="text-xl font-semibold text-[#da624a] text-center mb-4">Tạo tài khoản bác sĩ</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    {/* Cột trái - Thông tin cá nhân */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Nhập email"
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" required />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
                            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Nhập họ và tên"
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Nhập mật khẩu"
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="Nhập số điện thoại"
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                            <div className="mt-2 flex gap-4">
                                <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Nam</label>
                                <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Nữ</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <input id="birthdate" name="birthdate" type="date" value={formData.birthdate} onChange={handleChange}
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input id="address" name="address" type="text" value={formData2.address} onChange={handleChange2} placeholder="Nhập địa chỉ"
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" />
                        </div>
                        <div>
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Hình chân dung</label>
                            <input id="avatar" type="file" accept="image/*" onChange={handleFileChange}
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" />
                            {formData.avatar && <img src={URL.createObjectURL(formData.avatar)} alt="Avatar Preview" className="w-16 h-16 rounded-full mt-2" />}
                        </div>
                    </div>

                    {/* Cột phải - Hình ảnh & Kinh nghiệm */}
                    <div className="space-y-4">

                        <div>
                            <label htmlFor="cvImages" className="block text-sm font-medium text-gray-700">Hình CV</label>
                            <input id="cvImages" type="file" accept="image/*" multiple
                                onChange={handleCvImagesChange}
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" />
                            {formData3.cvImages && formData3.cvImages.length > 0 && (
                                <div className="mt-2 flex gap-2 flex-wrap">
                                    {formData3.cvImages.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index + 1}`}
                                            className="w-16 h-16 rounded-md"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">Năm kinh nghiệm</label>
                            <input id="experienceYears" name="experienceYears" type="number" value={formData2.experienceYears} onChange={handleChange2} placeholder="Nhập năm kinh nghiệm"
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" />
                        </div>
                        <div>
                            <label htmlFor="cccd" className="block text-sm font-medium text-gray-700">CMND/CCCD</label>
                            <input id="cccd" name="cccd" type="number" value={formData2.cccd} onChange={handleChange2} placeholder="Nhập CCCD"
                                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bác sĩ khám</label>
                            <div className="mt-2 flex gap-4">
                                <label><input type="radio" name="vip" value="true" checked={formData2.vip === true} onChange={(e) => handleChange2({ target: { name: "vip", value: e.target.value === "true" } })} /> VIP</label>
                                <label><input type="radio" name="vip" value="false" checked={formData2.vip === false} onChange={(e) => handleChange2({ target: { name: "vip", value: e.target.value === "true" } })} /> Thường</label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Chuyên khoa</label>
                            <div className="flex flex-wrap gap-2">
                                {specialties.map((specialty) => (
                                    <div key={specialty.id} onClick={() => handleSpecialtyChange(specialty.id)}
                                        className={`px-4 py-2 border rounded-md cursor-pointer ${formData2.selectedSpecialties.includes(specialty.id) ? "bg-[#da624a] text-white font-bold" : "bg-white text-[#da624a]"}`}>
                                        {specialty.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 mb-2 p-2 border border-red-500 bg-red-100 rounded-md">
                            {error}
                        </div>
                    )}
                    <button type="submit" className="col-span-2 px-6 py-2 bg-[#da624a] text-white rounded-md" disabled={isLoading}>{isLoading ? "Đang xử lý..." : "Tạo"}</button>
                </form>
            </div>
        </div>

    );
}

export default CreateAccountDoctor;
