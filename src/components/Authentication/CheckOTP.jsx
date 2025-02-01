import React from "react";
import ImgAuth from "../../../asset/auth_img.png";
import Login from "./Login";
import Register from "./Register";
import { useEffect, useState, memo, useContext, useRef } from "react";

function CheckOTP({ email }) {
    const [nextPassword, setNextPassword] = useState(false);
    const [dataPost, setDataPost] = useState(false);
    const [second, setSecond] = useState(60);
    const [loading, setLoading] = useState(false);
    const [Otpagain, setOtpagain] = useState(false);
    const [checkOtp, setCheckOtp] = useState(false);

    const [next, setNext] = useState(false);
    const handleOtpSubmit = () => {
        setLoading(true);
        setNextPassword(!nextPassword);
    };

    const handleNext = () => {
        setNext(true);
    };

    const handelSendOtpAgain = () => {
        setOtpagain(!Otpagain);
        setLoading(true);
        setSecond(60);
    };

    useEffect(() => {
        if (second > 0) {
            const timer = setInterval(() => {
                setSecond((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [second]);

    const inputRefs = useRef([]);
    const [otpValues, setOtpValues] = useState(new Array(6).fill(""));

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === "") {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);

            if (value.length === 1 && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();  // Chuyển sang ô tiếp theo nếu có dữ liệu
            } else if (value.length === 0 && index > 0) {
                inputRefs.current[index - 1].focus();  // Quay lại ô trước nếu xóa dữ liệu
            }
        }
    };

    const otpNumber = String(otpValues.join(""));
    console.log(otpNumber);
    return (
        <div className="flex-1">
            {!next && (
        <div className="flex-1 p-8  flex flex-col">
            {/* <div className="flex flex-col items-center justify-center h-screen bg-white-100 p-4"> */}
            <h1 className="text-4xl font-bold text-blue-700 mb-3">medpro</h1>
            <h2 className="mt-2 text-lg font-semibold">XIN CHÀO!</h2>
            <p className="text-gray-600 ">
                Vui lòng nhập mã 6 số đã gửi cho bạn qua email
            </p>
            <div className="flex items-center justify-center bg-gray-200 p-3 rounded-lg mt-4">
                <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 48 48">
                        <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                    </svg>
                </span>
                <span className="font-semibold text-gray-700">{email}</span>
            </div>
            <div className="mt-4 flex gap-4 items-center justify-center">
                {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="tel"
                        inputMode="numeric"
                        maxLength="1"
                        autoComplete="off"
                        className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={otpValues[index]}
                        onChange={(e) => handleChange(e, index)}
                    />
                ))}
            </div>

            <div className="flex items-center justify-center">
            <button className="mt-6 w-48 h-12  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={handleNext}>
                Xác thực
            </button>
            </div>
            <div className="flex items-center justify-center">
            <p className="mt-4 text-sm text-gray-600">
                Bạn không nhận được mã xác nhận?{" "}
                <span className="text-blue-500 cursor-pointer">Gửi lại</span>
            </p>
            </div>
            </div>
        )}
            
            {next && <Register email={email}/> }
        </div>
    );
}

export default CheckOTP;