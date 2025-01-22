import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";
import { SnackbarProvider, useSnackbar } from "notistack";
const RootLayout = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <div>
        {/* Header fixed ở trên cùng */}
        <div className="w-full fixed top-0 left-0 z-[2]">
          <Header />
        </div>

        {/* Thêm khoảng cách để tránh bị che khuất */}
        <div className="mt-[160px]">
          <Outlet /> {/* Đây là nơi hiển thị các component con */}
        </div>
        <Footer />
      </div>
    </SnackbarProvider>
  );
};

export default RootLayout;
