import React from 'react';
import Chart from 'react-apexcharts';

const Chart12Months = () => {
    const data = {
        series: [
            {
                name: "Earnings",
                data: [12000, 15000, 10000, 20000, 18000, 22000, 30000, 25000, 27000, 23000, 19000, 24000],
            },
        ],
        options: {
            chart: { type: 'bar', height: 350 },
            xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
            fill: {
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.25,
                    gradientToColors: ['#F7B924', '#FBDC92'], // Gradient màu
                    inverseColors: false,
                    opacityFrom: 0.65,
                    opacityTo: 0.5,
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5, // Làm tròn góc thanh bar
                    horizontal: false, // Bar dọc
                },
            },
            title: {
                text: "Earnings by Month",
                align: 'center',
                style: {
                    fontSize: '16px',
                    color: '#333',
                },
            },
        },
    };

    return (
        <div className="widget-chart border-2 p-0">
            <Chart
                options={data.options}
                series={data.series}
                type="bar"
                height="330"
            />
        </div>
    );
};

export default Chart12Months;
