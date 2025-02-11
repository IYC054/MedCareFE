import React from 'react';
import Chart from 'react-apexcharts';
import { getToken } from '../../../components/Authentication/authService';

function ChartMess() {
      const token = getToken();
    const data = {
        series: [
            {
                name: 'Earnings',
                data: [120, 150, 180, 200, 170, 220, 250],
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 350,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                curve: 'smooth',
                colors: ['#34D399'],
                width: 4,
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                labels: {
                    show: false, // Ẩn nhãn trục x
                },
                 axisBorder: {
                    show: false, // Ẩn đường viền trục X
                },
                axisTicks: {
                    show: false, // Ẩn các dấu tick của trục X
                },
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            grid: {
                show: false,
                
            },
            tooltip: {
                enabled: true,
            },
            fill: {
                type: 'gradient', 
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    gradientToColors: ['#34D399'],
                    opacityFrom: 0.5, 
                    opacityTo: 0, 
                    stops: [0, 100],
                },
            },
            legend: {
                show: false,
            },
        },
    };

    return (
        <div className="container mx-auto relative h-[200px] ">
            <div className="absolute top-4 left-4  font-normal text-3xl p-2">
                348
            </div>
            <Chart  options={data.options} series={data.series} type="area" height="100%" />
        </div>
    );
}

export default ChartMess;
