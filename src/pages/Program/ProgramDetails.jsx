import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import AddWorkoutModal from "./AddWorkoutModal";

// Create weeks with actual dates starting from program's start date
const createDefaultWeeks = (weeks, startDate) => {
  let currentDate = new Date(startDate); // Start from the program's start date
  return weeks.map((week) => {
    const daysWithWorkouts = week.workouts.map((workout) => {
      const workoutDate = new Date(workout.date);
      return { date: workoutDate, workout };
    });

    const filledWeek = [];
    for (let day = 1; day <= 7; day++) {
      const workoutDay = daysWithWorkouts.find((d) => d.date.getDate() === currentDate.getDate());
      filledWeek.push(workoutDay || { date: new Date(currentDate), workout: null });
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    return { weekNumber: week.weekNumber, days: filledWeek };
  });
};

const ProgramDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const { state } = useLocation();
  const { program } = state;


  const openModal = (workout = null, weekNumber = null, date = null) => {
    setIsModalOpen(true);
    setSelectedWorkout(workout || { title: "", stations: [{ exercises: [{ sets: [] }] }] });
    setSelectedWeekNumber(weekNumber);
    setSelectedDate(date); // Set the selected date
  };

  const closeModal = () => setIsModalOpen(false);

  if (!program) {
    return <p>No program data available.</p>;
  }

  // Pass the program start date to createDefaultWeeks
  const weeks = createDefaultWeeks(program.weeks, program.startDate);

  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <Sidebar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:mr-12 ">
            <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
              {program.title}
            </h2>
            <div className="font-semibold text-md px-4">
              {new Date(program.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7 shadow-xl">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="mb-10">
                <h2 className="text-xl font-bold mb-4">
                  Week {week.weekNumber}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {week.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="flex flex-col">
                      <p className="text-xs text-red-500 mt-2 text-center mb-2">
                        {new Date(day.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <div
                        className={`flex flex-col items-center justify-center border rounded-lg h-32 bg-white shadow-sm cursor-pointer ${day.workout ? 'cursor-default' : 'cursor-pointer'}`}
                        onClick={() => !day.workout && openModal(day.workout, week.weekNumber, day.date)}
                      >
                        {day.workout ? (
                          <img
                            src={day.workout.image}
                            alt={day.workout.name}
                            className="rounded-lg w-full h-full object-cover"
                          />
                        ) : (
                          <p className="text-4xl text-gray-500">+</p>
                        )}
                      </div>
                      <p className="text-sm font-semibold mt-2 text-center">
                        {day.workout ? day.workout.name : "Add workout"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AddWorkoutModal
        isOpen={isModalOpen}
        onClose={closeModal}
        workoutData={selectedWorkout}
        programId={program._id}
        weekNumber={selectedWeekNumber}
        workoutDate={selectedDate} 
        
      />
    </>
  );
};

export default ProgramDetails;
