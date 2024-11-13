import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import './scss/rootLayoutAdmin.scss'; // Import custom styles

const RootLayoutAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Analytics');

  return (
    <div className={`root-layout-admin ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Content Area */}
      <div className={`content-area ${isOpen ? 'content-expanded' : 'content-collapsed'}`}>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayoutAdmin;
