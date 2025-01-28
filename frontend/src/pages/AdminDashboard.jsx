import React from "react";
import Chart from "react-apexcharts";
import { BsClockHistory } from "react-icons/bs";
import { FaAppleAlt, FaUsers, FaTshirt, FaFirstAid, FaRupeeSign, FaCheckCircle, FaHandsHelping, FaMapPin } from 'react-icons/fa';
// import building from "../assets/img/building.png";
// import teams from "../assets/img/teams.png";
// import activeEmployee from "../assets/img/activeEmployee.jpg";

// Assuming these components are available in your project
import RadialChart from "../components/charts/RadicalChart";
import MultipleRadicalChart from "../components/charts/MultipleRadicalChart";
import TimesSeries from "../components/charts/TimesSeries";
import WorkingHoursChart from "../components/charts/WorkingHoursChart";

const GradientCard = ({ icon: Icon, value, label }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex items-center">
      <div className="relative w-12 h-12 mr-4">
        <div className="absolute inset-0 bg-blue-600 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      <div>
        <div
          className="text-3xl font-bold bg-blue-600 bg-clip-text text-transparent"
        >
          {value} <span className="text-sm"></span>
        </div>

        <div
          className="text-sm text-gray-900 opacity-60 font-bold"
        >
          {label}
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const chartOptions = {
    series: [
      {
        name: "Resources Deployed",
        data: [30, 32, 35, 37, 40, 42, 45], // Deployed resources over days
      },
      {
        name: "Resources Needed",
        data: [50, 52, 55, 57, 60, 62, 65], // Resources required over days
      }
    ],
    options: {
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      colors: ['#8884d8', '#82ca9d', '#ffc658'],
      xaxis: {
        categories: ["09 SEP", "10 SEP", "11 SEP", "12 SEP", "13 SEP", "14 SEP", "15 SEP"],
        labels: {
          style: {
            colors: '#9BA1A6',
            fontSize: '10px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9BA1A6',
            fontSize: '10px',
          },
        },
        min: 0,
        max: 80,
        tickAmount: 5,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };

  return (

    <div className="container mx-auto p-6 bg-gray-100 h-screen overflow-y-scroll">
      <p className="text-blue-600 text-3xl font-bold pb-4">Organisation name</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <GradientCard icon={FaMapPin} value={6} label="Current affected Areas" />
        <GradientCard icon={FaHandsHelping} value={9} label="Active Relief Operations" />
        <GradientCard icon={FaCheckCircle} value={47} label="Recovered Areas" />
        <GradientCard icon={FaRupeeSign} value={39000} label="Available Funds" />
      </div>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Resource Delivery Trends</h2>
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type="line"
            height={250}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Volunteer Availability</h2>
          <div className="flex justify-center">
            <RadialChart value={85} label="Volunteer Availability" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Items Distribution</h2>
          <MultipleRadicalChart data={[
            { label: "Food", value: 70 },
            { label: "Water", value: 50 },
            { label: "Medical Supplies", value: 30 },
            { label: "Shelter", value: 20 },
          ]} />

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Funds</h2>
          <TimesSeries />
        </div>
        {/* <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Working Hours</h2>
          <WorkingHoursChart />
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;