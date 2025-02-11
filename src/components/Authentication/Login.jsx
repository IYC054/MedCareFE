import React from 'react';
import { useEffect, useState, memo, useContext } from "react";
import { loginToken, getToken, logout } from "./authService";
import CheckOTP from './CheckOTP';
const Login = ({email, close}) => {
  const [password, setPassword] = useState("");
  const [next, setNext] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setForgotPass(!forgotPass);
  }, []);
  // Handle password change
  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle login logic
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (password.trim() === "") {
      // Handle error: password is empty
      alert("Please enter a password");
      return;
    }

    logout(); 
    loginToken(email, password); // Call your login function

     // Call your close function
    alert("Login successfully");
    window.location.reload();

  };

  // const token = getToken();
  const handleForgotPass = async () => {
    setForgotPass(true);
    setLoading(!setLoading);
    if(email){
      try{
        const response = await fetch(
          `http://localhost:8080/api/auth/forgot-password?email=${encodeURIComponent(email)}`,
          {
            method: "POST",
            headers: {
              // "Authorization":`Bearer ${token}`, // Gửi token vào header
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
      }
  }
  if (loading) {
    return <div className="flex-1 p-8 items-center justify-center flex flex-col mt-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
}
    return (
      <div className="flex-1">
            {!next && (
        <div className="flex-1 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">medcare</h1>
      <p className="mb-4 text-gray-600">Vui lòng đăng nhập để tiếp tục</p>
      <form> 
      <div className="flex items-center bg-gray-200 p-3 rounded-lg mb-4">
                <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 48 48">
                        <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                    </svg>
                </span>
                <span className="font-semibold text-gray-700">{email}</span>
                <input
          type="hidden"
          value={email}
        />
            </div>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
        {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
        <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="flex-1 px-4 py-2 focus:outline-none"
                onChange={handleChange}
              />
      </div>
      <button className="w-full py-2 bg-blue-600 text-white rounded-md mb-4 hover:bg-blue-700" onClick={handleLogin}>
        Đăng nhập
      </button>
      </form>
      <span className="text-[rgb(117,145,244)] text-sm cursor-pointer" onClick={handleForgotPass}>Quên mật khẩu ?</span>
      </div>)};
      {next && <CheckOTP email={email} forgotPass={forgotPass}/>}
    </div>
      );
}

export default Login;