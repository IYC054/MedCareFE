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
                    <div className='btn-group'>
                      <a className='ac'>
                        <img
                          className='rounded'
                          src='https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/332258329_1185557622321869_3673154378989835580_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hXxYVct6phgQ7kNvgEhwFuw&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=Ar-aWuczzMRvDRGtyq-95GV&oh=00_AYCOR3L4dHDYN8TQiO0hRc5zb7rPJlTGZLiXt1HyWGKuTg&oe=674B0CD4' />
                        <i className='bi bi-chevron-compact-down'></i>
                      </a>
                    </div>
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
    </div>

  );
};


export default RootLayoutAdmin;
