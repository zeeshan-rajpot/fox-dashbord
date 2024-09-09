import { useState, useEffect } from "react";
import { topWinUsers } from "../../Api/Users";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
// Register the necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const TopWinsUsersChart = () => {
  const [topUsersData, setTopUsersData] = useState([]);

  const getTopUsersData = async () => {
    try {
      const response = await topWinUsers();
      // console.log(response);
      setTopUsersData(response);
    } catch (error) {
      // console.error("Error", error);
      toast.error("Failed to fetch users. Please try again later.");
    }
  };

  useEffect(() => {
    getTopUsersData();
  }, []);

  const data = {
    labels: topUsersData.map((user) => user.username),
    datasets: [
      {
        label: "Workouts",
        data: topUsersData.map((user) => user.totalWorkouts),
        backgroundColor: "#FF280066",
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
          color: "#E5E7EB",
        },
        ticks: {
          stepSize: 2,
        },
        beginAtZero: true,
        max: 10,
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
      <div className="relative" style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TopWinsUsersChart;
