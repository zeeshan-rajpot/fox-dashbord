import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import AddWorkoutModal from "./AddWorkoutModal";
import { useLocation } from "react-router-dom";

const ProgramDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useLocation();
  const { program } = state || {};

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!program) {
    return <p>No program data available.</p>; 
  }

  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <Sidebar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
            {program.title}
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7 shadow-xl">
            {program.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="mb-10">
                <h2 className="text-xl font-bold mb-4">
                  Week {week.weekNumber}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {week.workouts.length > 0 ? (
                    week.workouts.map((workout, workoutIndex) => (
                      <div key={workoutIndex} className="flex flex-col">
                        <p className="text-xs text-red-500 mt-2 text-center mb-2">
                          {new Date(workout.date).toLocaleDateString()}
                        </p>
                        <div
                          className="flex flex-col items-center justify-center border rounded-lg h-32 bg-white shadow-sm cursor-pointer"
                          onClick={openModal}
                        >
                          <img
                            src={workout.image}
                            alt={workout.name}
                            className="rounded-lg w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-semibold mt-2 text-center">
                          {workout.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center border rounded-lg h-32 bg-white shadow-sm cursor-pointer">
                      <p className="text-sm text-gray-500">No workouts</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Workout Modal */}
      <AddWorkoutModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ProgramDetails;
