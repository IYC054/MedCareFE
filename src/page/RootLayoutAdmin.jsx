import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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
    title = 'Patient Account';
    description = 'Manage and view details of patient accounts, including history and current status.';
  } else if (location.pathname === '/admin/doctor') {
    title = 'Doctor Account';
    description = 'Manage doctor accounts and track their appointments and performance.';
  } else if (location.pathname === '/admin/appointment') {
    title = 'Appointment';
    description = 'Manage patient appointments, scheduling, and availability of doctors.';
  } else if (location.pathname === '/admin/feedback') {
    title = 'Feedback';
    description = 'View and manage feedback from patients and clients to improve services.';
  } else if (location.pathname === '/admin') {
    title = 'Dashboard';
    description = 'This is an example dashboard created using built-in elements and components.';
  } else if (location.pathname === '/admin/appointment/createApp') {
    title = 'Create Room';
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
                          src='https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/332258329_1185557622321869_3673154378989835580_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hXxYVct6phgQ7kNvgEhwFuw&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=Ar-aWuczzMRvDRGtyq-95GV&oh=00_AYCOR3L4dHDYN8TQiO0hRc5zb7rPJlTGZLiXt1HyWGKuTg&oe=674B0CD4' />
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
                            src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/332258329_1185557622321869_3673154378989835580_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hXxYVct6phgQ7kNvgEhwFuw&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=Ar-aWuczzMRvDRGtyq-95GV&oh=00_AYCOR3L4dHDYN8TQiO0hRc5zb7rPJlTGZLiXt1HyWGKuTg&oe=674B0CD4"
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
                              <a href="#" className="text-gray-500 flex justify-between items-center">
                                Settings
                                <span className="text-xs bg-green-500 text-white py-1 px-2 rounded-full ml-2">NEW</span>
                              </a>
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
