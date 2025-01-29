import React, { useState, useRef, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const RadialChart = ({ value }) => {
  const chartRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Ensure `value` is valid and within range (0-100)
    if (value < 0 || value > 100) return;

    if (currentValue < value) {
      const interval = setInterval(() => {
        setCurrentValue((prevValue) => {
          if (prevValue + 0.9 >= value) { // Smaller increment for smoother transition
            clearInterval(interval);
            return value;
          }
          return prevValue + 0.9; // Increment by 0.5 for smoother progress
        });
      }, 1); // Slightly faster interval to make it more fluid

      return () => clearInterval(interval);
    }
  }, [value, currentValue]);

  const options = {
    chart: {
      height: 300,
      type: 'radialBar',
      offsetY: -10,
      animations: {
        enabled: true, // Enable chart animations
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetX: 0,
            offsetY: 0,
            fontSize: '24px',
            color: '#333',
            formatter: (val) => `${Math.round(val)}%`, // Round the value for cleaner display
          },
        },
        hollow: {
          size: '70%',
          background: 'transparent',
        },
        track: {
          background: '#e0e0e0',
        },
      },
    },
    fill: {
      colors: ['#0000FF'], // Solid blue color
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [],
  };

  return (
    <div>
      <div id="chart">
        <ApexCharts
          ref={chartRef}
          options={options}
          series={[currentValue]} // Update series with currentValue
          type="radialBar"
          height={300}
        />
      </div>
    </div>
  );
};

export default RadialChart;
