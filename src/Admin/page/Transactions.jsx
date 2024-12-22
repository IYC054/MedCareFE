
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [appointmentsData, setFilteredAppointments] = useState([]);
    const [filteredPatient, setFilteredPatient] = useState([]);
    const [patient, setPatient] = useState([]);
    const [error, setError] = useState('');
    const [metrics, setMetrics] = useState({
        totalRevenue: 0,
        totalfail: 0,
        totalpending: 0,
        totalcashback: 0,
        totalTransactions: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const responsePayments = await axios.get('http://localhost:8080/api/payments');
                const paymentsData = responsePayments.data;

                // Extract appointment IDs from payments
                const appointmentIdsFromPayments = paymentsData.map((payment) => payment.appointment_id);

                // Fetch appointments
                const responseAppointments = await axios.get('http://localhost:8080/api/appointment');
                const appointmentsData = responseAppointments.data;
                setAppointment(appointmentsData);

                // Filter appointments matching IDs in payments
                const matchingAppointments = appointmentsData.filter((appointment) =>
                    appointmentIdsFromPayments.includes(appointment.id)
                );
                setFilteredAppointments(matchingAppointments);

                // Extract patient account IDs from matching appointments
                const patientAccountIds = matchingAppointments.map((appointment) => appointment.patient.account_id);

                // Fetch all patients
                const responsePatients = await axios.get('http://localhost:8080/api/account');
                const patientData = responsePatients.data.result;
                setPatient(patientData);

                // Filter patients matching account IDs
                const matchingPatients = patientData.filter((patient) =>
                    patientAccountIds.includes(patient.id)
                );
                setFilteredPatient(matchingPatients);

                // Get today's date to filter transactions
                const today = new Date();
                const startOfDay = new Date(today.setHours(0, 0, 0, 0));
                const endOfDay = new Date(today.setHours(23, 59, 59, 999));

                // Fetch transactions data
                const responseTransactions = await axios.get('http://localhost:8080/api/payments');
                const transactions = responseTransactions.data;

                // Filter transactions for today
                const todaysTransactions = transactions.filter((item) => {
                    const transactionDate = new Date(item.transactionDate);
                    return transactionDate >= startOfDay && transactionDate <= endOfDay;
                });

                // Limit to 50 transactions
                const limitedTransactions = todaysTransactions.slice(0, 50);

                // Calculate metrics
                const totalRevenue = limitedTransactions.reduce(
                    (sum, item) => (item.status === 'Hoàn thành' ? sum + item.amount : sum),
                    0
                );
                const successfulTransactions = limitedTransactions.filter(
                    (item) => item.status === 'Hoàn thành'
                ).length;

                const totalfail = limitedTransactions.reduce(
                    (sum, item) => (item.status === 'Thất bại' ? sum + item.amount : sum),
                    0
                );
                const failedTransactions = limitedTransactions.filter(
                    (item) => item.status === 'Thất bại'
                ).length;

                const totalpending = limitedTransactions.reduce(
                    (sum, item) => (item.status === 'Chờ xử lý' ? sum + item.amount : sum),
                    0
                );
                const pendingTransactions = limitedTransactions.filter(
                    (item) => item.status === 'Chờ xử lý'
                ).length;

                const totalcashback = limitedTransactions.reduce(
                    (sum, item) => (item.status === 'Hoàn tiền' ? sum + item.amount : sum),
                    0
                );
                const cashbackTransactions = limitedTransactions.filter(
                    (item) => item.status === 'Hoàn tiền'
                ).length;

                // Set metrics and transactions state
                setMetrics({
                    totalRevenue,
                    successfulTransactions,
                    pendingTransactions,
                    cashbackTransactions,
                    failedTransactions,
                    totalfail,
                    totalpending,
                    totalcashback,
                });
                console.log("Metrics updated:", {
                    totalRevenue,
                    successfulTransactions,
                    pendingTransactions,
                    cashbackTransactions,
                    failedTransactions,
                    totalfail,
                    totalpending,
                    totalcashback,
                });
                setTransactions(limitedTransactions);

            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const [transactionCode, setTransactionCode] = useState("");
    const [status, setStatus] = useState("");

    const [showForm, setShowForm] = useState(false);
    const resetFilters = () => {
        setStartDate(new Date());
        setEndDate(new Date());

        setTransactionCode("");
        setStatus("");
    };



    const [option, setOption] = useState("today");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const today = new Date();

    const handleOptionChange = (e) => {
        const selected = e.target.value;
        setOption(selected);


        const offset = 7 * 60; // Chênh lệch giờ của Việt Nam là GMT+7 (7 giờ so với UTC)

        // Đặt thời gian là 12:00 AM hôm nay
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);
        const formattedTodayStart = todayStart.toISOString().slice(0, 16);

        // Đặt thời gian là 11:59 PM hôm nay
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);
        const formattedTodayEnd = todayEnd.toISOString().slice(0, 16);

        // Ngày hôm qua (12:00 AM - 11:59 PM)
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStart = new Date(yesterday);
        yesterdayStart.setHours(0, 0, 0, 0);
        const formattedYesterdayStart = yesterdayStart.toISOString().slice(0, 16);
        const yesterdayEnd = new Date(yesterday);
        yesterdayEnd.setHours(23, 59, 59, 999);
        const formattedYesterdayEnd = yesterdayEnd.toISOString().slice(0, 16);

        // 7 ngày trước (12:00 AM - 11:59 PM hôm nay)
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 6);
        const last7DaysStart = new Date(last7Days);
        last7DaysStart.setHours(0, 0, 0, 0);
        const formattedLast7DaysStart = last7DaysStart.toISOString().slice(0, 16);
        const formattedLast7DaysEnd = formattedTodayEnd;

        // Tháng này (12:00 AM đầu tháng - 11:59 PM hôm nay)
        const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        firstDayThisMonth.setMinutes(firstDayThisMonth.getMinutes() + offset);
        firstDayThisMonth.setHours(0, 0, 0, 0);
        const formattedFirstDayThisMonthStr = firstDayThisMonth.toISOString().slice(0, 16);

        // Tháng trước (12:00 AM đầu tháng trước - 11:59 PM cuối tháng trước)
        const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        const formattedFirstDayLastMonthStr = firstDayLastMonth.toISOString().slice(0, 16);
        const formattedLastDayLastMonthStr = lastDayLastMonth.toISOString().slice(0, 16);

        // Chọn theo trường hợp
        switch (selected) {
            case "today":
                setStartDate(formattedTodayStart);
                setEndDate(formattedTodayEnd);
                break;
            case "yesterday":
                setStartDate(formattedYesterdayStart);
                setEndDate(formattedYesterdayEnd);
                break;
            case "last7days":
                setStartDate(formattedLast7DaysStart);
                setEndDate(formattedLast7DaysEnd);
                break;
            case "thisMonth":
                setStartDate(formattedFirstDayThisMonthStr);
                setEndDate(formattedTodayEnd);
                break;
            case "lastMonth":
                setStartDate(formattedFirstDayLastMonthStr);
                setEndDate(formattedLastDayLastMonthStr);
                break;
            default:
                break;
        }

    }
    const applyFilters = () => {
     
       
    
        // Filter transactions with the given statuses
        const filteredTransactions = transactions.filter(item =>
            ["Hoàn thành", "Thất bại", "Chờ xử lý", "Hoàn tiền"].includes(item.status)
        );
    
        // Slice to limit results to the first 50 items
        const limitedTransactions = filteredTransactions.slice(0, 50);
    
        // Calculate metrics based on limited transactions
        const totalRevenue = limitedTransactions.reduce(
            (sum, item) => (item.status === 'Hoàn thành' ? sum + item.amount : sum),
            0
        );
        const successfulTransactions = limitedTransactions.filter(
            (item) => item.status === 'Hoàn thành'
        ).length;
    
        const totalfail = limitedTransactions.reduce(
            (sum, item) => (item.status === 'Thất bại' ? sum + item.amount : sum),
            0
        );
        const failedTransactions = limitedTransactions.filter(
            (item) => item.status === 'Thất bại'
        ).length;
    
        const totalpending = limitedTransactions.reduce(
            (sum, item) => (item.status === 'Chờ xử lý' ? sum + item.amount : sum),
            0
        );
        const pendingTransactions = limitedTransactions.filter(
            (item) => item.status === 'Chờ xử lý'
        ).length;
    
        const totalcashback = limitedTransactions.reduce(
            (sum, item) => (item.status === 'Hoàn tiền' ? sum + item.amount : sum),
            0
        );
        const cashbackTransactions = limitedTransactions.filter(
            (item) => item.status === 'Hoàn tiền'
        ).length;
    
        // Update the state with the new metrics
        setMetrics({
            totalRevenue,
            successfulTransactions,
            pendingTransactions,
            cashbackTransactions,
            failedTransactions,
            totalfail,
            totalpending,
            totalcashback,
        });
    
        console.log("Metrics updated:", {
            totalRevenue,
            successfulTransactions,
            pendingTransactions,
            cashbackTransactions,
            failedTransactions,
            totalfail,
            totalpending,
            totalcashback,
        });
    
        // Log parameters for debugging purposes
        console.log({
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            transactionCode,
            status,
        });
    
        // Create params for the API request
        const params = new URLSearchParams();
    
        if (startDate) params.append('startDate', formatDate(startDate)); // Convert to 'YYYY-MM-DD'
        if (endDate) params.append('endDate', formatDate(endDate));       // Convert to 'YYYY-MM-DD'
        if (transactionCode) params.append('paymentId', transactionCode);
        if (status) params.append('status', status); // No need to encodeURIComponent
    
        const apiUrl = `http://localhost:8080/api/payments/filter?${params.toString()}`;

        axios
            .get(apiUrl)
            .then((response) => {
                setTransactions(response.data);  // Update state with new transaction data
                console.log("Filtered transactions from API:", response.data);
            })
            .catch((error) => console.error(error));
            
    };
    


    const navigate = useNavigate();
    const formatDate = (date) => (date ? format(date, "yyyy-MM-dd") : "");
    const handleDetailClick = (id) => {
        navigate(`/admin/transaction/detail/${id}`);
    };
    console.log(transactions)
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" flex justify-between items-center bg-[#e5f6fd] py-2 px-4 rounded-md mb-2">
                <div className="font-bold text-black">50 LATEST TRANSACTIONS OF THE DAY</div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="border-2 bg-[#d82d8b] text-white rounded-md px-5 py-1 hover:bg-[#b5236b] transition duration-300"
                >
                    <i className={`bi ${showForm ? 'bi-x-circle-fill' : 'bi-funnel-fill'}`}></i>
                </button>

            </div>

            {/* Filter Form */}
            {showForm && (
                <div className=" bg-white border border-gray-200 p-5 rounded-lg shadow-md mb-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-10">
                        {/* Thời gian */}
                        <div className='relative'>
                            <label className="block text-sm font-medium text-gray-500 mb-1 absolute ml-2 bg-[#fff]">
                                Time
                            </label>
                            <select
                                value={option}
                                onChange={handleOptionChange}
                                className="w-full border-gray-300 rounded-md p-2 text-sm mb-4 mt-3 border-2"
                            >
                                <option value="today">Hôm nay</option>
                                <option value="yesterday">Hôm qua</option>
                                <option value="last7days">7 ngày trước</option>
                                <option value="thisMonth">Tháng này</option>
                                <option value="lastMonth">Tháng trước</option>
                                <option value="custom">Tùy chỉnh</option>
                            </select>
                            <div className='relative w-96'>
                                {option === "custom" && (
                                    <div className="flex items-center ">

                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            showTimeSelect
                                            startDate={startDate}
                                            endDate={endDate}
                                            maxDate={today}
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            className="w-full border-gray-300 rounded-md p-2 text-sm  border-2"

                                        />
                                        <span className="mx-2 text-gray-600">-</span>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            showTimeSelect
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate || today}
                                            maxDate={today}
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            className="w-full border-gray-300 rounded-md p-2 text-sm  border-2"
                                        />
                                    </div>
                                )}
                                <div className="mt-4">
                                    <p className="text-sm text-gray-700">
                                        <strong>Bắt đầu:</strong> {startDate.toLocaleString("vi-VN")}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Kết thúc:</strong> {endDate.toLocaleString("vi-VN")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Mã giao dịch */}
                        <div className='relative h-10'>
                            <label className="block text-sm font-medium text-gray-500 mb-1 absolute ml-2 bg-[#fff] ">Transaction code</label>
                            <input
                                type="text"
                                placeholder="Transaction code"
                                maxLength={20}
                                className="w-full border-gray-300 rounded-md p-2 text-sm border-2  mt-3"
                                value={transactionCode}
                                onChange={(e) => setTransactionCode(e.target.value)}
                            />
                        </div>

                        {/* Trạng thái */}
                        <div className='relative'>
                            <label className="block text-sm font-medium text-gray-500 mb-1 absolute ml-2 bg-[#fff]">Status</label>
                            <select
                                className="w-full border-gray-300 rounded-md p-2 text-sm border-2 mt-3"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="Hoàn thành">Hoàn thành</option>
                                <option value="Chờ xử lý">Chờ xử lý</option>
                                <option value="Thất bại">Thất bại</option>
                            </select>
                        </div>


                    </div>

                    <div className="flex justify-end space-x-3 mt-5">
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Đặt lại
                        </button>
                        <button
                            onClick={applyFilters}
                            className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600"
                        >
                            Áp dụng
                        </button>
                    </div>
                </div>

            )}


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 border-1 bg-[#fdeef4] rounded-lg p-3">
                        <i className="bi bi-bank px-3 text-lg"></i>TOTAL REVENUE
                    </div>
                    <div className='flex align-center justify-between'>
                        <div className="text-md text-gray-600 pl-4 pr-4 text-center py-3">
                            <div className="font-normal">value</div>
                            <div className="font-bold text-gray-800">
                                {metrics.totalRevenue.toLocaleString()}
                                <span className="text-sm pl-0.5">₫</span>
                            </div>
                        </div>
                        <div className="h-12 w-px bg-gray-100 mx-4 my-3 "></div>
                        <div className="text-md text-gray-600 pl-4 pr-4 text-center py-3">
                            <div className="font-normal">Quanlity</div>
                            <div className="font-bold text-gray-800">
                                {metrics.successfulTransactions}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 border-1 bg-[#fff9e2] rounded-lg p-3">
                        <i className="bi bi-arrow-counterclockwise text-yellow-700 px-3 text-lg"></i>CASHBACK TRANSACTIONS
                    </div>
                    <div className='flex align-center justify-between'>
                        <div className="text-md text-gray-600 pl-4 pr-4 text-center py-3">
                            <div className="font-normal">value</div>
                            <div className="font-bold text-gray-800">
                                {metrics.totalcashback.toLocaleString()}
                                <span className="text-sm pl-0.5">₫</span>
                            </div>
                        </div>
                        <div className="h-12 w-px bg-gray-100 mx-4 my-3 "></div>
                        <div className="text-md text-gray-600 pl-4 pr-4 text-center py-3">
                            <div className="font-normal">Quanlity</div>
                            <div className="font-bold text-gray-800">
                                {metrics.cashbackTransactions}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 border-1 bg-[#ffefdd] rounded-lg p-3">
                        <i className="bi bi-clock-history text-orange-700 px-3 text-lg"></i>PENDING TRANSACTION
                    </div>
                    <div className='flex align-center justify-between'>
                        <div className="text-md text-gray-600 pl-4 pr-4 text-center py-3">
                            <div className="font-normal">value</div>
                            <div className="font-bold text-gray-800">
                                {metrics.totalpending.toLocaleString()}
                                <span className="text-sm pl-0.5">₫</span>
                            </div>
                        </div>
                        <div className="h-12 w-px bg-gray-100 mx-4 my-3 "></div>
                        <div className="text-md text-gray-600 pl-4 pr-4 text-center py-3">
                            <div className="font-normal">Quanlity</div>
                            <div className="font-bold text-gray-800">
                                {metrics.pendingTransactions}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 border-1 bg-[#ffebe9] rounded-lg p-3">
                        <i className="bi bi-exclamation-circle px-3 text-red-700 text-lg"></i>TRANSACTIONS FAILED
                    </div>
                    <div className='flex align-center justify-between'>
                        <div className="text-md text-gray-600 pl-4 pr-4 text-center py-3">
                            <div className="font-normal">value</div>
                            <div className="font-bold text-gray-800">
                                {metrics.totalfail.toLocaleString()}
                                <span className="text-sm pl-0.5">₫</span>
                            </div>
                        </div>
                        <div className="h-12 w-px bg-gray-100 mx-4 my-3 "></div>
                        <div className="text-md text-gray-600 pl-4 pr-4 text-center py-3">
                            <div className="font-normal">Quanlity</div>
                            <div className="font-bold text-gray-800">
                                {metrics.failedTransactions}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-4 flex justify-between items-center border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[#da624a]">List Transaction</h2>

                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left p-4 text-sm font-medium text-gray-500">STT</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Transaction code</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Date and time</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Payment method</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Phone number</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Customer name</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Transaction value (VND)</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((t, index) => {
                                    // Find the matching patient for each transaction
                                    const transactionAppointment = appointmentsData.find((appointment) => appointment.id === t.appointment_id);

                                    // If appointment exists, find the matching patient by appointment's patient.account_id
                                    const matchingPatient = transactionAppointment
                                        ? filteredPatient.find((patient) => patient.id === transactionAppointment.patient.account_id)
                                        : null;

                                    return (
                                        <tr key={t.id} className="border-b">
                                            <td className="p-4 text-sm">{index + 1}</td>
                                            <td className="p-4 text-sm">{t.transactionCode}</td>
                                            <td className="p-4 text-sm">{new Date(t.transactionDate).toLocaleString()}</td>
                                            <td className="p-4 text-sm">{t.paymentMethod}</td>
                                            <td className="p-4 text-sm">{matchingPatient ? matchingPatient.phone : 'N/A'}</td>
                                            <td className="p-4 text-sm">{matchingPatient ? matchingPatient.name : 'N/A'}</td>
                                            <td className="p-4 text-sm">{t.amount} ₫</td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2 py-1 rounded text-sm ${t.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button className="text-sm text-[#da624a] hover:underline" onClick={() => handleDetailClick(t.id)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="p-6 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="mb-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-10 h-10 text-gray-300"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.75 9V5.25M8.25 9V5.25M3 13.5h18M4.5 6.75h15m-2.25 3.75a6 6 0 11-12 0 6 6 0 0112 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">No data</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    );
}

export default Transactions;
