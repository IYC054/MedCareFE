import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs(props) {
  const location = useLocation();

  // Lấy pathname từ URL hiện tại
  const pathParts = location.pathname.split("/").filter(Boolean);
  const queryParams = new URLSearchParams(location.search);
  const hospitalName = queryParams.get("hospital");
  let breadcrumb = [{ name: "Trang chủ ", link: "/" }];

  if (pathParts.includes("profile/add")) {
    breadcrumb.push({ name: "Cập nhật thông tin", link: "/profile/add" });
  } else if (pathParts.includes("hospital")) {
    breadcrumb.push({ name: "Bệnh viện", link: "/hospital" });
  } else if (pathParts.includes("profile")) {
    breadcrumb.push({ name: "Hồ Sơ Bệnh Nhân", link: "/profile" });
  } else if (pathParts.includes("choose-profile")) {
    breadcrumb.push({ name: "Chọn hồ sơ", link: "/choose-profile" });
  } else if (pathParts.includes("confirm-information")) {
    if(hospitalName){
      breadcrumb.push({ name: `Bệnh viện Chợ rẫy`, link: `/hospital` });
    }
    breadcrumb.push({ name: "Xác nhận thông tin", link: `/confirm-information?hospital=${hospitalName}` });
  }else if (pathParts.includes("choose-payment")) {
    breadcrumb.push({ name: "Chọn phương thức thanh toán", link: "/choose-payment" });
  
  }else if (pathParts.includes("hospital/form-appointment")) {
    breadcrumb.push({ name: "Chọn hình thức đặt khám", link: "hospital/form-appointment" });
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex">
        {breadcrumb.map((item, index) => (
          <li key={index} className="breadcrumb-item font-medium">
            {location.pathname + location.search == item.link ? (
              <Link to={item.link} className="text-[#00b5f1]">
                {item.name} <span className="text-[#000] mx-2">{">"}</span>
              </Link>
            ) : (
              <Link to={item.link}>
                {item.name} <span className="text-[#000] mx-2">{">"}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
