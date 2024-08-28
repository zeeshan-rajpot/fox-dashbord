import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import AddWorkoutModal from "./AddWorkoutModal";

const ProgramDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const weeks = [
    {
      title: "Week 1 - Strength",
      days: [
        { date: "1 July", workout: "Full Body Burner", img: "/workout.png" },
        { date: "2 July", workout: null },
        { date: "3 July", workout: null },
        { date: "4 July", workout: null },
        { date: "5 July", workout: null },
        { date: "6 July", workout: null },
        { date: "7 July", workout: null },
      ],
    },
    {
      title: "Week 2 - Strength",
      days: [
        { date: "8 July", workout: null },
        { date: "9 July", workout: null },
        { date: "10 July", workout: null },
        { date: "11 July", workout: null },
        { date: "12 July", workout: null },
        { date: "13 July", workout: null },
        { date: "14 July", workout: null },
      ],
    },
    {
      title: "Week 3 - Strength",
      days: [
        { date: "15 July", workout: null },
        { date: "16 July", workout: null },
        { date: "17 July", workout: null },
        { date: "18 July", workout: null },
        { date: "19 July", workout: null },
        { date: "20 July", workout: null },
        { date: "21 July", workout: null },
      ],
    },
    {
      title: "Week 4 - Strength",
      days: [
        { date: "22 July", workout: null },
        { date: "23 July", workout: null },
        { date: "24 July", workout: null },
        { date: "25 July", workout: null },
        { date: "26 July", workout: null },
        { date: "27 July", workout: null },
        { date: "28 July", workout: null },
      ],
    },
  ];
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <Sidebar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
            July Program
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7 shadow-xl">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="mb-10">
                <h2 className="text-xl font-bold mb-4">{week.title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {week.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="flex flex-col ">
                      <p className="text-xs text-red-500 mt-2 text-center mb-2">
                        {day.date}
                      </p>
                      <div className="flex flex-col items-center justify-center border rounded-lg h-32 bg-white shadow-sm cursor-pointer" onClick={openModal}>
                        {day.workout ? (
                          <>
                            <img
                              src={day.img}
                              alt={day.workout}
                              className="rounded-lg w-full h-full object-cover"
                            />
                          </>
                        ) : (
                          <button className="text-4xl text-gray-500">+</button>
                        )}
                      </div>
                      <p className="text-sm font-semibold mt-2 text-center">
                        {day.workout}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add workout Modal */}
      <AddWorkoutModal 
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProgramDetails;
