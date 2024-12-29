import React from "react";
import ImgAuth from "../../../asset/auth_img.png";

function CheckPhone({close}) {
  return (
    //  <div className="bg-white rounded-lg p-6 shadow-lg w-9/12 h-4/5 z-50">
    //  <div className="flex h-full items-center justify-center bg-gray-100 ">
      <div className="bg-white rounded-lg shadow-lg flex w-4/5 max-w-screen-lg overflow-hidden">
     
        {/* Form bên trái */}
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">medpro</h1>
          <p className="mb-4 text-gray-600">Vui lòng nhập email để tiếp tục</p>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
            {/* <span className="px-3 bg-gray-100 text-gray-700">🇻🇳 +84</span> */}
            <input
              type="text"
              placeholder="Nhập email"
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
export default CheckPhone;