import React from 'react';
import ApexCharts from 'react-apexcharts';

const checkInData = [
    { y: "08:00", x: "16/9" },
    { y: "08:15", x: "17/9" },
    { y: "08:15", x: "18/9" },
    { y: "08:45", x: "19/9" },
    { y: "09:00", x: "20/9" },
    { y: "08:30", x: "21/9" },
    { y: "08:45", x: "22/9" },
    { y: "09:00", x: "23/9" },
    { y: "09:15", x: "24/9" },
    { y: "09:30", x: "25/9" },
    { y: "08:15", x: "26/9" },
    { y: "08:30", x: "27/9" },
    { y: "08:45", x: "28/9" },
    { y: "09:00", x: "29/9" },
    { y: "09:15", x: "30/9" }
];

// const checkOutData = [
//     { y: "17:30", x: "16/9" },
//     { y: "19:00", x: "17/9" },
//     { y: "19:15", x: "18/9" },
//     { y: "18:15", x: "19/9" },
//     { y: "20:20", x: "20/9" },
//     { y: "18:10", x: "21/9" },
//     { y: "18:40", x: "22/9" },
//     { y: "19:00", x: "23/9" },
//     { y: "19:00", x: "24/9" },
//     { y: "19:30", x: "25/9" },
//     { y: "17:15", x: "26/9" },
//     { y: "18:30", x: "27/9" },
//     { y: "18:25", x: "28/9" },
//     { y: "18:10", x: "29/9" },
//     { y: "19:15", x: "30/9" }
// ];

const TimesSeries = () => {
    const yAxisLabels = [
        "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30",
        "17:00", "17:30", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30"
    ];

    const commonOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            animations: {
                enabled: false,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        markers: {
            size: 4,
            strokeWidth: 2,
            strokeColors: ['#fff'],
            hover: {
                size: 8,
            },
        },
        xaxis: {
            categories: checkInData.map(d => d.x),
            labels: {
                style: {
                    colors: '#9BA1A6',
                    fontSize: '8px',
                },
                rotate: -45,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: true,
            },
            offsetX: 0,
        },
        yaxis: {
            labels: {
                formatter: (value) => value,
                style: {
                    colors: '#9BA1A6',
                    fontSize: '10px',
                },
            },
            axisBorder: {
                show: false,
            },
            tickAmount: 5,
            categories: yAxisLabels,
        },
        grid: {
            show: true,
            borderColor: '#F1F3F5',
            strokeDashArray: 3,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return '<div class="px-2 py-1 bg-black text-white">' +
                    '<span>' + series[seriesIndex][dataPointIndex] + ' hrs</span>' +
                    '</div>'
            },
        },
        colors: ['#3b82f6'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#a855f7'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            },
        },
    };

    return (
        <div className='px-4 py-6 rounded-lg flex flex-wrap justify-around item-center gap-2'>
            <div className='flex-1 p-2 min-w-[300px]'>
                <h2 className='text-xl font-semibold text-gray-700'>Average Funds</h2>
                <ApexCharts
                    options={commonOptions}
                    series={[{ data: checkInData }]}
                    type="line"
                    height={250}
                />
            </div>
            {/* <div className='flex-1 p-2 min-w-[300px]'>
                <h2 className='text-xl font-semibold text-gray-700'>Average Check Out</h2>
                <ApexCharts
                    options={commonOptions}
                    series={[{ data: checkOutData }]}
                    type="line"
                    height={250}
                />
            </div> */}
        </div>
    );
};

export default TimesSeries;