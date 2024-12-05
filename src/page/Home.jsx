import React, { useContext, useEffect, useState } from "react";
import CustomCarousel from "../components/CustomCarousel";
import DoctorCarouselowl from "../components/doctorCarouselowl";
import Carousel from "../components/Home/Carosel";
import HealthCheckupCarouselwl from "../components/HealthCheckupCarouselwl";
import AppProvider, { AppContext } from "../components/Context/AppProvider";
import Advertisement from "../components/Home/Advertisement";

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
    },
  ];
  const logoHopital = [
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
    {
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e2176ed-db14-4603-a594-8cefb4c4a2d0-logo-circle-trung-vuong.png&w=64&q=75",
      text: "Bệnh viện trung ương",
    },
  ];
  const doctors = [
    {
      name: "BS. Lê Ngọc Hồng Hạnh",
      specialty: "Nhi - Thần kinh",
      price: "200.000",
      rating: 4.2,
      visits: 118,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Đức Bảo",
      specialty: "Tai mũi họng",
      price: "150.000",
      rating: 4.2,
      visits: 37,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "BS. Ngô Tài Dũng",
      specialty: "Nhi khoa",
      price: "250.000",
      rating: 4.1,
      visits: 51,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
    {
      name: "ThS. Nguyễn Thị Mỹ Linh",
      specialty: "Cơ Xương Khớp",
      price: "220.000",
      rating: 4.1,
      visits: 53,
      avatar: "https://via.placeholder.com/80",
    },
  ];
  const healthcheck = [
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
    {
      name: "Gói Khám Sức Khỏe Tổng Quát Tại Nhà",
      address: "Trung tâm xét nghiệm Medlatec Bình Phước",
      price: "200.000",

      avatar:
        "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F59939419-43d4-4d42-b1ec-081bf56f248d-khaam_saaa(c)c_khaaae_taaoai_nhaa_.jpg&w=384&q=75",
    },
  ];

  const { setisShow, setContent} = useContext(AppContext);
  useEffect(() => {
    setisShow(true);
    setContent(<Advertisement/>);
  }, [setContent,setContent]);

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

         
          <div className="rounded-lg p-3 w-1/2 mx-auto mt-4 bg-white">
            <form className="flex items-center gap-2">
            
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
       
        <div className="w-full  absolute bottom-[-70px]">
          <div className="w-[100%] mx-auto gap-1 text-[12px] text-center font-semibold text-[#003553]  ">
            <div className="w-[70%] flex justify-center mx-auto items-center">
              <CustomCarousel items={ExaminationServices} w={"w-32"} />
            </div>
          </div>
        </div>
      </div> 

      <div className="w-[80%] mx-auto mt-24">
        <div className="w-100">
          <p className="font-bold text-xl text-center">
            ĐƯỢC SỰ TIN TƯỞNG HỢP TÁC VÀ ĐỒNG HÀNH
          </p>
          <div className="w-[70%] mx-auto gap-1 text-[12px] text-center font-semibold text-[#003553]">
            <div className="w-[100%] flex justify-center mx-auto items-center">
              <CustomCarousel items={logoHopital} w={"w-28"} />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Carousel />
        </div>
        <div className="mt-3">
          <p className="text-center font-bold text-xl">
            BÁC SĨ TƯ VẤN KHÁM QUA VIDEO
          </p>
          <DoctorCarouselowl items={doctors} w={"w-[216px]"} />
          <div className="w-full flex justify-center mt-2">
            <button class="inline-flex items-center justify-center bg-transparent border p-0 border-transparent hover:border-[#00b5f1] px-2 py-2 rounded-lg">
              <p class="flex items-center m-0 text-[#00b5f1]">
                Xem Tất Cả
                <img
                  src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdirection-left.35ddaa32.svg&w=48&q=75"
                  alt="icon"
                  class="ml-2 h-5"
                />
              </p>
            </button>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-center font-bold text-xl">
            CHĂM SÓC SỨC KHỎE TOÀN DIỆN
          </p>
          <div className="text-[13px] font-bold flex justify-center gap-3 text-[#00b5f1] mt-2">
            <button className="px-4 py-1 bg-[#00b5f1] text-white rounded-lg">
              Sức Khỏe
            </button>
            <button>Xét Nghiệm</button>
            <button>Tiêm Chủng</button>
          </div>
          <HealthCheckupCarouselwl items={healthcheck} w={"w-[216px]"} />
          <div className="w-full flex justify-center mt-2">
            <button class="inline-flex items-center justify-center bg-transparent border p-0 border-transparent hover:border-[#00b5f1] px-2 py-2 rounded-lg">
              <p class="flex items-center m-0 text-[#00b5f1]">
                Xem Tất Cả
                <img
                  src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdirection-left.35ddaa32.svg&w=48&q=75"
                  alt="icon"
                  class="ml-2 h-5"
                />
              </p>
            </button>
          </div>
        </div>
        <div className="mt-3 bg-white p-4">
          <p className="text-center font-bold text-xl mb-8">CHUYÊN KHOA</p>
          <div className="gap-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 text-center">
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2FChuyenKhoa.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Bác sĩ gia đình </p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fumc%2Fsubjects%2F1655710722460-TIEU_HOA_GAN_MAT.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Tiêu Hóa Gan Mật</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fnoi_tong_quat.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Tổng Quát</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fnoi_tiet.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Tiết</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fda_lieu.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Da Liễu</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Ftim_mach.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Tim Mạch</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fthan_kinh.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Thần Kinh</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fnoi_co_xuong_khop.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Cơ Xương Khớp</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Ftai_mui_hong.png&w=96&q=75"
                width={70}
                height={70}
              />
              <p>Tai Mũi Họng</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fmat.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Mắt</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Ftieu_hoa.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Tiêu Hóa</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fumc%2Fsubjects%2FPG%2F1651821563777-VIEM_GAN.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Truyền Nhiễm</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fho_hap.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Hô Hấp</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Ftiet_nieu.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Nội Tiết Niệm</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fxuong_khop_chinh_hinh.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Ngoại Cơ Xương Khớp</p>
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fsan_phu_khoa.png&w=96&q=75"
                width={70}
                height={70}
              />{" "}
              <p>Sản-Phụ Khoa</p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-2">
            <button class="inline-flex items-center justify-center bg-transparent border p-0 border-transparent hover:border-[#00b5f1] px-2 py-2 rounded-lg">
              <p class="flex items-center m-0 text-[#00b5f1]">
                Xem Tất Cả
                <img
                  src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdirection-left.35ddaa32.svg&w=48&q=75"
                  alt="icon"
                  class="ml-2 h-5"
                />
              </p>
            </button>
          </div>
        </div>
        <div className="mt-3 bg-white px-4">
          <p className="text-center font-bold text-xl mb-4">
            TẢI ỨNG DỤNG ĐẶT KHÁM NHANH
            <span className="text-[#00b5f1]">MEDPRO</span>
          </p>
          <div className="flex gap-4 justify-center">
            <div>
              <img
                className="w-32"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Ficon_ios.svg&w=1920&q=75"
              />
            </div>
            <div>
              <img
                className="w-32"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Ficon_google_play.svg&w=1920&q=75"
              />
            </div>
          </div>
          <div className="p-10"></div>

          <div className="relative flex w-full px-24">
            {/* phan 1 */}
            <div className=" w-1/3 ">
              <ul >
                <li className="flex gap-1 mt-3 -mr-10">
                  <div className="text-sm">
                    <p className=" font-bold text-lg">Lấy số thứ tự khám nhanh trực tuyến</p>
                    <p >Đăng ký khám / tái khám nhanh theo ngày</p>
                    <p>
                      Đăng ký khám theo bác sĩ chuyên khoa.Tái khám theo lịch
                      hẹn
                    </p>
                  </div>
                  <div >
                    <img
                      className="w-16"
                      src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=1920&q=75"
                    />
                  </div>
                </li>
                <li className="flex gap-1 w-full mt-9 -ml-4">
                  <div className="text-sm">
                    <p className="font-bold text-lg">Tư vấn sức khỏe từ xa</p>
                    <p>Tư vấn sức khỏe từ xa, cuộc gọi video với các bác sĩ chuyên môn</p>
                    
                  </div>
                  <div>
                    <img
                      className="w-20"
                      src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=1920&q=75"
                    />
                  </div>
                </li>
                <li className="flex gap-1 mt-20 -mr-3">
                  <div>
                    <p className="font-bold text-lg">Tra cứu kết quả cận lâm sàng</p>
                    <p>Tra cứu kết quả cận lâm sàng trực tuyến dễ dàng và tiện lợi</p>
                    
                  </div>
                  <div>
                    <img
                      className="w-20"
                      src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=1920&q=75"
                    />
                  </div>
                </li>
              </ul>
            </div>

            {/* phan 2 vòng trong */}
            
            <div className="flex justify-center items-center mx-auto">
              <img
                className="w-[400px] mx-auto"
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fellipse.a457aed3.png&w=1920&q=75"
              />
            </div>
            {/* phan 3 dth */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
              <img
                className="w-60"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F858c322c-7f26-48d3-a5df-e633e9a3592e-20240325-095443.png&w=1920&q=75"
              />
            </div>

            {/* phan 4 */}
            <div className="w-1/3  ">
              <ul className="text-sm">
                <li className="flex gap-1  mt-3 -ml-10 bg-green-300">
                  <div>
                    <img
                      className="w-20"
                      src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=1920&q=75"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg ">Thanh toán viện phí</p>
                    <p >Đăng ký khám / tái khám nhanh theo ngày</p>
                    <p>
                      Đăng ký khám theo bác sĩ chuyên khoa.Tái khám theo lịch
                      hẹn
                    </p>
                  </div>
                </li>
                <li className="flex gap-5 w-full  mt-9 ml-2 bg-red-500">
                <div className="w-40 h-auto bg-red-600 ">
                    <img
                     
                      src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=1920&q=75"
                    />
                  </div>
                  <div>
                    <p className=" font-bold text-lg" > Chăm sóc Y tế tại nhà</p>
                    <p>Dịch vụ Y tế tại nhà (điều dưỡng, xét nghiệm) chuyên nghiệp, đáp ứng các nhu cầu chăm sóc Y tế tại nhà phổ thông</p>
                    
                  </div>
                </li>
                <li className="flex gap-1 mt-16 -ml-6">
                  <div className="w-40 h-auto bg-red-600 ">
                    <img
                      className="w-20"
                      src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=1920&q=75"
                    />
                  </div>
                  <div>
                    <p  className=" font-bold text-lg" >Mạng lưới Cơ sở hợp tác</p>
                    <p>Mạng lưới kết nối với các bệnh viện, phòng khám, phòng mạch rộng khắp phủ sóng toàn quốc</p>
                   
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-9"></div>
         
        
          <div onClick={()=>{setisShow(true);setContent(<Advertisement/>)}}>Nghi</div>
      
         
        </div>
      </div>
    </div>
  );
};

export default Home;
