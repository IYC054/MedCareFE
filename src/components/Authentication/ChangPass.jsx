import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginToken, getToken } from "./authService";
import Login from "./Login";
const schema = yup.object().shape({
  password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Mật khẩu không được để trống"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu nhập lại không khớp").required("Vui lòng nhập lại mật khẩu"),
});

function ChangePass({ email, forgotPass }) {
  // const token = getToken();
  const [backToLogin, setBackToLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const handleOnSubmit = async (data) => {
    const formData = {
      email: email,
      newPassword: data.password
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`, // Gửi token vào header
        },
        body: JSON.stringify(formData),  // Chuyển đổi object thành JSON
      });
      const result = await response.json();
      setBackToLogin(!backToLogin);
      console.log("Kết quả:", result);
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
    }
  };

  return (
    <div >
      {!backToLogin && (
        <div className="flex-1 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-2">medcare</h1>
      <p className="mb-4 text-gray-600">Vui lòng nhập đầy đủ thông tin để đăng kí</p>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
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
        {/* Các input */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-2">
        <input type="password" placeholder="Nhập mật khẩu" className="flex-1 px-4 py-2 focus:outline-none" {...register("password")} />
        </div>
        <div className="w-full flex items-center overflow-hidden mb-1">
        <p className="text-red-500">{errors.password?.message}</p>
        </div>

        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-2">
        <input type="password" placeholder="Nhập lại mật khẩu" className="flex-1 px-4 py-2 focus:outline-none" {...register("confirmPassword")} />
        </div>
        <div className="w-full flex items-center overflow-hidden mb-1">
        <p className="text-red-500">{errors.confirmPassword?.message}</p>
        </div>

        {/* Button submit */}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Hoàn tất đăng ký
        </button>
      </form>
      </div>
      )}
      {backToLogin && <Login email={email}/>}
    </div>

    
  );
}

export default ChangePass;
