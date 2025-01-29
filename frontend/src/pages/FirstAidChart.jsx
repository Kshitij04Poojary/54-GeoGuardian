import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FirstAidChart = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: ['People Helped', 'Medicines Distributed', 'Emergency Cases'],  // X-axis labels
    datasets: [
      {
        label: 'First Aid Stats',
        data: [
          data.peopleHelped,              // People helped count
          data.medicines.length,          // Length of medicines array
          data.emergencyCases,            // Emergency cases count
        ], 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'First Aid Statistics',
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">First Aid Provided Overview</h3>
      <div className="w-full">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FirstAidChart;
