import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faChevronUp, faChevronDown, faFileLines } from '@fortawesome/free-solid-svg-icons';
import './scss/sidebar.scss';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen, activeMenu, setActiveMenu }) {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);
    const [isSubMenuOpen1, setIsSubMenuOpen1] = useState(true);
    const [isClosed, setIsClosed] = useState(window.innerWidth <= 768);
    // Remove the local useState for isOpen
    const toggleMenu = () => {
        setIsOpen(!isOpen); // Now this uses the passed down setIsOpen
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
        console.log("sub",isSubMenuOpen);
    };
   
    const toggleSubMenu1 = () => {
        setIsSubMenuOpen1(!isSubMenuOpen1);
        console.log("sub1",isSubMenuOpen1);
    };
    useEffect(() => {
        const handleResize = () => {
            setIsClosed(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className={!isOpen && !isClosed ? 'app-sidebar-wrapper' : 'app-sidebar-wrapper-close'} id="style-1" >
            <div className='app-header__logo'>
                <img src='https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fheader_logo.svg&w=2048&q=75' className='logo-src'/>
                <button className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </button>
            </div>
            <div className='scrollbar-sidebar'>
                <div className='app-sidebar__inner'>
                    {/* Dashboards Menu */}
                    <ul className='vertical-nav-menu metismenu'>
                        <li className='app-sidebar__heading'>Menu</li>
                        <li className='mm-active'>
                            <a className='childmenu' onClick={toggleSubMenu}>
                                <FontAwesomeIcon icon={faRocket} /> Dashboards
                                <FontAwesomeIcon icon={isSubMenuOpen ? faChevronUp : faChevronDown} className='metismenu-state-icon' />
                            </a>
                            <ul className={isSubMenuOpen ? 'mm-show' : 'mm-collapse'}>
                                <li>
                                    <Link to="/admin" className={activeMenu === 'Analytics' ? 'mm-active' : ''} onClick={() => handleMenuClick('Analytics')}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/user" className={activeMenu === 'User' ? 'mm-active' : ''} onClick={() => handleMenuClick('User')}>
                                        User
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/doctor" className={activeMenu === 'Doctor' ? 'mm-active' : ''} onClick={() => handleMenuClick('Doctor')}>
                                        Doctor 
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/feedback" className={activeMenu === 'FeedBack' ? 'mm-active' : ''} onClick={() => handleMenuClick('Feedback')}>
                                        Feedback
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/* Pages Menu */}
                    <ul className='vertical-nav-menu metismenu'>
                        <li className='mm-active'>
                            <a className='childmenu' onClick={toggleSubMenu1}>
                                <FontAwesomeIcon icon={faFileLines} /> Pages
                                <FontAwesomeIcon icon={isSubMenuOpen1 ? faChevronUp : faChevronDown} className='metismenu-state-icon' />
                            </a>
                            <ul className={isSubMenuOpen1 ? 'mm-show' : 'mm-collapse'}>
                                <li>
                                    <a className={activeMenu === 'c' ? 'mm-active' : ''} onClick={() => handleMenuClick('c')}>
                                        Analytics
                                    </a>
                                </li>
                                <li>
                                    <a className={activeMenu === 'a' ? 'mm-active' : ''} onClick={() => handleMenuClick('a')}>
                                        Management
                                    </a>
                                </li>
                                <li>
                                    <a className={activeMenu === 's' ? 'mm-active' : ''} onClick={() => handleMenuClick('s')}>
                                        Advertisement
                                    </a>
                                </li>
                                <li>
                                    <a className={activeMenu === 'd' ? 'mm-active' : ''} onClick={() => handleMenuClick('d')}>
                                        Helpdesk
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                 
                </div>
            </div>
        </div>
    );
}

export default Sidebar;