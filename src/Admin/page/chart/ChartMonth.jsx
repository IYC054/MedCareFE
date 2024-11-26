import React from 'react';
import Chart from 'react-apexcharts';

const ChartMonth = () => {
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
      name: 'Leads',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 112, 130, 150],
    },
  ];

  return (
    <div className="chart">
      <Chart options={options} series={series} type="area" height={200} />
    </div>
  );
};

export default ChartMonth;
