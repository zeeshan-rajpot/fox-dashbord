import React from 'react';

const SkeletonLoader = ({ count }) => {
  const rows = Array(count).fill(0); // Create an array with the number of rows to display

  return (
    <div className="animate-pulse">
      {rows.map((_, index) => (
        <div key={index} className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="w-1/6 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/6 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/12 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/12 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/12 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/12 h-4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
