import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const Chart1Week = () => {
  const [weeklyData, setWeeklyData] = useState(new Array(7).fill(0)); // Mảng dữ liệu cho 7 ngày

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/payments');
        const payments = response.data;

        const currentDate = new Date();
        const currentWeekDay = currentDate.getDay(); // Số thứ tự của ngày trong tuần (0 = Sunday)
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentWeekDay); // Ngày đầu tiên của tuần (Sunday)

        const endOfWeek = new Date(currentDate);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Ngày cuối cùng của tuần (Saturday)

        const dailyData = new Array(7).fill(0);

        payments.forEach((payment) => {
          const paymentDate = new Date(payment.transactionDate); // Đúng trường JSON API
          if (paymentDate >= startOfWeek && paymentDate <= endOfWeek && payment.status === 'Hoàn thành') {
            const dayIndex = paymentDate.getDay(); // Duy trì thứ tự mặc định (0 = Sunday, 6 = Saturday)
            dailyData[dayIndex] += payment.amount; // Cộng dồn `amount` cho ngày tương ứng
          }
        });

        setWeeklyData(dailyData);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchWeeklyData();
  }, []);

  const data = {
    series: [
      {
        name: 'Earnings',
        data: weeklyData, // Sử dụng dữ liệu trong tuần
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#fff'],
        },
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Duy trì đúng tuần lịch Mỹ
      },
      grid: {
        show: true,
        borderColor: '#eee',
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
    },
  };

  return (
    <div className="widget-chart border-2 ">
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height="330"
      />
    </div>
  );
};

export default Chart1Week;
