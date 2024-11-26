import React from 'react';
import Chart from 'react-apexcharts';

const ChartWeek = () => {
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
      name: 'Leads',
      data: [30, 20, 15, 30, 25, 40, 35],
    },
  ];

  return (
    <div className="chart">
      <Chart options={options} series={series} type="area" height={200} />
    </div>
  );
};

export default ChartWeek;
