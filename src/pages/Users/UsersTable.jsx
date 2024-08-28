import React, { useState } from 'react';

const UsersTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Calculate pagination details
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className=" text-black">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Last Active</th>
            <th className="py-2 px-4">Total Workouts</th>
            <th className="py-2 px-4">Weekly Workouts</th>
            <th className="py-2 px-4">Streaks</th>
            <th className="py-2 px-4">Personal Best</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4 text-gray-500">{user.id}</td>
              <td className="py-2 px-4 flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className='flex flex-col'>
                <span className='ml-1'>{user.name}</span>
                <span className="text-gray-500 ml-1">{user.email}</span>
                </div>
            
              </td>
              <td className="py-2 px-4 text-gray-500">{user.lastActive}</td>
              <td className="py-2 px-4 text-gray-500 text-center">{user.totalWorkouts}</td>
              <td className="py-2 px-4 text-gray-500 text-center">{user.weeklyWorkouts}</td>
              <td className="py-2 px-4 text-gray-500 text-center">{user.streaks}</td>
              <td className="py-2 px-4 text-gray-500 text-center">{user.personalBest}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {Math.min(indexOfLastUser, users.length)} of {users.length} users
        </p>
        <div className="flex space-x-2 ">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg  text-gray-900  disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === index + 1 ? 'bg-[#FF2800] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg  text-[#FF2800] disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;


