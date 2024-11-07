import React from "react";

const Carosel = () => {
  return (
    <div className="rounded-lg border-transparent border hover:border-[#00b5f1] hover:border w-28 ">
      <div className="bg-white  rounded-lg ">
        <div className="px-3 py-2 rounded-lg">
          <img
            className="mx-auto"
            src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F94fad041-984a-4ed7-99e8-3a940360a1cc-7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.webp&w=64&q=75"
            alt="Image"
          />
          <p>Đặt khám tại cơ sở</p>
        </div>
      </div>
    </div>
   
  
  );
};

export default Carosel;
