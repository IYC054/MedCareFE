import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import './scss/rootLayoutAdmin.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
const RootLayoutAdmin = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Analytics');
  const [isClosed, setIsClosed] = useState(window.innerWidth <= 780);
  const [profile, setProfife] = useState(false)

  const showProfile = () => {
    setProfife(!profile);
  }
  useEffect(() => {
    const handleResize = () => {
      setIsClosed(window.innerWidth <= 780);
    };


    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const location = useLocation();

  let title = '';
  let description = '';

  if (location.pathname === '/admin/user') {
    title = 'Tài khoản bệnh nhân';
    description = 'Quản lý và xem chi tiết tài khoản bệnh nhân, bao gồm lịch sử và trạng thái hiện tại.';
  } else if (location.pathname === '/admin/doctor') {
    title = 'Tài khoản bác sĩ';
    description = 'Quản lý tài khoản bác sĩ và theo dõi lịch hẹn cũng như hiệu suất làm việc.';
  } else if (location.pathname === '/admin/appointment') {
    title = 'Lịch hẹn';
    description = 'Quản lý lịch hẹn của bệnh nhân, sắp xếp thời gian và tình trạng sẵn có của bác sĩ.';
  } else if (location.pathname === '/admin/feedback') {
    title = 'Phản hồi';
    description = 'Xem và quản lý phản hồi từ bệnh nhân và khách hàng để cải thiện dịch vụ.';
  } else if (location.pathname === '/admin') {
    title = 'Bảng điều khiển';
    description = 'Đây là bảng điều khiển với các thành phần và tính năng quản trị.';
  } else if (location.pathname === '/admin/transaction') {
    title = 'Giao dịch';
    description = 'Xem và quản lý tất cả giao dịch từ bệnh nhân.';
  } else if (location.pathname === '/admin/appointment/createApp') {
    title = 'Tạo phòng';
    description = 'Thiết lập và tạo phòng cho các cuộc hẹn trực tuyến.';
  } else if (location.pathname === '/admin/chat') {
    title = 'Phản hồi tin nhắn';
    description = 'Quản lý và phản hồi tin nhắn từ bệnh nhân và bác sĩ.';
  } else if (location.pathname === '/admin/user/userDetail/:id') {
    title = 'Chi tiết bệnh nhân';
    description = 'Xem thông tin chi tiết về bệnh nhân và lịch sử điều trị.';
  } else if (location.pathname === '/admin/doctor/doctorDetail/:id') {
    title = 'Chi tiết bác sĩ';
    description = 'Xem thông tin chi tiết của bác sĩ, bao gồm lịch làm việc và đánh giá.';
  } else if (location.pathname === '/admin/transaction/Detail/:id') {
    title = 'Chi tiết giao dịch';
    description = 'Xem chi tiết báo cáo giao dịch và lịch sử thanh toán.';
  } else if (location.pathname === '/admin/profileadmin') {
    title = 'Hồ sơ quản trị viên';
    description = 'Cập nhật thông tin cá nhân và cài đặt tài khoản quản trị viên.';
  } else if (location.pathname === '/admin/specialty') {
    title = 'Chuyên khoa';
    description = 'Quản lý danh sách các chuyên khoa y tế trong hệ thống.';
  }
  else if (location.pathname === '/admin/news') {
    title = 'Tin tức';
    description = 'Quản lý và cập nhật tin tức liên quan đến y tế và bệnh viện.';
  }
  else {
    title = '';
    description = '';
  }


  return (
    <div className={`root-layout-admin  ${!isOpen && !isClosed ? 'sidebar-closed' : 'sidebar-open'}`}>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />


      <div className={`content-area ${!isOpen && !isClosed ? 'content-collapsed' : 'content-expanded'}`}>
        <div className='app-header'>
          <div className='page-title-heading'>
            {title}
            <div className='page-title-subheading'>
              {description}
            </div>
          </div>
          <div className='app-header-right'>
            <div className='header-btn-lg pr-0'>
              <div className='dropdown'>
                <button className='p-0 mr-2 btn btn-link'>
                  <i className="bi bi-menu-up"></i>
                </button>
              </div>
              <div className='dropdown'>
                <button className='p-0 mr-2 btn btn-link'>
                  <i className="bi bi-bell"></i>
                </button>
              </div>
            </div>

            <div className='header-btn-lg pr-0'>
              <div className='widget-content p-0'>
                <div className='widget-content-wrapper'>
                  <div className='widget-content-left'>
                    <div className='btn-group ' onClick={showProfile}>
                      <a className='ac' >
                        <img
                          className='rounded'
                          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s' />
                        <i className='bi bi-chevron-compact-down' ></i>
                      </a>
                    </div>
                    {profile && (
                      <div className="absolute top-14 right-0 w-96 bg-white border border-gray-200 rounded-md shadow-lg z-999">
                        {/* Header với hình nền và thông tin người dùng */}
                        <div
                          className="flex items-center p-4 bg-[#da624a] text-white rounded-t-md"

                        >
                          <img
                            className="w-12 h-12 rounded-full mr-4"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s"
                            alt="User Avatar"
                          />
                          <div>
                            <p className="font-medium text-lg">Tuuannat</p>
                            <p className="text-sm">Profile setting</p>
                          </div>
                          <button
                            className="ml-auto bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
                            onClick={() => console.log('Logout Clicked')}
                          >
                            Logout
                          </button>
                        </div>

                        <div className="p-4">
                          <div className="text-gray-800 font-medium">My Account</div>
                          <ul className="list-none space-y-3 mt-2">
                            <li>
                              <a href="#" className="text-gray-500">Recover Password</a>
                            </li>
                            <li>
                              <Link to="/admin/profileadmin" className="text-gray-500 flex justify-between items-center">
                                Settings
                                <span className="text-xs bg-green-500 text-white py-1 px-2 rounded-full ml-2">NEW</span>
                              </Link>
                            </li>
                            <li>
                              <a href="#" className="text-gray-500 flex justify-between items-center">
                                Messages
                                <span className="text-xs bg-yellow-500 text-white py-1 px-2 rounded-full ml-2">512</span>
                              </a>
                            </li>
                          </ul>

                          {/* Các nút */}
                          <div className="mt-4">
                            <button className="bg-orange-500 text-white py-2 px-4 w-full rounded-full hover:bg-orange-600">
                              Open Messages
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area for Outlet */}
        <div className="content">
          <Outlet />
          {/* <div className='w-full bg-[#fff] p-4 mb-2 rounded-lg drop-shadow-xl'>
            footer
          </div> */}
        </div>

      </div>
    </div >

  );
};


export default RootLayoutAdmin;
