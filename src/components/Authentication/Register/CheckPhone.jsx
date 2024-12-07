import React from "react";

function CheckPhone() {
    return (
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">MEDPRO</h1>
          <p className="mb-4 text-gray-600">Vui lòng nhập số điện thoại để tiếp tục</p>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
            <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              className="flex-1 px-4 py-2 focus:outline-none"
            />
          </div>
          <button className="w-full py-2 bg-blue-600 text-white rounded-md mb-4 hover:bg-blue-700">
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
    );
}
export default CheckPhone;