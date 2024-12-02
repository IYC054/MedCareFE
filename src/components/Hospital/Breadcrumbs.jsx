import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs(props) {
  const location = useLocation();
  
  // Lấy pathname từ URL hiện tại
  const pathParts = location.pathname.split('/').filter(Boolean);

  let breadcrumb = [
    { name: 'Trang chủ ', link: '/' }
  ];

  if (pathParts.includes('profile/add')) {
    breadcrumb.push({ name: 'Cập nhật thông tin', link: '/profile/add' });
  } else if (pathParts.includes('hospital')) {
    breadcrumb.push({ name: 'Bệnh viện', link: '/hospital' });
  } else if(pathParts.includes('profile')) {
    breadcrumb.push({ name: 'Hồ Sơ Bệnh Nhân', link: '/profile' });
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex">
        {breadcrumb.map((item, index) => (
          <li key={index} className="breadcrumb-item font-medium">
            {location.pathname == item.link ? <Link to={item.link} className="text-[#00b5f1]">{item.name} <span className="text-[#000] mx-2">{">"}</span></Link> : 
            <Link to={item.link}>{item.name} <span className="text-[#000] mx-2">{">"}</span></Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
