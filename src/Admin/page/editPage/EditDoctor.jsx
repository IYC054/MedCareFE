import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../../components/Authentication/authService";
import { useNavigate, useParams } from "react-router-dom";

function EditDoctor() {
  const { id } = useParams(); // Lấy id bác sĩ từ URL
  const token = getToken();
  const navigate = useNavigate();

  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State thông tin tài khoản (account)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "123123", 
    phone: "",
    gender: "",
    birthdate: "",
    role: "DOCTOR",
    avatar: null,
    lastFeedbackTime: "",
  });

  // State thông tin bác sĩ (doctor)
  const [formData2, setFormData2] = useState({
    experienceYears: 0,
    status: "Hoạt động",
    cccd: "",
    address: "",
    vip: "",
    account: 0,
    selectedSpecialties: [],
  });

  // State cho ảnh CV (nhiều file)
  const [formData3, setFormData3] = useState({
    cvImages: [],
    doctor_files_id: 0,
  });

  // Lấy danh sách chuyên khoa và thông tin bác sĩ theo id
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/specialty");
        setSpecialties(response.data);
      } catch (err) {
        console.error("Error fetching specialties:", err);
      }
    };

    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/doctors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const doctor = response.data;
       
        setFormData({
          email: doctor.account.email,
          name: doctor.account.name,
          password: "123123", 
          phone: doctor.account.phone,
          gender: doctor.account.gender,
          birthdate: doctor.account.birthdate,
          role: "DOCTOR",
          avatar: null,
          lastFeedbackTime: doctor.account.lastFeedbackTime,
        });
        setFormData2({
          experienceYears: doctor.experienceYears,
          status: doctor.status,
          cccd: doctor.cccd,
          address: doctor.address,
          vip: doctor.vip,
          account: doctor.account.id,
          selectedSpecialties: doctor.specialties.map((s) => s.id),
        });
      } catch (err) {
        console.error("Error fetching doctor info:", err);
        setError("Không thể lấy thông tin bác sĩ.");
      }
    };

    fetchSpecialties();
    fetchDoctorInfo();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  const handleCvImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData3((prev) => ({ ...prev, cvImages: files }));
    }
  };

  const handleSpecialtyChange = (idSpecialty) => {
    setFormData2((prev) => {
      const newSelectedSpecialties = prev.selectedSpecialties.includes(idSpecialty)
        ? prev.selectedSpecialties.filter((s) => s !== idSpecialty)
        : [...prev.selectedSpecialties, idSpecialty];
      return { ...prev, selectedSpecialties: newSelectedSpecialties };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu chưa chọn chuyên khoa hoặc ảnh CV
    if (formData2.selectedSpecialties.length === 0) {
      setError("Vui lòng chọn ít nhất một chuyên khoa!");
      return;
    }


    setIsLoading(true);
    setError("");

    try {
      // 1️⃣ Cập nhật thông tin tài khoản (account)
      const accountFormData = new FormData();
      accountFormData.append("email", formData.email);
      accountFormData.append("name", formData.name);
      if (formData.password) accountFormData.append("password", formData.password);
      accountFormData.append("phone", formData.phone);
      accountFormData.append("gender", formData.gender);
      accountFormData.append("birthdate", formData.birthdate);
      accountFormData.append("role", formData.role);
      if (formData.avatar) accountFormData.append("avatar", formData.avatar);
      accountFormData.append("lastFeedbackTime", null);
      await axios.put(
        `http://localhost:8080/api/account/${formData2.account}`,
        accountFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 2️⃣ Cập nhật thông tin bác sĩ
      const doctorData = {
        experienceYears: formData2.experienceYears,
        status: formData2.status,
        vip: formData2.vip,
        cccd: formData2.cccd,
        address: formData2.address,
        account: { id: formData2.account },
        specialties: formData2.selectedSpecialties.map((id) => ({ id })),
      };

      await axios.put(`http://localhost:8080/api/doctors/${id}`, doctorData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // 3️⃣ Cập nhật ảnh CV (upload nhiều file)
    //   const cvFormData = new FormData();
    //   formData3.cvImages.forEach((file) => {
    //     cvFormData.append("url_image", file);
    //   });
    //   cvFormData.append("doctorfile_id", id);

    //   await axios.post("http://localhost:8080/api/cvimage", cvFormData, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

      alert("Cập nhật thông tin bác sĩ thành công!");
      navigate(`/admin/doctor/doctorDetail/${id}`);
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      setError(`Lỗi: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-full pb-3 flex justify-center" id="goup">
      <div className="w-full bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
        <h3 className="text-xl font-semibold text-[#da624a] text-center mb-4">Chỉnh sửa tài khoản bác sĩ</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Cột trái - Thông tin cá nhân */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                required
                readOnly
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
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
            <div className="hidden">
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
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Ngày sinh</label>
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData2.address}
                onChange={handleChange2}
                placeholder="Nhập địa chỉ"
                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
              />
            </div>
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Hình chân dung</label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
              />
              {formData.avatar ? (
                <img
                  src={URL.createObjectURL(formData.avatar)}
                  alt="Avatar Preview"
                  className="w-16 h-16 rounded-full mt-2"
                />
              ) : (
                <p className="mt-2 text-sm text-gray-500">Không có hình mới, giữ hình hiện tại.</p>
              )}
            </div>
          </div>

          {/* Cột phải - Hình ảnh & Kinh nghiệm */}
          <div className="space-y-4">
            {/* <div>
              <label htmlFor="cvImages" className="block text-sm font-medium text-gray-700">Hình CV</label>
              <input
                id="cvImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleCvImagesChange}
                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
              />
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
            </div> */}
            <div>
              <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">Năm kinh nghiệm</label>
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
              <label htmlFor="cccd" className="block text-sm font-medium text-gray-700">CMND/CCCD</label>
              <input
                id="cccd"
                name="cccd"
                type="text"
                value={formData2.cccd}
                onChange={handleChange2}
                placeholder="Nhập CCCD"
                className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
              />
            </div>
            <div className="hidden">
              <label className="block text-sm font-medium text-gray-700">Bác sĩ khám</label>
              <div className="mt-2 flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="vip"
                    value="true"
                    checked={formData2.vip === true || formData2.vip === "true"}
                    onChange={(e) =>
                      handleChange2({ target: { name: "vip", value: e.target.value === "true" } })
                    }
                  />{" "}
                  VIP
                </label>
                <label>
                  <input
                    type="radio"
                    name="vip"
                    value="false"
                    checked={formData2.vip === false || formData2.vip === "false"}
                    onChange={(e) =>
                      handleChange2({ target: { name: "vip", value: e.target.value === "true" } })
                    }
                  />{" "}
                  Thường
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Chuyên khoa</label>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <div
                    key={specialty.id}
                    onClick={() => handleSpecialtyChange(specialty.id)}
                    className={`px-4 py-2 border rounded-md cursor-pointer ${
                      formData2.selectedSpecialties.includes(specialty.id)
                        ? "bg-[#da624a] text-white font-bold"
                        : "bg-white text-[#da624a]"
                    }`}
                  >
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
          <button type="submit" className="col-span-2 px-6 py-2 bg-[#da624a] text-white rounded-md" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Cập nhật"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDoctor;
