import React, { useEffect, useState } from 'react';
import '../scss/dashboard.scss';

import ChartMonth from './chart/ChartMonth';
import ChartWeek from './chart/ChartWeek';
import Chart12Months from './chart/Chart12Months';
import Chart1Week from './chart/Chart1Week';
import ChartMess from './chart/ChartMess';
import ChartMessSent from './chart/ChartMessSent';
import ChartMessInbox from './chart/ChartMessInbox';
import axios from 'axios';

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
    const [user, setUser] = useState([])
    const [book, setBook] = useState([])
    const [money, setMoney] = useState([])
    useEffect(() => {
        const fetch = async () => {

            const responseUser = await axios.get('http://localhost:8080/api/account');
            const filteredUsers = responseUser.data.result.filter(u => u.role === 'Patients');
            setUser(filteredUsers);

            const responseBook = await axios.get('http://localhost:8080/api/appointment');
            setBook(responseBook.data);
            const responseMoney = await axios.get('http://localhost:8080/api/payments');
            const filteredMoney = responseMoney.data.filter(payment => payment.status === 'Hoàn thành');
            const totalMoney = filteredMoney.reduce((sum, payment) => sum + payment.amount, 0);
            setMoney(totalMoney);

        };
        fetch();
    }, []);

    const [thisMonthIncome, setThisMonthIncome] = useState(0);
    const [lastMonthIncome, setLastMonthIncome] = useState(0);
    const [thisYearIncome, setThisYearIncome] = useState(0);
    const [lastYearIncome, setLastYearIncome] = useState(0);
    const [monthPercentChange, setMonthPercentChange] = useState(0);
    const [yearPercentChange, setYearPercentChange] = useState(0);

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/payments');
                const payments = response.data;

                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth();

                let monthData = { thisMonth: 0, lastMonth: 0 };
                let yearData = { thisYear: 0, lastYear: 0 };

                payments.forEach((payment) => {
                    const paymentDate = new Date(payment.transactionDate);
                    const paymentMonth = paymentDate.getMonth();
                    const paymentYear = paymentDate.getFullYear();

                    if (paymentYear === currentYear) {
                        if (paymentMonth === currentMonth) monthData.thisMonth += payment.amount;
                        if (paymentMonth === currentMonth - 1) monthData.lastMonth += payment.amount;
                        yearData.thisYear += payment.amount;
                    } else if (paymentYear === currentYear - 1) {
                        yearData.lastYear += payment.amount;
                    }
                });

                setThisMonthIncome(monthData.thisMonth);
                setLastMonthIncome(monthData.lastMonth);
                setThisYearIncome(yearData.thisYear);
                setLastYearIncome(yearData.lastYear);

                // Tính phần trăm thay đổi tháng và năm
                setMonthPercentChange(calculatePercentChange(monthData.thisMonth, monthData.lastMonth));
                setYearPercentChange(calculatePercentChange(yearData.thisYear, yearData.lastYear));
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchIncomeData();
    }, []);

    const calculatePercentChange = (thisAmount, lastAmount) => {
        if (lastAmount === 0) return 0;
        return ((thisAmount - lastAmount) / lastAmount) * 100;
    };

    return (
        <div className='app-inner-layout__content pb-10'>
            <div className='tab-content'>
                <div className='container-fluid'>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 '>
                        <div className='card mb-3 bg-night-fade text-white rounded-md '>
                            <div className='p-4 flex justify-between items-center'>
                                <div>
                                    <div className='text-xl font-semibold'>User</div>
                                    <div className='text-sm'>This month</div>
                                </div>
                                <div>
                                    <div className='text-2xl font-bold'>{user.length}</div>
                                </div>
                            </div>
                        </div>
                        <div className='card mb-3 bg-arielle-smile text-white rounded-md  '>
                            <div className='p-4 flex justify-between items-center'>
                                <div>
                                    <div className='text-xl font-semibold'>Booking</div>
                                    <div className='text-sm'>medical appointments this month</div>
                                </div>
                                <div>
                                    <div className='text-2xl font-bold'>{book.length}</div>
                                </div>
                            </div>
                        </div>
                        <div className='card mb-3 bg-happy-green text-white rounded-md '>
                            <div className='p-4 flex justify-between items-center'>
                                <div>
                                    <div className='text-xl font-semibold'>Income</div>
                                    <div className='text-sm'>This month</div>
                                </div>
                                <div>
                                    <div className='text-2xl font-bold'>{money} VNĐ</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='card flex-1 bg-white border-2 p-3'>
                            <div className='items-center mb-2 md:p-2 border-b-2 border-gray-300 font-bold text-sm text-[rgba(31,10,6,0.6)] bg-white whitespace-nowrap'>
                                <div className='flex justify-between'>
                                    <div className='text-xl'>
                                        <i className='bi bi-people'></i> User Book
                                    </div>
                                    <ul className="flex space-x-2">
                                        <li>
                                            <button
                                                className={`px-4 py-2 rounded-md ${activeTab === 'whole year' ? 'border-b-4 rounded-sm border-[#da624a] text-[#da624a]' : 'text-gray-500  hover:border-b-4 hover:rounded-sm hover:border-[#da624a] hover:text-[#da624a] transition-all duration-300'}`}
                                                onClick={() => handleTabClick('whole year')}
                                            >
                                                This Year
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`px-4 py-2 rounded-md ${activeTab === 'this month' ? 'border-b-4  rounded-sm border-[#da624a] text-[#da624a]' : 'text-gray-500  hover:border-b-4 hover:rounded-sm hover:border-[#da624a] hover:text-[#da624a]  transition-all duration-300'}`}
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
                                        <div className="pt-2 card-body">
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-4">
                                                {/* Monthly Income Progress Bar */}
                                                <div className="widget-content">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper flex items-center justify-between">
                                                            <div className="widget-content-left mr-6 pb-2">
                                                                <div className="widget-numbers text-2xl text-gray-500 font-bold">
                                                                    {monthPercentChange.toFixed(2)}%
                                                                </div>
                                                            </div>
                                                            <div className="content-right">
                                                                <div className="text-gray-500 text-xs opacity-60">
                                                                    Income Change This Month vs Last Month
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget-progress-wrapper">
                                                            <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
                                                                <div
                                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                                                    style={{ width: `${Math.min(monthPercentChange, 100)}%` }}
                                                                ></div>
                                                                {/* Continuous Glowing Effect */}
                                                                <div className="progress-glow"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Yearly Income Progress Bar */}
                                                <div className="widget-content">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper flex items-center justify-between">
                                                            <div className="widget-content-left mr-6 pb-2">
                                                                <div className="widget-numbers text-2xl text-gray-500 font-bold">
                                                                {yearPercentChange.toFixed(2)}%
                                                                </div>
                                                            </div>
                                                            <div className="content-right">
                                                                <div className="text-gray-500 text-xs opacity-60">
                                                                    Income This Year vs Last Year
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget-progress-wrapper">
                                                            <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
                                                                <div
                                                                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                                                                    style={{ width: `${Math.min(yearPercentChange, 100)}%`  }}
                                                                ></div>
                                                                {/* Continuous Glowing Effect */}
                                                                <div className="progress-glow"></div>
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

                    <div className='card-body mx-auto flex py-4 h-[300px] '>
                        <div className='w-full border-2 bg-white text-green-400  mr-4 pt-6 hover:drop-shadow-2xl'>
                            <div className="chart-title font-extrabold pl-6">
                                Received Messages
                            </div>
                            <div className="chart-placeholder ">
                                <ChartMess />
                            </div>
                        </div>
                        <div className='w-full border-2 bg-white text-red-400   mx-4 pt-6 hover:drop-shadow-2xl'>
                            <div className="chart-title  font-extrabold pl-6">
                                Sent Messages

                            </div>

                            <div className="chart-placeholder">
                                <ChartMessSent />
                            </div>
                        </div>
                        <div className='w-full border-2 bg-[#343a40] text-yellow-400  ml-4 pt-6 hover:drop-shadow-2xl'>
                            <div className="chart-title  font-extrabold pl-6">
                                Inbox Total

                            </div>

                            <div className="chart-placeholder">
                                <ChartMessInbox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Dashboard;
