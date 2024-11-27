import React, { useState } from 'react';
import '../scss/dashboard.scss';
import ChartMonth from './chart/ChartMonth';
import ChartWeek from './chart/ChartWeek';
import Chart12Months from './chart/Chart12Months';
import Chart1Week from './chart/Chart1Week';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('this month');
    const [activeTab2, setActiveTab2] = useState('tab2');
    const [activeChart, setActiveChart] = useState('this week');
    const [activeChart2, setActiveChart2] = useState('tab2');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setActiveChart(tab);
    };

    const handleTabClick1 = (tab) => {
        setActiveTab2(tab);
        setActiveChart2(tab);
    };

    return (
        <div className='app-inner-layout__content pb-10'>
            <div className='tab-content'>
                <div className='container-fluid'>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                        <div className='card mb-3 bg-night-fade text-white'>
                            <div className='p-4 flex justify-between items-center'>
                                <div>
                                    <div className='text-xl font-semibold'>User</div>
                                    <div className='text-sm'>This month</div>
                                </div>
                                <div>
                                    <div className='text-2xl font-bold'>189</div>
                                </div>
                            </div>
                        </div>
                        <div className='card mb-3 bg-arielle-smile text-white'>
                            <div className='p-4 flex justify-between items-center'>
                                <div>
                                    <div className='text-xl font-semibold'>Booking</div>
                                    <div className='text-sm'>medical appointments this month</div>
                                </div>
                                <div>
                                    <div className='text-2xl font-bold'>249</div>
                                </div>
                            </div>
                        </div>
                        <div className='card mb-3 bg-happy-green text-white'>
                            <div className='p-4 flex justify-between items-center'>
                                <div>
                                    <div className='text-xl font-semibold'>Income</div>
                                    <div className='text-sm'>This month</div>
                                </div>
                                <div>
                                    <div className='text-2xl font-bold'>$589</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='card flex-1 bg-white border-2 p-3'>
                            <div className='card-header'>
                                <div className='flex justify-between'>
                                    <div className='text-xl'>
                                        <i className='bi bi-people'></i> User Book
                                    </div>
                                    <ul className="flex space-x-2">
                                        <li>
                                            <button
                                                className={`px-4 py-2 rounded-md ${activeTab === 'whole year' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
                                                onClick={() => handleTabClick('whole year')}
                                            >
                                                This Year
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`px-4 py-2 rounded-md ${activeTab === 'this month' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
                                                onClick={() => handleTabClick('this month')}
                                            >
                                                This Week
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='tab-content'>
                                    <div className='tab-pane fade active show' id="tabs-eg-77">
                                        <div className='card mb-3 widget-chart text-left border-2'>
                                            <div className='p-3'>
                                                <div className='flex items-center'>
                                                    <div>
                                                        <span>{activeTab === 'this month' ? '50' : '213'}</span>
                                                    </div>
                                                    <div className='ml-2 text-sm text-gray-500'>
                                                        total
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='m-0 '>
                                                <div className='widget-chart-wrapper '>
                                                    <div className='light'>
                                                        {activeChart === 'this month' ? <ChartWeek /> : <ChartMonth />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className='text-sm text-gray-500 font-semibold uppercase'>
                                            Top Authors
                                        </h6>
                                        <div className='space-y-2 max-h-40 overflow-y-auto pt-2 '>
                                            {[...Array(4)].map((_, index) => (
                                                <div key={index} className='flex items-center justify-between space-x-3'>
                                                    <div className='flex' >
                                                        <img
                                                            className='rounded-full w-10 h-10 m-2'
                                                            src="https://demo.dashboardpack.com/kero-html-sidebar-pro/assets/images/avatars/9.jpg"
                                                            alt="Avatar"
                                                        />
                                                        <div>
                                                            <div className="font-semibold">Ella-Rose Henry</div>
                                                            <div className="text-sm text-gray-500">Web Developer</div>
                                                        </div>
                                                    </div>
                                                    <div className="ml-24 font-semibold">129</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='card w-100 h-350 border-2 bg-white'>
                            <div className='card-header'>
                                <div className='flex justify-between pt-6'>
                                    <div className='text-xl'>
                                        <i className="bi bi-coin"></i> Earning
                                    </div>
                                    <ul className='flex space-x-2'>
                                        <li>
                                            <button
                                                className={`px-4 py-2 rounded-md ${activeTab2 === 'tab1' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
                                                onClick={() => handleTabClick1('tab1')}
                                            >
                                                This year
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`px-4 py-2 rounded-md ${activeTab2 === 'tab2' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
                                                onClick={() => handleTabClick1('tab2')}
                                            >
                                                This Week
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='tab-content'>
                                    <div className='tab-pane fade active show'>
                                        <div className='widget-chart p-3'>
                                            {activeChart2 === 'tab1' ? <Chart12Months /> : <Chart1Week />}
                                        </div>
                                        <div class="pt-2 card-body">
                                            <div class="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

                                                <div class="widget-content">
                                                    <div class="widget-content-outer">
                                                        <div class="widget-content-wrapper flex items-center justify-between">
                                                            <div class="widget-content-left">
                                                                <div class="widget-numbers text-3xl text-gray-500">
                                                                    63%
                                                                </div>
                                                            </div>
                                                            <div class="widget-content-right">
                                                                <div class="text-gray-500 opacity-60">
                                                                    Generated Leads
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="widget-progress-wrapper mt-2">
                                                            <div class="progress-bar-sm progress-bar-animated-alt">
                                                                <div class="progress-bar bg-red-600" role="progressbar" aria-valuenow="63" aria-valuemin="0" aria-valuemax="100" style={{width: 63}}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="widget-content">
                                                    <div class="widget-content-outer">
                                                        <div class="widget-content-wrapper flex items-center justify-between">
                                                            <div class="widget-content-left">
                                                                <div class="widget-numbers text-3xl text-gray-500">
                                                                    32%
                                                                </div>
                                                            </div>
                                                            <div class="widget-content-right">
                                                                <div class="text-gray-500 opacity-60">
                                                                    Submitted Tickers
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="widget-progress-wrapper mt-2">
                                                            <div class="progress-bar-sm progress-bar-animated-alt">
                                                                <div class="progress-bar bg-green-600" role="progressbar" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100" style={{width: 32}}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
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
