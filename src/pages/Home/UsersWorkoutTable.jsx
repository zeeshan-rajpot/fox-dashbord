import {useState, useEffect} from "react";
import { getUsersWeekly } from "../../Api/Users";
import SkeletonLoader from "../Users/SkeletonLoader";

const UsersWorkoutTable = () => {
  
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsersDataWeekly = async () => {
    try {
      const response = await getUsersWeekly();
      console.log(response);
      setUsersData(response);
    } catch (error) {
      // console.error("Error", error);
      toast.error("Failed to fetch users. Please try again later.");
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersDataWeekly()
  }, []);

  console.log("userData", usersData);
  
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Users Weekly Workout Goal</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-red-500 text-white text-sm font-medium uppercase tracking-wider rounded-tl-lg ">
                Users
              </th>
              <th className="px-6 py-3 bg-red-500 text-white text-sm font-medium uppercase tracking-wider text-center">
                Weekly Workout Goal
              </th>
              <th className="px-6 py-3 bg-red-500 text-white text-sm font-medium uppercase tracking-wider text-center">
                Completed Workouts
              </th>
              <th className="px-6 py-3 bg-red-500 text-white text-sm font-medium uppercase tracking-wider rounded-tr-lg text-center">
                Streak
              </th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
  <SkeletonLoader count={3} /> // Show skeleton loader when loading
) : usersData.length > 0 ? ( // Check if there are users to display
  usersData.map((user) => (
    <tr key={user._id} className="border-b last:border-b-0">
      <td className="px-6 py-4 whitespace-nowrap flex items-center">
        <img
          src={user.image ?? "/"} // Use a fallback image if user.image is null or undefined
          alt={user.username}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <div className="text-sm font-medium text-gray-900">
            {user.username}
          </div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
        {user.weeklyWorkOutGoal}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
        {user.totalWorkouts}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
        {user.streaks}
      </td>
    </tr>
  ))
) : (
  <p>No users found</p> // Show a message if there are no users
)}

          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersWorkoutTable;
