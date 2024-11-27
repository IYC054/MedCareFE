import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs(props) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="w-full">
      <span className="font-medium text-[17px] flex">
        <Link to={"/"}>Trang chủ</Link> <span className="mx-2">{">"}</span>{" "}
        <span
          className={`${
            location.pathname == "/hospital" ? "text-[#00b5f1]" : ""
          } cursor-pointer`}
        >
          <Link to={"/hospital"}>Bệnh Viện Chợ Rẫy</Link>{" "}
          {location.pathname == "/hospital/booking" ? (
            <Fragment>
              <span className="mx-2">{">"}</span>
              <span
                className={`${
                  location.pathname == "/hospital/booking"
                    ? "text-[#00b5f1]"
                    : ""
                } cursor-pointer`}
              >
                Chọn bác sĩ
              </span>
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}
        </span>
      </span>
    </div>
  );
}

export default Breadcrumbs;
