import React from "react";
import Register from "./Register";
import { getToken } from "./authService";
import { useEffect, useState, memo, useContext, useRef } from "react";
import ChangePass from "./ChangPass";

function CheckOTP({ email, forgotPass}) {

    // const token = getToken();

    const [nextPassword, setNextPassword] = useState(false);
    const [second, setSecond] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [next, setNext] = useState(false);

    const inputRefs = useRef([]);
    const [otpValues, setOtpValues] = useState(new Array(6).fill(""));

    //lấy otp
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
    //nối otp
    const otpNumber = String(otpValues.join(""));
    console.log(otpNumber);

    //xu ly xac thuc otp
    const handleOtpSubmit = async () => {
        setLoading(true);
        setNextPassword(!nextPassword);
        if(otpNumber != null){
            try{
              const response = await fetch(
                `http://localhost:8080/api/auth/verify?otp=${otpNumber}&email=${email}`,
                {
                  method: "POST",
                  headers: {
                    // "Authorization":`Bearer ${token}`, // Gửi token vào header
                    "Content-Type": "application/json",
                  }
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  if(data.message){
                    setSuccess(data.message)
                    setNext(data.success);
                  }
                })
                .catch((error) => {
                  setError(error.message)
                });
                //goi api xong het xoay
                setLoading(false);
                if (!response.ok) {
                  // Nếu HTTP status không OK, lấy lỗi dưới dạng text trước
                  const errorText = await response.text();
                  throw new Error(`HTTP ${response.status}: ${errorText}`);
                }
            
                // Nếu có nội dung, lấy JSON
                const data = await response.json();
                console.log("OTP response:", data)
      
            }catch (error){
              console.error("Error fetching:", error);
            }
            }
    };


    //xu ly gui lai otp
    const handelSendOtpAgain = async () => {
        setLoading(true);
        if(forgotPass){
            try{
                const response = await fetch(
                  `http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(email)}`,
                  {
                    method: "POST",
                    headers: {
                    //   "Authorization":`Bearer ${token}`, // Gửi token vào header
                      "Content-Type": "application/json",
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    if(data.message){
                      setSuccess(data.message)
                      setNext(!next)
                    }
                  })
                  .catch((error) => {
                    setError(error.message)
                  });
                  //goi api xong het xoay
                  setLoading(false);
                  if (!response.ok) {
                    // Nếu HTTP status không OK, lấy lỗi dưới dạng text trước
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                  }
              
                  // Nếu có nội dung, lấy JSON
                  const data = await response.json();
                  console.log("OTP response:", data)
        
              }catch (error){
                console.error("Error fetching:", error);
              }
        }else{
        try {
            const response = await fetch(
                `http://localhost:8080/api/auth/send?email=${encodeURIComponent(email)}`,
                {
                    method: "POST",
                    headers: {
                        // "Authorization": `Bearer ${token}`, // Gửi token vào header
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.message) {
                        setSuccess(data.message)
                    }
                })
                .catch((error) => {
                    setError(error.message)
                });
            //fetch api xong het xoay
            setLoading(false);

            // Nếu có nội dung, lấy JSON
            const data = await response.json();
            console.log("OTP response:", data)

        } catch (error) {
            console.error("Error fetching:", error);
        }
    }
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

   

    

    if (loading) {
        return <div className="flex-1 p-8 items-center justify-center flex flex-col mt-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }
    return (
        <div className="flex-1">
            {!next && (
                <div className="flex-1 p-8 flex flex-col">
                    {/* <div className="flex flex-col items-center justify-center h-screen bg-white-100 p-4"> */}
                    <h1 className="text-4xl font-bold text-blue-700 mb-3">medcare</h1>
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
                    <div className="flex">
                        {error && <div className="w-full flex items-center overflow-hidden mb-2">
                            <p className="text-red-500 text-sm">{error}</p>
                        </div>}
                        {success && <div className="w-full flex items-center overflow-hidden mb-2">
                            <p className="text-green-500 text-sm">{success}</p>
                        </div>}
                    </div>

                    <div className="flex items-center justify-center">
                        <button className="mt-6 w-48 h-12  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={handleOtpSubmit}>
                            Xác thực
                        </button>
                    </div>
                    {second === 0 && (
                        <div className="flex items-center justify-center">
                            <p className="mt-4 text-sm text-gray-600">
                                Bạn không nhận được mã xác nhận?{" "}
                                <a className="text-blue-500 cursor-pointer" onClick={handelSendOtpAgain}>Gửi lại</a>
                            </p>
                        </div>
                    )}
                    {second >= 1 && (
                        <div className="flex items-center justify-center">
                            {/* <p className="mt-4 text-sm text-gray-600">
                                Gửi lại mã OTP sau{" "}
                                <span className="text-blue-500">  00:{second} s</span>
                            </p> */}
                            <p className="mt-4 text-sm text-gray-600">Gửi lại mã OTP sau{" "}<span className="text-blue-500">00:{second.toString().padStart(2, '0')}s</span></p>
                        </div>
                    )}
                </div>
            )}

            {forgotPass? next && <ChangePass email={email} forgotPass={forgotPass}/> : next && <Register email={email} />}
        </div>
    );
}

export default CheckOTP;