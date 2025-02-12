import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { getToken } from '../../../components/Authentication/authService';


const Chart12Months = () => {
    const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0)); // Mảng chứa tổng doanh thu của 12 tháng
  const token = getToken();
    useEffect(() => {
        const fetchMonthlyData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/payments', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const payments = response.data;

                const currentYear = new Date().getFullYear();
                const monthlyTotals = new Array(12).fill(0);

                payments.forEach((payment) => {
                    const paymentDate = new Date(payment.transactionDate); // Đảm bảo sử dụng `transactionDate`
                    if (paymentDate.getFullYear() === currentYear && payment.status === 'Hoàn thành') {
                        const month = paymentDate.getMonth(); // 0 (Jan) -> 11 (Dec)
                        monthlyTotals[month] += payment.amount; // Cộng dồn doanh thu theo tháng
                    }
                });

                setMonthlyData(monthlyTotals);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchMonthlyData();
    }, []);

    const data = {
        series: [
            {
                name: 'Earnings',
                data: monthlyData, // Dữ liệu doanh thu theo tháng
            },
        ],
        options: {
            chart: { type: 'bar', height: 350 },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            fill: {
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.25,
                    gradientToColors: ['#F7B924', '#FBDC92'],
                    inverseColors: false,
                    opacityFrom: 0.65,
                    opacityTo: 0.5,
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    horizontal: false,
                },
            },
            dataLabels: {
                enabled: true,
                style: {
                    colors: ['#000'], // Hiển thị nhãn trên cột màu đen
                },
            },
            grid: {
                show: true,
                borderColor: '#ccc',
            },
        },
    };

    return (
        <div className="widget-chart border-2 p-0">
            <Chart options={data.options} series={data.series} type="bar" height="330" />
        </div>
    );
};

export default Chart12Months;
