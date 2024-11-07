import React, { useEffect, useState } from "react";
import Carosel from "../components/Home/carosel";

const Home = () => {
  const [placeholderText, setPlaceholderText] = useState("");
  const fullPlaceholders = [
    "  Tìm kiếm chuyên khoa",
    "  Tìm kiếm bác sĩ",
    "  Tìm kiếm phòng khám",
  ];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0); // plahoder thứ mấy
  let index = 0; // xác định chữ đầu

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Gõ chưa hết
      if (index < fullPlaceholders[currentPlaceholderIndex].length) {
        setPlaceholderText(
          (prev) =>
            prev + fullPlaceholders[currentPlaceholderIndex].charAt(index)
        );
        index++;
      } else {
        // Gõ hết
        setCurrentPlaceholderIndex(
          (prev) => (prev + 1) % fullPlaceholders.length
        );
        setPlaceholderText(""); // Xóa placeholder hiện tại để bắt đầu gõ lại
        index = 0;
      }
    }, 150); // Khoảng thời gian giữa các ký tự

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, [currentPlaceholderIndex]);
  return (
    <div>
      <div className="relative">
        <div>
          <img
            className="w-full"
            src="https://cdn.medpro.vn/prod-partner/92b6d682-4b5a-4c94-ac54-97a077c0c6c5-homepage_banner.webp"
          />
        </div>
        <div className="absolute top-16 w-full text-center">
          <p className="text-xl font-medium text-[#00b5f1] pb-1">
            Nền tảng công nghệ
          </p>
          <h1 className="text-3xl font-bold text-[#003553]">
            Kết nối người dân với Cơ sở - Dịch vụ Y tế
          </h1>

          {/* input */}
          <div className="rounded-lg p-3 w-1/2 mx-auto mt-4 bg-white">
            <form className="flex items-center gap-2">
              {/* Căn giữa input */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={20}
                height={20}
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <input
                className="rounded-lg w-full   outline-none"
                type="text"
                placeholder={placeholderText}
              />
            </form>
          </div>
          <p className="text-sm font-medium text-[#003553] mt-3">
            Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
          </p>
        </div>
        {/* phần cuoi */}
        <div className="w-full  absolute bottom-[-70px]">
          <div className="w-[65%] mx-auto gap-1 text-[12px] text-center font-semibold text-[#003553] grid grid-cols-7">
            <Carosel />
            <Carosel />
            <Carosel />
            <Carosel />
            <Carosel />
            <Carosel />
            <Carosel />
          </div>
        </div>
      </div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
      <div>Nguywen van nghi</div>
    </div>
  );
};

export default Home;
