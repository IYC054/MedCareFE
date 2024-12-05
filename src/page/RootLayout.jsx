import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from './Footer';
import { AppContext } from '../components/Context/AppProvider';
import Advertisement from '../components/Home/Advertisement';

const RootLayout = () => {
    const { setisShow, setContent } = useContext(AppContext);

    useEffect(() => {
        setisShow(true);
        setContent(<Advertisement />);
    }, [setisShow, setContent]);

    return (
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
    );
}

export default RootLayout;
