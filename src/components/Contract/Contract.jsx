import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../Authentication/authService";

function Contract() {
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    const token = getToken();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/sendmail/other", {
                message: message,
                sender_email: email,
                phone: phone,
                fullname: fullname,
                status: "OTHER",
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPhone("")
            setMessage("")
            setFullname("")
            setEmail("")
            alert("Gửi thành công!");
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu", error);
            alert("Gửi thất bại!");
        }
    };

    return (
        <div className="bg-gray-100 py-10 px-5">
            <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
                {/* Left Section */}
                <div>
                    <h2 className="text-2xl font-bold text-blue-600">
                        Hợp tác với chúng tôi
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Medpro rất hân hạnh được hợp tác cùng các cơ sở y tế, các quý bác sĩ để tiếp cận hàng triệu bệnh nhân trên nền tảng Medpro.
                    </p>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Thông tin chi tiết</h3>
                        <p className="mt-2 text-gray-700">
                            <strong>MEDPRO - ĐẶT LỊCH KHÁM BỆNH</strong>
                            <br /> 236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TP.HCM.
                            <br /> <strong>HỖ TRỢ ĐẶT KHÁM:</strong> 1900 2115
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium">Họ và tên <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                name="fullname"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Email <span className="text-red-600">*</span></label>
                            <input
                                type="email"
                                name="sender_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Số điện thoại <span className="text-red-600">*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Ghi chú <span className="text-red-600">*</span></label>
                            <textarea
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập ghi chú"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                            onClick={handleSubmit}
                        >
                            Đăng ký ngay
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contract;
