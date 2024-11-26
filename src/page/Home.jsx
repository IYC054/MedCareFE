import React, { useEffect, useState } from "react";
import Carosel from "../components/Home/carosel";
import CustomCarousel from "../components/CustomCarousel";

const Home = () => {
  const ExaminationServices = [
   
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75",
      text: "Đặt khám theo cơ sở",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F488715df-05ff-42ef-bf6b-27d91d132158-bacsi.png&w=64&q=75",
      text: "Đặt khám theo bác sĩ",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F9fdd77eb-9baa-4f3b-a108-d91e136a0bf9-tele.png&w=64&q=75",
      text: "Tư vấn khám bệnh qua video",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fc193937f-8c0f-479e-be31-5610db6f7df1-dat-lich-xet-nghiem.png&w=64&q=75",
      text: "Đặt lịch xét nghiệm",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fb4181f19-f965-40b8-a4c5-2996cb960104-goi_kham.png&w=64&q=75",
      text: "Gói khám sức khỏe",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ff141b109-2daa-4953-ad55-5a395f900d46-tiaaam_chaaang.png&w=64&q=75",
      text: "Đặt lịch tiêm chủng",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ffa0b00be-d554-404a-bf9a-4a5f216ee978-chaam_saac_taaoa_i_nhaa.png&w=64&q=75",
      text: "Y tế tại nhà",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F0640985d-4280-4e8c-8ec6-939f9a4cf44b-thanhtoanvp.png&w=64&q=75",
      text: "Thanh toán viện phí",
    }
    
  ];
  const logoHopital = [
   
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "",
      text: "Đặt khám theo bác sĩ",
    },
    {
      img: "",
      text: "Tư vấn khám bệnh qua video",
    },
    {
      img: "",
      text: "Đặt lịch xét nghiệm",
    },
    {
      img: "",
      text: "Gói khám sức khỏe",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ff141b109-2daa-4953-ad55-5a395f900d46-tiaaam_chaaang.png&w=64&q=75",
      text: "Đặt lịch tiêm chủng",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ffa0b00be-d554-404a-bf9a-4a5f216ee978-chaam_saac_taaoa_i_nhaa.png&w=64&q=75",
      text: "Y tế tại nhà",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F0640985d-4280-4e8c-8ec6-939f9a4cf44b-thanhtoanvp.png&w=64&q=75",
      text: "Thanh toán viện phí",
    }
    
  ];
  const [placeholderText, setPlaceholderText] = useState("");
  const fullPlaceholders = [
    "  Tìm kiếm chuyên khoa",
    "  Tìm kiếm bác sĩ",
    "  Tìm kiếm phòng khám",
    "  Tìm Em trong bóng đêm",
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
          <div className="w-[100%] mx-auto gap-1 text-[12px] text-center font-semibold text-[#003553]  ">
            <div className="w-[70%] flex justify-center mx-auto items-center">
              <CustomCarousel items={ExaminationServices} w={"w-32"} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] bg-red-600 h-96 mx-auto mt-16">
        <div className="w-100">
          <p className="font-bold text-xl text-center">ĐƯỢC SỰ TIN TƯỞNG HỢP TÁC VÀ ĐỒNG HÀNH</p>
          <div className="w-[70%] mx-auto gap-1 text-[12px] text-center font-semibold text-[#003553]">
            <div className="w-[100%] flex justify-center mx-auto items-center">
              <CustomCarousel items={logoHopital} w={"w-28"} />
            </div>
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
    </div>
  );
};

export default Home;
