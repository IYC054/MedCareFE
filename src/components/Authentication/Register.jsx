import React from "react";
import ImgAuth from "../../../asset/auth_img.png";
import Login from "./Login";
import { useEffect, useState, memo, useContext } from "react";

function Register({email}) {
    return (
        <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">medpro</h1>
        <p className="mb-4 text-gray-600">Vui lòng nhập đầy đủ thông tin để đăng kí</p>
        <form>
        <div className="flex items-center bg-gray-200 p-3 rounded-lg mb-6">
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
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-6">
          {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
          <input
            type="text"
            placeholder="Nhập họ và tên"
            className="flex-1 px-4 py-2 focus:outline-none"
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-6">
          {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
          <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="flex-1 px-4 py-2 focus:outline-none"
                />
        </div>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-6">
          {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
          <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="flex-1 px-4 py-2 focus:outline-none"
                />
        </div>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-6">
          {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
          <input
                  type="password"
                  placeholder="Nhập mã giới thiệu (nếu có)"
                  className="flex-1 px-4 py-2 focus:outline-none"
                />
        </div>
        <button className="w-full py-2 bg-blue-600 text-white rounded-md mb-4 hover:bg-blue-700" >
          Hoàn tất đăng ký
        </button>
        </form>
      </div>
    );
}
export default Register;
