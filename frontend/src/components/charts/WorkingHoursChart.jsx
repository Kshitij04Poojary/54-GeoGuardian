import React from 'react';
import ReactApexChart from 'react-apexcharts';

class WorkingHoursChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'Average Working Hours',
                data: [7.5, 8.2, 8.0, 7.8, 8.5, 7.9, 8.3, 8.1, 7.7, 8.4, 8.0, 7.6, 8.2, 8.1, 7.9]
            }],
            options: {
                chart: {
                    height: 300,
                    type: 'bar',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                plotOptions: {
                    bar: {
                        borderRadius: 5,
                        columnWidth: '40%',
                        distributed: true,
                    }
                },
                colors: ['#3b82f6'], // Solid blue color
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [
                        '16 Sep', '17 Sep', '18 Sep', '19 Sep', '20 Sep',
                        '21 Sep', '22 Sep', '23 Sep', '24 Sep', '25 Sep',
                        '26 Sep', '27 Sep', '28 Sep', '29 Sep', '30 Sep'
                    ],
                    tickPlacement: 'on',
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    }
                },
                yaxis: {
                    show: false
                },
                grid: {
                    show: true,
                    borderColor: '#F1F3F5',
                    strokeDashArray: 3,
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
                annotations: {
                    yaxis: [{
                        y: 8,
                        strokeDashArray: 0,
                        borderColor: '#FF4560',
                        label: {
                            text: '8 Hrs',
                            borderColor: 'transparent',
                            textAnchor: 'start',
                            position: 'left',
                            offsetX: -35,
                            offsetY: 5,
                            style: {
                                color: '#FF4560',
                                background: 'transparent'
                            }
                        }
                    }]
                },
                legend: {
                    show: false,
                }
            }
            
        };
    }

    render() {
        return (
            <div className='px-8 py-8'>
                <div id="chart">
                    <h2 className='text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>Average Working Hours</h2>
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        height={300}
                    />
                </div>
            </div>
        );
    }
}

export default WorkingHoursChart;