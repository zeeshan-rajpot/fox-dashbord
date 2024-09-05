import React from 'react';

const ProgramSkeleton = () => {
  return (
    <div className="flex flex-col px-4">
      {Array(5).fill().map((_, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between p-4 w-full bg-gray-200 animate-pulse rounded-2xl shadow mb-4"
        >
          <div className="flex justify-between items-center w-full mb-4 md:mb-0">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-6 w-40 bg-gray-300 rounded"></div>
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgramSkeleton;
