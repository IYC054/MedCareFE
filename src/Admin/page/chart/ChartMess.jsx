import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { getToken } from '../../../components/Authentication/authService';
import { Link } from 'react-router-dom';

function ChartMess() {
    const [chartData, setChartData] = useState({
        categories: [],
        series: []
    });

    useEffect(() => {
        const fetchPayments = async () => {
            const token = getToken();
            try {
                const response = await axios.get('http://localhost:8080/api/payments', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    // Lọc các giao dịch "Đã thanh toán"
                    const paidTransactions = response.data.filter(payment => payment.status === "Đã thanh toán");

                    // Lấy năm hiện tại và năm trước
                    const currentYear = new Date().getFullYear();
                    const lastYear = currentYear - 1;

                    // Tạo object chứa doanh thu từng tháng cho 2 năm
                    const revenueByMonth = {
                        [currentYear]: Array(12).fill(0),
                        [lastYear]: Array(12).fill(0)
                    };

                    // Lặp qua danh sách giao dịch và tổng hợp doanh thu theo tháng
                    paidTransactions.forEach(({ amount, transactionDate }) => {
                        const date = new Date(transactionDate);
                        const year = date.getFullYear();
                        const month = date.getMonth(); // Lấy chỉ số tháng (0-11)

                        if (revenueByMonth[year]) {
                            revenueByMonth[year][month] += amount;
                        }
                    });

                    // Cập nhật dữ liệu biểu đồ
                    setChartData({
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        series: [
                            { name: `${lastYear}`, data: revenueByMonth[lastYear], color: "#FF4560" },
                            { name: `${currentYear}`, data: revenueByMonth[currentYear], color: "#1A56DB" }
                        ]
                    });
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách thanh toán:", error);
            }
        };

        fetchPayments();
    }, []);

    const chartOptions = {
        chart: {
            type: "bar",
            height: "100%",
            fontFamily: "Inter, sans-serif",
            toolbar: { show: false },
            background: "#F9FAFB", // Nền sáng
        },
        plotOptions: {
            bar: {
                borderRadius: 6, // Bo góc cột
                columnWidth: "50%",
            },
        },
        series: chartData.series,
        xaxis: {
            categories: chartData.categories,
            labels: {
                style: {
                    colors: "#333", // Chữ đậm hơn
                    fontSize: "14px",
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => `${value.toLocaleString()} VND`,
                style: { colors: "#333", fontSize: "14px" },
            },
        },
        grid: {
            borderColor: "#E5E7EB", // Đường lưới nhạt hơn
        },
        dataLabels: { enabled: false },
        colors: ["#FFA726", "#4C9AFF"], // Cam sáng: năm trước, Xanh tươi: năm nay
        tooltip: {
            theme: "light",
            style: { fontSize: "14px", colors: "#333" },
        },
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h5 className="text-3xl font-bold text-gray-800 pb-2">
                So sánh doanh thu từng tháng ({new Date().getFullYear()} vs {new Date().getFullYear() - 1})
            </h5>

            <Chart options={chartOptions} series={chartOptions.series} type="bar" height={250} />

            <div className="border-t border-gray-300 mt-5 pt-5 flex justify-between items-center">
                <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    12 tháng qua
                </button>
                <Link to="/admin/transaction" className="uppercase text-sm font-semibold text-blue-500 hover:text-blue-700 px-3 py-2">
                    Xem báo cáo
                </Link>
            </div>
        </div>

    );
}

export default ChartMess;
