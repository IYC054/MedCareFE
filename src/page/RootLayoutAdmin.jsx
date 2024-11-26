import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import './scss/rootLayoutAdmin.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const RootLayoutAdmin = () => {
  const [isOpen, setIsOpen] = useState(true)
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

  return (
    <div className={`root-layout-admin ${!isOpen && !isClosed ? 'sidebar-closed' : 'sidebar-open'}`}>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />


      <div className={`content-area ${!isOpen && !isClosed ? 'content-collapsed' : 'content-expanded'}`}>
        <div className='app-header'>
          <div className='page-title-heading'>
            Dashboard 
            <div className='page-title-subheading'>
              This is an example dashboard created using built-in elements and components.
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
                          src='https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-1/455463154_1827211994432428_961288039233308800_n.jpg?stp=dst-jpg_s200x200&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=lcvkZ3R8cnYQ7kNvgE7dgJL&_nc_zt=24&_nc_ht=scontent.fhan4-1.fna&_nc_gid=AROohsOLtWJdjednim--XfX&oh=00_AYCy8f5-HHSpshP_GA7dEsFhNlAQabpZ8NBe5MSU8FEtlQ&oe=6744CDFA' 
                        />
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
        </div>
      </div>
    </div>
  );
};

export default RootLayoutAdmin;
