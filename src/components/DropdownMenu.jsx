import React, { useState } from 'react';

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Nút menu chính */}
      <button className="text-[#003553] font-semibold text-[14px]"  onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}>
        {title}
      </button>

      {/* Menu thả xuống với hiệu ứng trồi lên */}
      {isOpen && (
        <div 
          className={`absolute bg-white shadow-lg rounded-lg mt-0 right-0 w-48  duration-300 transform z-[2]   ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}  onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {items.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className="block text-[12px] font-semibold px-3 py-3 text-gray-800 hover:bg-gray-100"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
