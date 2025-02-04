import React from "react";
import ImgAuth from "../../../asset/auth_img.png";
import Login from "./Login";
import Register from "./Register";
import CheckOTP from "./CheckOTP";
import { loginToken, getToken, usePopup } from "./authService";
import { useEffect, useState, memo, useContext } from "react";

function CheckEmail({ close }) {
  const [next, setNext] = useState(false);
  const [exist, setExist] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  //lấy token
  useEffect(() => {
    loginToken("admin@gmail.com", "admin");
  }, []);

  const token = getToken();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  //lấy email
  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleCheckEmail = async () => {
    if (!email) {
      setError("Email không thể để trống.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email không hợp lệ.");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:8080/api/account/find?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Lỗi khi kiểm tra email!");
      }
  
      const exists = await response.json(); // Nhận `true` hoặc `false`
      setExist(exists); // Lưu trạng thái email có tồn tại hay không
  
      if (exists) {
        console.log("Email đã tồn tại.");
        setExist(!exist);
        setNext(!next);
      } else {
        console.log("Email không tồn tại.");
        handleSendOTP();
        setLoading(!loading);
        setNext(!next);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Lỗi kết nối đến server!");
    }
  };

  
  const handleSendOTP = async () => {
    if(email){
      try{
        const response = await fetch(
          `http://localhost:8080/api/auth/send?email=${encodeURIComponent(email)}`,
          {
            method: "POST",
            headers: {
              "Authorization":`Bearer ${token}`, // Gửi token vào header
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if(data.message){
              setSuccess(data.message)
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
  }
  if (loading) {
    return <div className="flex-1 p-8 items-center justify-center flex flex-col">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  return (
    //  <div className="bg-white rounded-lg p-6 shadow-lg w-9/12 h-4/5 z-50">
    //  <div className="flex h-full items-center justify-center bg-gray-100 ">
    <div className="bg-white rounded-lg shadow-lg flex w-4/5 max-w-screen-lg overflow-hidden">
      {!next && (
        <div className="flex-1 p-8 flex  bg-white-100 flex-col">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">medcare</h1>
          <p className="mb-4 text-gray-600">Vui lòng nhập email để tiếp tục</p>
          <div className="w-full flex items-center border border-gray-300 rounded-md overflow-hidden mb-3">
            {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-2 focus:outline-none"
            />
          
          </div>
          {error && <div className="w-full flex items-center overflow-hidden mb-2">
           <p className="text-red-500 text-sm">{error}</p>
          </div>}
          {success && <div className="w-full flex items-center overflow-hidden mb-2">
           <p className="text-green-500 text-sm">{success}</p>
          </div>}
          <button className="w-full py-2 bg-blue-600 text-white rounded-md mb-4 hover:bg-blue-700" onClick={handleCheckEmail}>
            Tiếp tục
          </button>
          <div className="text-center text-gray-500 mb-4">Hoặc đăng nhập bằng tài khoản</div>
          <button className="w-full py-2 bg-red-600 text-white rounded-md mb-4 hover:bg-red-700">
            Đăng nhập với Google
          </button>
          <button className="w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900">
            Đăng nhập với Facebook
          </button>
        </div>
      )}
      {exist ? next && <Login email={email} close={close}/> : next && <CheckOTP email={email} />}


      {/* Hình ảnh bên phải */}

      <div className="hidden lg:flex flex-1 bg-gray-50 flex-col items-center justify-center relative">
        <button onClick={close} className="text-gray-500 hover:text-gray-700 h-fit w-fit absolute right-3 top-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={ImgAuth}
          alt="Illustration"
          className="w-full h-auto"
        />
        <p className="absolute bottom-8 text-center text-gray-700 italic text-lg">
          “Không còn: <br />
          <span className="line-through">xếp hàng</span> <br />
          <span className="line-through">chờ đợi</span> <br />
          Để lấy số khám bệnh”
        </p>
      </div>
    </div>
    //  </div>
    // </div>

  );
}
export default CheckEmail;