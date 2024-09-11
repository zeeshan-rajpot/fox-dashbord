import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/SideBar';
import AddWorkoutModal from './AddWorkoutModal';

const createDefaultWeeks = weeks => {
  let currentDay = 1;
  return weeks.map(week => {
    const daysWithWorkouts = week.workouts.map(workout => {
      const workoutDate = new Date(workout.date).getDate();
      return { date: workoutDate, workout };
    });

    const filledWeek = [];
    for (let day = 1; day <= 7; day++) {
      const workoutDay = daysWithWorkouts.find(d => d.date === currentDay);
      filledWeek.push(workoutDay || { date: currentDay, workout: null });
      currentDay++;
    }
    return { weekNumber: week.weekNumber, days: filledWeek };
  });
};

const ProgramDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(null); // Add selectedWeekNumber state
  const { state } = useLocation();
  const { program } = state;

  const openModal = (workout = null, weekNumber = null) => {
    setIsModalOpen(true);
    setSelectedWorkout(
      workout || { title: '', stations: [{ exercises: [{ sets: [] }] }] } // Ensure workoutData has at least one station with exercises
    );
    setSelectedWeekNumber(weekNumber); // Set the week number when opening the modal
  };

  const closeModal = () => setIsModalOpen(false);

  if (!program) {
    return <p>No program data available.</p>;
  }

  const weeks = createDefaultWeeks(program.weeks);

  return (
    <>
      <section className='flex flex-col lg:flex-row justify-between gap-4 h-auto w-full'>
        <Sidebar />
        <div className='pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto'>
          <h2 className='text-[#FF2800] font-bold text-2xl md:text-3xl px-4'>
            {program.title}
          </h2>
          <div className='w-full px-4 bg-white py-4 mt-5 md:mt-7 shadow-xl'>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className='mb-10'>
                <h2 className='text-xl font-bold mb-4'>
                  Week {week.weekNumber}
                </h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4'>
                  {week.days.map((day, dayIndex) => (
                    <div key={dayIndex} className='flex flex-col'>
                      <p className='text-xs text-red-500 mt-2 text-center mb-2'>
                        {new Date(`2024-09-${day.date}`).toLocaleDateString()}
                      </p>
                      <div
                        className='flex flex-col items-center justify-center border rounded-lg h-32 bg-white shadow-sm cursor-pointer'
                        onClick={() => openModal(day.workout, week.weekNumber)} // Pass weekNumber when clicking
                      >
                        {day.workout ? (
                          <img
                            src={day.workout.image}
                            alt={day.workout.name}
                            className='rounded-lg w-full h-full object-cover'
                          />
                        ) : (
                          <p className='text-4xl text-gray-500'>+</p>
                        )}
                      </div>
                      <p className='text-sm font-semibold mt-2 text-center'>
                        {day.workout ? day.workout.name : 'Add workout'}
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
      />
    </>
  );
};

export default ProgramDetails;
