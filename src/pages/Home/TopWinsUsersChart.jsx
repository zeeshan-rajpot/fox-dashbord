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

  const [timePeriod, setTimePeriod] = useState("week");

  // Fetch top users data based on the selected time period
  const getTopUsersData = async (period) => {
    try {
      const response = await topWinUsers(period);
      setTopUsersData(response);
    } catch (error) {
      toast.error("Failed to fetch users. Please try again later.");
    }
  };

  // Effect to fetch data when time period changes
  useEffect(() => {
    getTopUsersData(timePeriod);
  }, [timePeriod]);




  console.log(topUsersData)
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
          display: false,
          stepSize: 2,
        },
        beginAtZero: true,
        // max: ,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };




  return (
    <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-start justify-between">

    <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>

    <div className="mb-4">
      <select
        value={timePeriod}
        onChange={handleTimePeriodChange}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="alltime">All-time</option>
      </select>
    </div>
      </div>

    {/* Dropdown for selecting time period */}


    <div className="relative" style={{ height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  </div>
  );
};

export default TopWinsUsersChart;
