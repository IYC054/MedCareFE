import React from "react";
import { BiPhone } from "react-icons/bi";
import { FaRegClock, FaStar } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import "./hospital.scss";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
function Hopsital() {
  const location = useLocation();
  return (
    <div className="container flex justify-center py-5">
      <div className="w-4/5 ">
        {/* breadcrumbs */}
        <Breadcrumbs />
        {/* breadcrumbs */}
        <div className="grid grid-cols-3 gap-4 my-2">
          <div className="col-span-1 w-full   ">
            {/* start hospital */}
            <div className="shadow-lg rounded-xl p-4 bg-[#fff] w-full mb-5">
              <div className="w-full  border-b-2 border-solid border-b-[#c2c2c2]">
                <div className="w-full h-[200px] flex justify-center items-center">
                  <img
                    src="https://bvcrheci.vn/wp-content/uploads/2018/08/logo-cr-135.png"
                    alt="hopistal"
                    className="w-full h-full object-contain bg-none"
                  />
                </div>
                <div className="w-full p-2 py-4 mb-2 text-center">
                  <span className="text-[20px] text-[#00b5f1] font-semibold">
                    Bệnh Viện Chợ Rẫy
                  </span>

                  <div className="text-[#ffb54a] text-[20px] flex gap-2 justify-center items-center">
                    <span className="font-medium text-[17px]">(4)</span>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-[#c2c2c2]" />
                  </div>
                </div>
              </div>
              <div className="mt-2 w-full">
                <ul className="list-none text-[#003553]">
                  <li className="flex items-center justify-start gap-2 py-2">
                    <span className="flex items-center text-[24px] text-[#ffb54a] mt-[-20px]">
                      <GrLocation />
                    </span>
                    <span className="text-[14px]">
                      201B Đ. Nguyễn Chí Thanh, Phường 12, Quận 5, Hồ Chí Minh
                      700000
                    </span>
                  </li>
                  <li className="flex items-center justify-start gap-2 py-2">
                    <span className="flex items-center text-[24px] text-[#ffb54a]">
                      <FaRegClock />
                    </span>
                    <span className="text-[14px]">
                      Thứ 2 - Chủ nhật (6:00 - 18:00)
                    </span>
                  </li>
                  <li className="flex items-center justify-start gap-2 py-2">
                    <span className="flex items-center text-[24px] text-[#ffb54a]">
                      <BiPhone />
                    </span>
                    <span className="text-[14px]">
                      Hỗ trợ đặt khám: 0362061339
                    </span>
                  </li>
                </ul>
              </div>
              <div className="w-full my-3">
                <button className="w-full h-[50px] text-[#fff] font-medium rounded-full bg-gradient-to-r from-[#00b5f1] to-[#00e0ff]">
                  <Link to={`${location.pathname}/booking`}>Đặt Khám Ngay</Link>
                </button>
              </div>
            </div>
            {/* end hospital */}
            {/* start ads */}
            <div className="w-full h-[250px] mb-5">
              <div className="w-full h-full rounded-2xl">
                <img
                  src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FerrImg.13c32a65.svg&w=1920&q=75"
                  alt="ads"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            {/* end ads */}
            {/* start mô tả */}
            <div className="w-full  bg-[#fff] rounded-xl shadow-xl mb-5 p-4">
              <div className="w-full">
                <span className="text-[28px]">Mô tả</span>
              </div>
              <div className="w-full mb-2 ">
                <span>
                  Bệnh viện quận Bình Thạnh, thuộc UBND Quận Bình Thạnh, là một
                  trung tâm y tế quan trọng đáp ứng nhu cầu y tế ngày càng cao
                  của khu vực. Bệnh viện cam kết cung cấp dịch vụ y tế xuất sắc
                  và đã phát triển từ việc hợp nhất hai đơn vị y tế ban đầu
                  thành một cơ sở y tế hạng 2 uy tín. Với cơ cấu tổ chức chuyên
                  nghiệp, bệnh viện thúc đẩy sự đổi mới và chia sẻ trách nhiệm
                  với cộng đồng.
                </span>
              </div>
            </div>
            {/* end mô tả */}
            {/* start map */}
            <div className="w-full h-[300px] bg-slate-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15678.785631639359!2d106.6595131!3d10.7578646!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef1efebf7d7%3A0x9014ce53b8910a58!2zQuG7h25oIHZp4buHbiBDaOG7oyBS4bqreQ!5e0!3m2!1svi!2s!4v1732594511462!5m2!1svi!2s"
                className="w-full h-full object-cover"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* end map */}
          </div>
          <div className="col-span-2">
            {/* start slider */}
            <div className="w-full h-[540px] mb-8">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipMndh7L1UFZSbmeVHN16p6nf-4c-iy7y9qUvdK5=s1360-w1360-h1020"
                alt=""
                className="w-full h-full object-cover rounded-xl shadow-xl"
              />
            </div>
            {/* end slider */}
            {/* start services */}
            <div className="w-full h-[245px] rounded-2xl p-2 mb-5">
              <div className="w-full text-center">
                <span className="text-4xl text-[#00b5f1] font-medium">
                  Các dịch vụ
                </span>
              </div>
              <div className="grid grid-cols-4 w-full h-[180px]  p-3 gap-4">
                <div className="col-span-1">
                  <div className="w-full h-full bg-[#fff] shadow-lg rounded-xl  p-4 text-center border-solid border-[#00b5f1] border-[1px]">
                    <div className="w-full h-[60px]">
                      <img
                        src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Ffeature%2Fimage-source%2Fc67cfa6c8d404046852efbf987822d02_anh_djo.png&w=64&q=75"
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-full h-[60px] py-2">
                      <span className="text-[#003553]">
                        Đặt khám theo chuyên khoa
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="w-full h-full bg-[#fff] shadow-lg rounded-xl  p-4 text-center border-solid border-[#00b5f1] border-[1px]">
                    <div className="w-full h-[60px]">
                      <img
                        src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Ffeature%2Fimage-source%2F90cb0bbe25694eb792c6a9d09e8f495c_djat_kham_theo_bac_si.png&w=64&q=75"
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-full h-[60px] py-2">
                      <span className="text-[#003553]">
                        Đặt khám theo bác sĩ
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="w-full h-full bg-[#fff] shadow-lg rounded-xl  p-4 text-center border-solid border-[#00b5f1] border-[1px]">
                    <div className="w-full h-[60px]">
                      <img
                        src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fb91c461a-194e-42cd-afb9-ab1ddbfbc10c-gaai_saaa(c)c_khaaae.png&w=64&q=75"
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-full h-[60px] py-2">
                      <span className="text-[#003553]">Gói khám sức khoẻ</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="w-full h-full bg-[#fff] shadow-lg rounded-xl  p-4 text-center border-solid border-[#00b5f1] border-[1px]">
                    <div className="w-full h-[60px]">
                      <img
                        src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Ffeature%2Fimage-source%2Fc67cfa6c8d404046852efbf987822d02_anh_djo.png&w=64&q=75"
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-full h-[60px] py-2">
                      <span className="text-[#003553]">
                        Đặt khám liên chuyên khoa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end services */}
            <div
              className="w-full h-[600px] bg-[#fff] rounded-xl shadow-xl p-4 overflow-auto"
              id="style-5"
            >
              <span>
                Năm 1900 Bệnh viện Chợ Rẫy (BVCR) được thành lập từ năm 1900 với
                tên là “Hôpital Municipal de Cho lon”, rồi lần lượt bệnh viện
                được đổi tên thành “Hôpital Indigene de Cochinchine” (1919),
                “Hôpital Lalung Bonnaire” (1938), “Hôpital 415” (1945). Sau đó
                bệnh viện được tách ra làm 2 phòng khám là Hàm Nghi và Nam Việt.
                Hai phòng khám này sáp nhập lại vào năm 1957 cho tới ngày nay.
                Trong thực tế, người dân vẫn dùng tên Chợ Rẫy để gọi bệnh viện
                từ ngày thành lập.
                <br />
                Năm 1971
                <br />
                Năm 1971, BVCR được tái xây dựng trên một diện tích 53.400m2 với
                trang thiết bị hiện đại để trở thành một trong những bệnh viện
                lớn nhất Đông Nam Á. Công trình được hoàn thành vào tháng sáu
                năm 1974 bằng viện trợ không hoàn lại của Chính phủ Nhật Bản.
                Những năm 1993-1995, Chính phủ Nhật Bản tiếp tục viện trợ không
                hoàn lại nâng cấp cơ sở hạ tầng bệnh viện. HIỆN NAY
                <br />
                Ngày nay, tại miền Nam Việt Nam, tại Thành phố Hồ Chí Minh, BVCR
                hiện diện các khu nhà nhiều tầng: khu nhà 11 tầng, khu nhà Trung
                tâm Ung bướu Chợ Rẫy.... Thế mạnh nổi bật tại BVCR là sự kết hợp
                giữa các chuyên khoa mang lại hiệu quả tốt nhất trong việc chẩn
                đoán và điều trị bệnh. BVCR luôn theo mục tiêu hiện đại hóa quy
                trình kỹ thuật y khoa, nâng cao chất lượng dịch vụ y tế và phong
                cách giao tiếp; BVCR là nơi mà tất cả các bệnh nhân luôn đặt
                niềm tin tuyệt đối.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hopsital;
