
import React, { useRef } from "react";

const HealthCheckupCarouselwl = ({ items, w }) => {
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
              <div className=" rounded-lg">
                <img className="mx-auto rounded-t-lg " src={item.avatar} />
                <p className="px-2 mt-1 font-medium text-[15px]">{item.name}</p>
                <div className="px-2 mt-1 text-[13px]">
                  <p className="flex gap-1 ">
                    <img className="-mt-5" src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhospital.adf5209e.svg&w=16&q=75" />
                    <span className="text-[12px] font-normal">{item.address}</span>
                  </p>
                  <p className="flex gap-1 -m-px">
                    <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdollar.359f3244.svg&w=16&q=75" />
                    <span className="font-bold text-[#ffb54a]">{item.price}đ</span>  <span className="font-bold text-gray-400 line-through">{item.price}đ</span>
                  </p>
                  
                </div>
                <div className="px-2 mt-3">
                  <button className="bg-[#00b5f1] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#009fd4] transition duration-300 w-full mb-2">
                    <p className="block text-sm">Đặt Khám Ngay</p>
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

export default HealthCheckupCarouselwl;



