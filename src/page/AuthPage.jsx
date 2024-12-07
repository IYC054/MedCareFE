import React from "react";
import CheckPhone from "../components/Authentication/Register/CheckPhone";
import ImgAuth from "../../asset/auth_img.png";
function AuthPage() {
  return (
    <div className="items-center justify-center bg-gray-100">
      <div className="h-screen bg-white flex max-w-screen-2xl overflow-hiddenorigin-top">
        {/* Form bên trái */}
        <CheckPhone/>

        {/* Hình ảnh bên phải */}
        <div className="hidden lg:flex flex-1 bg-gray-50 flex-col items-center justify-center relative">
          <img 
            src={ImgAuth}
            alt="doctor"
           className="w-screen h-screen overflow-hidden "
          />
          {/* <p className="absolute left-3 top-5 text-center text-gray-700 italic text-lg">
            “Không còn: <br />
            <span className="line-through">xếp hàng</span> <br />
            <span className="line-through">chờ đợi</span> <br />
            Để lấy số khám bệnh”
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;