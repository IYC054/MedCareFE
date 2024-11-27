import React, { useRef } from "react";

const DoctorCarouselowl = ({ items, w }) => {
  const carouselRef = useRef(null);

  // Xử lý nút bấm "Next" và "Previous"
  const scrollNext = () => {
    carouselRef.current.scrollBy({ left: 220, behavior: "smooth" });
  };

  const scrollPrev = () => {
    carouselRef.current.scrollBy({ left: -220, behavior: "smooth" });
  };

  return (
    <div className="relative w-full p-4">
      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth gap-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`${w} flex-shrink-0 rounded-lg border-transparent border hover:border-[#00b5f1]`}
          >
            <div className="w-full h-full bg-white rounded-lg">
              <div className=" py-2 rounded-lg">
                <img className="mx-auto rounded-full" src={item.avatar} />
                <div className="bg-[#ebf9fd] flex items-center justify-between font-medium text-[12px] py-1 px-2 mt-2 ">
                  <p className="flex items-center gap-x-1">
                    Đánh giá:
                    <span className=" font-bold text-[#ffb54a]">
                      {item.rating}
                    </span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      color="#FFB54A"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                    </svg>
                  </p>
                  <p className="flex items-center gap-x-1">
                    Lượt khám:{" "}
                    <span className="font-bold text-[#ffb54a]">
                      {item.visits}
                    </span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 448 512"
                      color="#FFB54A"
                      height="13"
                      width="13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                    </svg>
                  </p>
                </div>
                <p className="px-2 mt-1 font-medium text-[15px]">{item.name}</p>
                <div className="px-2 mt-1 text-[13px]">
                  <p className="flex gap-1">
                    <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsubject.c5c373a2.svg&w=16&q=75" />
                    <span>{item.specialty}</span>
                  </p>
                  <p className="flex gap-1 -m-px">
                    <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdollar.359f3244.svg&w=16&q=75" />
                    <span>{item.price}đ</span>
                  </p>
                  <p className="flex gap-1">
                    <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhospital.adf5209e.svg&w=16&q=75" />
                    <span>Bác Sĩ Chuyên Khoa</span>
                  </p>
                </div>
                <div className="px-2 mt-3">
                  <button className="bg-[#00b5f1] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#009fd4] transition duration-300 w-full">
                    <p className="block text-sm">Tư Vấn Ngay</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-gray-200 text-white p-2 rounded-full hover:bg-gray-100 transition"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          color="#003553"
          aria-labelledby="Previous Icon"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"></path>
          </g>
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-gray-200 text-white p-2 rounded-full hover:bg-gray-100 transition"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          color="#003553"
          aria-labelledby="Next Icon"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default DoctorCarouselowl;
