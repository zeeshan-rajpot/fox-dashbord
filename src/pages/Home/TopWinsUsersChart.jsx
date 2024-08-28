
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

// Register the necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const TopWinsUsersChart = () => {
  const data = {
    labels: ['john', 'swan', 'malik', 'neo', 'emma', 'liam', 'sophia', 'oliver', 'mia'],
    datasets: [
      {
        label: 'Wins',
        data: [200, 150, 80, 120, 60, 100, 50, 75, 30, 110, 90],
        backgroundColor: '#FF280066',
      
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          stepSize: 50,
        },
        beginAtZero: true,
        max: 300,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Top Wins Users</h2>
      <div className="relative" style={{ height: '300px' }}>
        <Bar data={data} options={options} />
        
      </div>
    </div>
  );
};

export default TopWinsUsersChart;
