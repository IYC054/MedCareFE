import React from 'react';
import Chart from 'react-apexcharts';

const Chart1Week = () => {
    const data = {
        series: [
            {
                name: 'Earnings',
                data: [120, 150, 180, 200, 170, 220, 250], // Dữ liệu từng ngày trong tuần
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                zoom: {
                    enabled: false, // Zoom không cần thiết cho tuần
                },
            },
            dataLabels: {
                enabled: true, // Hiển thị thông số
                style: {
                    colors: ['#fff'], // Màu chữ của thông số
                },
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Danh mục theo tuần
                title: {
                    text: "Days of the Week",
                },
            },
            grid: {
                show: true, // Hiển thị lưới
                borderColor: '#eee', // Màu lưới nhạt
            },
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
                text: "Earnings by Week",
                align: 'center',
                style: {
                    fontSize: '16px',
                    color: '#333',
                },
            },
        },
    };

    return (
        <div className="widget-chart p-0">
            <Chart
                options={data.options}
                series={data.series}
                type="bar"
                height="350"
            />
        </div>
    );
};

export default Chart1Week;
