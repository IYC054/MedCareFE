import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import token from '../../../api/token';

const ChartMonth = () => {
  const [chartData, setChartData] = useState(new Array(12).fill(0)); // Mảng 12 tháng, khởi tạo giá trị 0

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/appointment',{  headers: {
          Authorization: `Bearer ${token}`,
      },});
        const appointments = response.data;

        // Lấy năm hiện tại
        const currentYear = new Date().getFullYear();

        // Tính tổng số liệu của từng tháng trong năm hiện tại
        const monthlyData = new Array(12).fill(0);
        appointments.forEach(appointment => {
          const appointmentDate = new Date(appointment.date);
          const appointmentYear = appointmentDate.getFullYear();

          // Kiểm tra xem cuộc hẹn có thuộc năm hiện tại không
          if (appointmentYear === currentYear) {
            const monthIndex = appointmentDate.getMonth(); // Tháng từ 0 (Jan) đến 11 (Dec)
            monthlyData[monthIndex]++;
          }
        });

        setChartData(monthlyData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchMonthlyData();
  }, []);

  const options = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    grid: {
      show: false, // Tắt đường kẻ
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
  };

  const series = [
    {
      name: 'Appointments',
      data: chartData, // Sử dụng dữ liệu theo tháng
    },
  ];

  return (
    <div className="chart">
      <Chart options={options} series={series} type="area" height={280} />
    </div>
  );
};

export default ChartMonth;
