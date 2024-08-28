import React from "react";

const achievements = [
  { name: "Roselle Ehrman", badge: "🏆", image: "/Ellipse 12 (3).svg" },
  { name: "Jone Smith", badge: "⭐",image: "/Ellipse 12 (3).svg" },
  { name: "Darron Handler", badge: "🔥",image: "/Ellipse 12 (3).svg" },
  { name: "Leatrice Kulik", badge: "📈",image: "/Ellipse 12 (3).svg" },
  { name: "Roselle Ehrman", badge: "🏆",image: "/Ellipse 12 (3).svg" },
];

const RecentAchievements = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl font-semibold mb-4">Recent User Achievements</h2>
      <ul className="space-y-4">
        {achievements.map((achievement, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img className="w-10 h-10 rounded-full" src={achievement.image} alt={achievement.name} />
              <div>
                <p className="font-medium">{achievement.name}</p>
                <p className="text-sm text-gray-500">Email</p>
              </div>
            </div>
            <span className="text-2xl">{achievement.badge}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAchievements;
