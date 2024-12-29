import React from 'react';
import { useEffect, useState, memo, useContext } from "react";
const Login = () => {
    return (
        <div className="flex-1 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">medpro</h1>
      <p className="mb-4 text-gray-600">Vui lòng nhập email để tiếp tục</p>
      <form>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
        {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
        <input
          type="text"
          placeholder="Nhập email"
          className="flex-1 px-4 py-2 focus:outline-none"
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
        {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
        <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="flex-1 px-4 py-2 focus:outline-none"
              />
      </div>
      <button className="w-full py-2 bg-blue-600 text-white rounded-md mb-4 hover:bg-blue-700" >
        Đăng nhập
      </button>
      </form>
      <span className="text-[rgb(117,145,244)] text-sm cursor-pointer">Quên mật khẩu ?</span>
    </div>
      );
}

export default Login;