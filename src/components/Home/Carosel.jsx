import React, { useEffect, useState } from "react";
const Carousel = () => {
  const images = [
    {
      id: 1,
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9445a373-0da5-4c7c-997d-1e2058e59dbf-baby_dino_banner_1180x310_desktop.jpg&w=1200&q=100",
    },
    {
      id: 2,
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F4edacddd-7280-41e0-b6c9-3eb7d438c107-banner_cashback_1180x310_desktop.jpg&w=1200&q=100",
    },
    {
      id: 3,
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fe7eda662-3dd6-4b79-8253-baf031e6561e-promote-telemed-de.jpg&w=1200&q=100",
    },
    {
      id: 4,
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fda64c9ee-fdd6-4a13-bc52-fe74255fc079-promote-vaccine-d.jpg&w=1200&q=100",
    },
    {
      id: 5,
      img: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fce76da74-5584-451b-b417-c3b68ce49cfa-viettel_money_banner_fb_1180x310_copy2_copy.png&w=1200&q=100",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);
  return (
    <div>
      <div className="rounded-lg h-full">
        <img
          src={images[currentIndex].img}
          alt={`Slide ${currentIndex}`}
          className="rounded-lg"
        />
        <div className="mt-1">
        <ul className="flex gap-2 justify-center">
        {images.map((item)=>{
            return <li key={item.id} className={`cursor-pointer w-2 h-2 rounded-full ${currentIndex+1===item.id ?" bg-[#00b5f1]":" bg-gray-200"}`} onClick={()=>setCurrentIndex(item.id-1)}></li>
        })}
         
        </ul>
      </div>
      </div>
      
    </div>
    //viết thuần thật là phê
  );
};

export default Carousel;
