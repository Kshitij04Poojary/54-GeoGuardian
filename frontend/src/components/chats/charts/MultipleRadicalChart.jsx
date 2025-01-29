import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MultipleRadialChart = () => {
  const [series] = useState([32, 24, 44, 17]);
  const sum = series.reduce((acc, curr) => acc + curr, 0);
  
  const [options] = useState({
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: (w) => {
              return sum; // Show the total sum here
            },
          },
        },
        track: {
          background: '#f2f2f2',
        },
      },
    },
    // Colors for radial segments
    colors: ['#1E90FF', '#00BFFF', '#4682B4', '#5F9EA0'],
    labels: ['Food', 'Water', 'Medical Supplies', 'Shelter'],
    stroke: {
      lineCap: 'round',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#1E90FF', '#00BFFF', '#4682B4', '#5F9EA0'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    // Tooltip configuration to display the actual value
    tooltip: {
      y: {
        formatter: (value) => value, // Show the actual value (not percentage)
      },
    },
    legend: {
      show: true,
      position: 'bottom', // Legend position (could be 'top', 'bottom', 'left', or 'right')
      horizontalAlign: 'center', // Horizontal alignment ('left', 'center', 'right')
      floating: false, // Set to true if you want a floating legend
      fontSize: '14px', // Font size of the legend text
      fontFamily: 'Arial', // Font family of the legend text
      labels: {
        colors: '#9BA1A6', // Text color of the legend labels
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12, // Circular marker for each legend item
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default MultipleRadialChart;
