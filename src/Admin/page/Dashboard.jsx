import React, { useState } from 'react';
import '../scss/dashboard.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import ChartMonth from './chart/ChartMonth';
import ChartWeek from './chart/ChartWeek';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('this month');
    const [activeTab2, setActiveTab2] = useState('tab1');
    const [activeChart, setActiveChart] = useState('this month');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setActiveChart(tab);

    };
    const handleTabClick1 = (tab) => {

        setActiveTab2(tab);
    };
    return (
        <div className='app-inner-layout__content'>
            <div className='tab-content'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-6 col-xl-4'>
                            <div className='card mb-3 widget-content bg-night-fade '>
                                <div className='widget-content-wrapper text-white d-flex'>
                                    <div className='widget-content-left'>
                                        <div className='widget-heading'>
                                            User
                                        </div>
                                        <div className='widget-subheading'>This month</div>
                                    </div>
                                    <div className='widget-content-right'>
                                        <div className='widget-numbers text-white'><span>189</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-xl-4'>
                            <div className='card mb-3 widget-content bg-arielle-smile'>
                                <div className='widget-content-wrapper text-white d-flex'>
                                    <div className='widget-content-left'>
                                        <div className='widget-heading'>
                                            Booking
                                        </div>
                                        <div className='widget-subheading'>medical appointments
                                            this month</div>
                                    </div>
                                    <div className='widget-content-right'>
                                        <div className='widget-numbers text-white'><span>249</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-xl-4'>
                            <div className='card mb-3 widget-content bg-happy-green'>
                                <div className='widget-content-wrapper text-white d-flex'>
                                    <div className='widget-content-left'>
                                        <div className='widget-heading'>
                                            Income
                                        </div>
                                        <div className='widget-subheading'>This month</div>
                                    </div>
                                    <div className='widget-content-right'>
                                        <div className='widget-numbers text-white'><span>589$</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-md-12 col-lg-6 col-xl-5'>
                            <div className='mb-3 card'>
                                <div className='card-header-tab card-header-tab-animation card-header'>
                                    <div className='card-header-title'>
                                        <i className='bi bi-people' > User Book</i>
                                    </div>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${activeTab === 'whole year' ? 'active' : ''}`}
                                                onClick={() => handleTabClick('whole year')}
                                            >
                                                Whole Year
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${activeTab === 'this month' ? 'active' : ''}`}
                                                onClick={() => handleTabClick('this month')}
                                            >
                                                This Month
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='card-body'>
                                    <div className='tab-content'>
                                        <div className='tab-pane fade active show' id="tabs-eg-77">
                                            <div className='card mb-3 widget-chart widget-chart2 text-left w-100'>
                                                <div className='widget-chat-wrapper-outer'>
                                                    <div className='widget-chart-content pt-3 pr-3 pl-3'>
                                                        <div className='widget-chart-flex'>
                                                            <div className='widget-numbers'>
                                                                <div className='widget-chart-flex'>
                                                                    <div>
                                                                        <span>{activeTab === 'this month' ? '50' : '213'}</span>
                                                                    </div>
                                                                    <div className='widget-title ml-2  font-size-lg text-muted'>
                                                                        total
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='widget-chart-wrapper widget-chart-wrapper-lg m-0'>
                                                        <div className='dashboard-sparkline-carousel-3'>
                                                            <div className='apexcharts-canvas apexchartshakojqnlj light' id='apexchartshakojqnlj'>
                                                                {activeChart === 'this month' ? <ChartWeek /> : <ChartMonth />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className='text-muted text-uppercase font-size-md  font-weight-normal'>
                                                Top Authors
                                            </h6>
                                            <div className='scroll-area-sm'>
                                                <div className='scrollbar-container ps ps--active-y'>
                                                    <ul className='rm-list-borders rm-list-borders-scroll list-group list-group-flush'>
                                                        <li className='list-group-item'>
                                                            <div className='widget-content p-0'>
                                                                <div className='widget-content-wrapper'>
                                                                    <div className='widget-content-left mr-3'>
                                                                        <img className='rounded-circle' width={42} src="https://demo.dashboardpack.com/kero-html-sidebar-pro/assets/images/avatars/9.jpg"></img>
                                                                    </div>
                                                                    <div className='widget-content-left'>
                                                                        <div className='widget-heading'>
                                                                            Ella-Rose Henry
                                                                        </div>
                                                                        <div className='widget-subheading'>
                                                                            Web
                                                                            Developer
                                                                        </div>
                                                                    </div>
                                                                    <div className='widget-content-right'>
                                                                        <div className='font-size-xlg'>
                                                                            <span>129</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className='list-group-item'>
                                                            <div className='widget-content p-0'>
                                                                <div className='widget-content-wrapper'>
                                                                    <div className='widget-content-left mr-3'>
                                                                        <img className='rounded-circle' width={42} src="https://demo.dashboardpack.com/kero-html-sidebar-pro/assets/images/avatars/9.jpg"></img>
                                                                    </div>
                                                                    <div className='widget-content-left'>
                                                                        <div className='widget-heading'>
                                                                            Ella-Rose Henry
                                                                        </div>
                                                                        <div className='widget-subheading'>
                                                                            Web
                                                                            Developer
                                                                        </div>
                                                                    </div>
                                                                    <div className='widget-content-right'>
                                                                        <div className='font-size-xlg'>
                                                                            <span>129</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className='list-group-item'>
                                                            <div className='widget-content p-0'>
                                                                <div className='widget-content-wrapper'>
                                                                    <div className='widget-content-left mr-3'>
                                                                        <img className='rounded-circle' width={42} src="https://demo.dashboardpack.com/kero-html-sidebar-pro/assets/images/avatars/9.jpg"></img>
                                                                    </div>
                                                                    <div className='widget-content-left'>
                                                                        <div className='widget-heading'>
                                                                            Ella-Rose Henry
                                                                        </div>
                                                                        <div className='widget-subheading'>
                                                                            Web
                                                                            Developer
                                                                        </div>
                                                                    </div>
                                                                    <div className='widget-content-right'>
                                                                        <div className='font-size-xlg'>
                                                                            <span>129</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className='list-group-item'>
                                                            <div className='widget-content p-0'>
                                                                <div className='widget-content-wrapper'>
                                                                    <div className='widget-content-left mr-3'>
                                                                        <img className='rounded-circle' width={42} src="https://demo.dashboardpack.com/kero-html-sidebar-pro/assets/images/avatars/9.jpg"></img>
                                                                    </div>
                                                                    <div className='widget-content-left'>
                                                                        <div className='widget-heading'>
                                                                            Ella-Rose Henry
                                                                        </div>
                                                                        <div className='widget-subheading'>
                                                                            Web
                                                                            Developer
                                                                        </div>
                                                                    </div>
                                                                    <div className='widget-content-right'>
                                                                        <div className='font-size-xlg'>
                                                                            <span>129</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>

                                                    </ul>

                                                    <div className="ps__rail-y" style={{ top: '92px', height: '150px', right: '0px' }}>
                                                        <div className="ps__thumb-y" tabIndex="0" style={{ top: '64px', height: 'auto' }}></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 col-lg-6 col-xl-7'>
                            <div className='mb-3 card'>
                                <div className='card-header-tab card-header'>
                                    <div className='card-header-tabr'>
                                        <div className='card-header-title'>
                                            <i className="bi bi-coin"></i>  Earning
                                            </div>

                                    </div>
                                    <div className='btn-actions-pane-right'>
                                        <div className='nav'>
                                            <a className={`border-0 btn-pill btn-wide btn-transition btn btn-outline-alternate ${activeTab2 === 'tab1' ? 'active' : ''}`} onClick={() => handleTabClick1('tab1')}>tab 1</a>
                                            <a className={`ml-1 btn-pill btn-wide border-0 btn-transition btn btn-outline-alternate ${activeTab2 === 'tab2' ? 'active' : ''}`} onClick={() => handleTabClick1('tab2')}>tab 2</a>
                                        </div>
                                    </div>
                                </div>
                                <div className='tab-content'>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;