import React, { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar';
import ExerciseModal from './ExerciseModal';
import ProgramSkeleton from "../Program/ProgramSkeleton"; // Assuming you have a skeleton component for loading
import { useExercises } from "./ExercisesContext"; // Import from the ExercisesContext

const Exercise = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Handle dropdown for each exercise

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index); // Toggle the dropdown for each exercise
  };

  const { exerciseData, isLoading, fetchExercises } = useExercises();

  useEffect(() => {
    fetchExercises(); // Fetch exercises when the component mounts
  }, [fetchExercises]);
  

  const handleEdit = (index) => {
    // Handle edit logic here
  };

  const handleDelete = (index) => {
    // Handle delete logic here
  };

  const handleExerciseClick = (exercise) => {
    // Handle exercise card click logic here
  };

  return (
    <div>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <SideBar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
            Exercise
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7">
            <div className="flex flex-col md:flex-row justify-between items-center p-3 w-full bg-[#FF2800] rounded-2xl">
              <div className="flex justify-between items-center w-full md:w-[40%] text-white mb-4 md:mb-0">
                <h1 className="text-sm md:text-base">Exercise Name</h1>
              </div>
              <div
                className="flex justify-center items-center px-3 gap-3 md:gap-5 bg-[#111111] text-white rounded-2xl cursor-pointer"
                onClick={openModal}
              >
                <img
                  src="/uil_plus.png"
                  alt="Add Exercise"
                  className="h-5 w-5 md:h-7 md:w-7"
                />
                <button className="h-10 w-[90px] md:h-12 md:w-[100px] bg-[#111111] text-sm md:text-base">
                  Add Exercise
                </button>
              </div>
            </div>

            {isLoading ? (
              <ProgramSkeleton /> // Loading skeleton
            ) : (
              <div className="flex flex-col px-4">
                {Array.isArray(exerciseData) && exerciseData.length > 0 ? (
                  exerciseData.map((exercise, index) => (
                    <div
                      key={exercise._id} // Ensure exercise has _id or use index as a fallback
                      className="flex flex-col md:flex-row justify-between p-4 w-full bg-white rounded-2xl shadow mb-4 relative cursor-pointer"
                      onClick={() => handleExerciseClick(exercise)}
                    >
                      <div className="flex justify-between items-center w-full mb-4 md:mb-0">
                        <h1 className="text-sm md:text-base">
                          {exercise.exerciseName}
                        </h1>
                        <h2 className="text-sm md:text-base md:mr-80">
                          {/* {exercise.title || 'No Title'} */}
                        </h2>
                        <div
                          className="flex justify-end md:justify-center cursor-pointer relative"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(index);
                          }}
                        >
                          <img
                            src="/iconamoon_menu-kebab-vertical-bold.png"
                            alt="Menu"
                            className="h-5 w-5 md:h-6 md:w-6"
                          />
                          {dropdownOpen === index && (
                            <div className="absolute right-0 mt-6 w-40 bg-white rounded-lg shadow-lg z-50">
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleEdit(index)}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleDelete(index)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No exercises found</div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>
      {modalOpen && <ExerciseModal closeModal={closeModal} exerciseData={fetchExercises} />}
    </div>
  );
};

export default Exercise;
