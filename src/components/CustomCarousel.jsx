import React, { useRef } from "react";

const CustomCarousel = ({ items,w }) => {
  const carouselRef = useRef(null);

  // Xử lý nút bấm "Next" và "Previous"
  const scrollNext = () => {
    carouselRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  const scrollPrev = () => {
    carouselRef.current.scrollBy({ left: -120, behavior: "smooth" });
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
              <div className="px-3 py-2 rounded-lg">
                <img
                  className="mx-auto"
                  src={item.img}
                  alt={item.text}
                />
                <p className="text-center text-sm font-medium mt-2">
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-gray-200 text-white p-2 rounded-full hover:bg-gray-100 transition">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="#003553" aria-labelledby="Previous Icon" height="20" width="20" xmlns="http://www.w3.org/2000/svg" ><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"></path></g></svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-gray-200 text-white p-2 rounded-full hover:bg-gray-100 transition"
      >
       <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="#003553" aria-labelledby="Next Icon" height="20" width="20" xmlns="http://www.w3.org/2000/svg" ><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"></path></g></svg>
      </button>
    </div>
  );
};

export default CustomCarousel;
