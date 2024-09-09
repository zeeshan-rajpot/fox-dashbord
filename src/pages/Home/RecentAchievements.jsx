import { useState, useEffect } from "react";
import { recentUsers } from "../../Api/Users";
import SkeletonLoader from "../Users/SkeletonLoader";

// const achievements = [
//   { name: "Roselle Ehrman", badge: "🏆", image: "/Ellipse 12 (3).svg" },
//   { name: "Jone Smith", badge: "⭐",image: "/Ellipse 12 (3).svg" },
//   { name: "Darron Handler", badge: "🔥",image: "/Ellipse 12 (3).svg" },
//   { name: "Leatrice Kulik", badge: "📈",image: "/Ellipse 12 (3).svg" },
//   { name: "Roselle Ehrman", badge: "🏆",image: "/Ellipse 12 (3).svg" },
// ];

const RecentAchievements = () => {
  const [recentUsersData, setRecentUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getrecentUsersData = async () => {
    try {
      const response = await recentUsers();
      // console.log(response);
      setRecentUsersData(response);
    } catch (error) {
      console.error("Error", error);
      toast.error("Failed to fetch users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getrecentUsersData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Recent User Achievements</h2>
      <ul className="space-y-4">
        {isLoading ? (
          <SkeletonLoader count={5} />
        ) : recentUsersData.length > 0 ? (
          recentUsersData.map((data) => (
            <li key={data.userId} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={data.image ?? "/Ellipse 12 (1).svg"}
                  alt={data.username}
                />
                <div>
                  <p className="font-medium">{data.username}</p>
                  <p className="text-sm text-gray-500">{data.email}</p>
                </div>
              </div>
              <span className="text-2xl">🏆</span>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No recent achievements found.
          </p>
        )}
      </ul>
    </div>
  );
};

export default RecentAchievements;
