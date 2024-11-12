import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const RootLayoutAdmin = () => {
    return (
        <div>
        {/* Header fixed ở trên cùng */}
        <div className="w-full fixed top-0 left-0 z-[2]">
          <Header /> 
          {/* e code lại header của admin và thay vô */}
        </div>
  
        {/* Thêm khoảng cách để tránh bị che khuất */}
        <div className="mt-[140px]">
          <Outlet /> {/* Đây là nơi hiển thị các component con */}
        </div>
      </div>
    )
}

export default RootLayoutAdmin