
import React from 'react';

const UsersWorkoutTable = () => {
  const usersData = [
    {
      name: 'Roselle Ehrman',
      email: 'Email',
      image: '/Ellipse 12 (3).svg', // Replace with the actual path
      goal: 561,
      completed: 561,
      streak: 4,
    },
    {
      name: 'Jone Smith',
      email: 'Email',
      image: '/Ellipse 12 (3).svg', // Replace with the actual path
      goal: 703,
      completed: 703,
      streak: 2,
    },
    {
      name: 'Darron Handler',
      email: 'Email',
      image: '/Ellipse 12 (3).svg', // Replace with the actual path
      goal: 583,
      completed: 583,
      streak: 3,
    },
    {
      name: 'Leatrice Kulik',
      email: 'Email',
      image: '/Ellipse 12 (3).svg', // Replace with the actual path
      goal: 185,
      completed: 185,
      streak: 5,
    },
    {
      name: 'Roselle Ehrman',
      email: 'Email',
      image: '/Ellipse 12 (3).svg', // Replace with the actual path
      goal: 540,
      completed: 540,
      streak: 8,
    },
  ];

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
          {usersData.map((user, index) => (
            <tr key={index} className="border-b last:border-b-0">
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                {user.goal}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                {user.completed}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                {user.streak}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default UsersWorkoutTable;
