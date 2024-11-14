import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faChevronUp, faChevronDown, faFileLines } from '@fortawesome/free-solid-svg-icons';
import './scss/sidebar.scss';

function Sidebar({ isOpen, setIsOpen, activeMenu, setActiveMenu }) {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);
    const [isSubMenuOpen1, setIsSubMenuOpen1] = useState(true);

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

    return (
        <div className={isOpen ? 'app-sidebar-wrapper-close' : 'app-sidebar-wrapper'}>
            <div className='app-header__logo'>
                <div href='' className='logo-src'></div>
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
                                    <a className={activeMenu === 'Analytics' ? 'mm-active' : ''} onClick={() => handleMenuClick('Analytics')}>
                                        Analytics
                                    </a>
                                </li>
                                <li>
                                    <a className={activeMenu === 'Management' ? 'mm-active' : ''} onClick={() => handleMenuClick('Management')}>
                                        Management
                                    </a>
                                </li>
                                <li>
                                    <a className={activeMenu === 'Advertisement' ? 'mm-active' : ''} onClick={() => handleMenuClick('Advertisement')}>
                                        Advertisement
                                    </a>
                                </li>
                                <li>
                                    <a className={activeMenu === 'Helpdesk' ? 'mm-active' : ''} onClick={() => handleMenuClick('Helpdesk')}>
                                        Helpdesk
                                    </a>
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
