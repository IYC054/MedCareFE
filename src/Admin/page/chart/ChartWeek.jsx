import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import token from '../../../api/token';

const ChartWeek = () => {
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/appointment',{  headers: {
          Authorization: `Bearer ${token}`,
      },});
        const appointments = response.data;

        // Tính ngày đầu tuần (Thứ Hai) và ngày cuối tuần (Chủ Nhật)
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Thứ Hai
        const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6)); // Chủ Nhật

        // Đặt mốc thời gian của ngày đầu và cuối tuần để dễ so sánh
        firstDayOfWeek.setHours(0, 0, 0, 0);
        lastDayOfWeek.setHours(23, 59, 59, 999);

        // Lọc các cuộc hẹn chỉ trong tuần hiện tại
        const filteredAppointments = appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= firstDayOfWeek && appointmentDate <= lastDayOfWeek;
        });

        // Tính số lượng cuộc hẹn trong tuần theo từng ngày
        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const appointmentCounts = new Array(7).fill(0);

        filteredAppointments.forEach(appointment => {
          const date = new Date(appointment.date);
          const dayIndex = date.getDay(); // 0 (Sun) to 6 (Sat)
          const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Map Sun (0) to 6, Mon (1) to 0
          appointmentCounts[mappedIndex]++;
        });

        setChartData(appointmentCounts);
      } catch (error) {
        console.error('Failed to fetch appointments', error);
      }
    };

    fetchAppointments();
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
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    grid: {
      show: false, // Tắt đường kẻ
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: ['#28C76F', '#A9F8C7'],
        inverseColors: false,
        opacityFrom: 0.65,
        opacityTo: 0.5,
      },
    },
  };

  const series = [
    {
      name: 'Appointments',
      data: chartData, // Use dynamic data here
    },
  ];

  return (
    <div className="chart">
      <Chart options={options} series={series} type="area" height={280} />
    </div>
  );
};

export default ChartWeek;
