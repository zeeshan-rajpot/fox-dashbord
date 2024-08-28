import React, { useState } from "react";

const AddWorkoutModal = ({ isOpen, onClose, onAddProgram }) => {
  const [programTitle, setProgramTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [stations, setStations] = useState([{ exercises: [{ sets: [] }] }]);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen) return null;

  const handleAddProgram = () => {
    if (programTitle && startDate) {
      onAddProgram({
        title: programTitle,
        date: startDate,
        stations,
        image: selectedImage,
      });
      onClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleAddStation = () => {
    setStations([...stations, { exercises: [{ sets: [] }] }]);
  };

  const handleAddExercise = (stationIndex) => {
    const newStations = stations.map((station, index) => {
      if (index === stationIndex) {
        return {
          ...station,
          exercises: [...station.exercises, { sets: [] }],
        };
      }
      return station;
    });
    setStations(newStations);
  };

  const handleAddSet = (stationIndex, exerciseIndex) => {
    const newStations = stations.map((station, index) => {
      if (index === stationIndex) {
        const updatedExercises = station.exercises.map((exercise, idx) => {
          if (idx === exerciseIndex) {
            return {
              ...exercise,
              sets: [...exercise.sets, { lbs: "", reps: 10 }],
            };
          }
          return exercise;
        });
        return { ...station, exercises: updatedExercises };
      }
      return station;
    });
    setStations(newStations);
  };

  const handleSetChange = (stationIndex, exerciseIndex, setIndex, value) => {
    const newStations = stations.map((station, index) => {
      if (index === stationIndex) {
        const updatedExercises = station.exercises.map((exercise, idx) => {
          if (idx === exerciseIndex) {
            const updatedSets = exercise.sets.map((set, sIndex) => {
              if (sIndex === setIndex) {
                return { ...set, lbs: value };
              }
              return set;
            });
            return { ...exercise, sets: updatedSets };
          }
          return exercise;
        });
        return { ...station, exercises: updatedExercises };
      }
      return station;
    });
    setStations(newStations);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg h-[95svh] overflow-y-auto relative scrollbar-custom">
        <button
          className="text-red-500 text-xl absolute top-2 right-2"
          onClick={onClose}
        >
          <img src="/ic_round-close.svg" alt="close_icon" />
        </button>
        <div className="flex flex-col items-center mb-4 ">
          <label className=" w-full h-40 rounded-lg flex items-center justify-center cursor-pointer mb-4 mt-8 shadow-md">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="object-cover h-full w-full rounded-lg"
              />
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <img
                    src="/solar_upload-broken.png"
                    alt="upload_icon"
                    className="w-12 h-12 "
                  />
                  <span className="text-gray-500 mt-2">Add Image</span>
                </div>
              </>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="workout_name"> Workout Name</label>
          <input
            type="text"
            placeholder="Workout Name"
            value={programTitle}
            onChange={(e) => setProgramTitle(e.target.value)}
            className="w-full p-2 border rounded-2xl focus:outline-none focus:ring focus:ring-red-500 mt-1"
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm font-medium">Number of Station</label>
          <button
            onClick={handleAddStation}
            className="text-white bg-red-500 px-4 py-1 rounded-full hover:bg-red-600 transition duration-200"
          >
            + Add Station
          </button>
        </div>
        {stations.map((station, stationIndex) => (
          <div key={stationIndex} className="mb-4">
            <h3 className="text-lg font-semibold">
              Station {stationIndex + 1}
            </h3>
            {station.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="mb-4">
                <div className="flex justify-between">
                  <label htmlFor="exercise">Exercise Name</label>
                  <button
                    onClick={() => handleAddExercise(stationIndex)}
                    className="text-red-500 px-4 py-1"
                  >
                    + Add Exercise
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Exercise Name"
                  className="w-full p-2 border rounded-2xl mb-2 focus:outline-none focus:ring focus:ring-red-500 mt-1"
                />

                {/* Set, Previous, Lbs, Reps headings */}
                <div className="flex justify-between items-center font-semibold text-gray-700 mt-4">
                  <span className="w-10 text-center">Set</span>
                  <span className="w-24 text-center">Previous</span>
                  <span className="w-20 text-center">Lbs</span>
                  <span className="w-10 text-center">Reps</span>
                </div>

                {/* Loop to display sets */}
                <div>
                  {exercise.sets.map((set, setIndex) => (
                    <div
                      key={setIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span className="w-10 text-center">{setIndex + 1}</span>
                      <span className="w-24 text-center text-gray-500">
                        --
                      </span>{" "}
                      {/* Placeholder for Previous */}
                      <input
                        type="number"
                        className="w-20 p-2 border rounded-2xl text-center focus:outline-none"
                        placeholder="Lbs"
                        value={set.lbs}
                        onChange={(e) =>
                          handleSetChange(
                            stationIndex,
                            exerciseIndex,
                            setIndex,
                            e.target.value
                          )
                        }
                      />
                      <span className="w-10 text-center">10</span>{" "}
                      {/* Fixed Reps */}
                    </div>
                  ))}
                </div>

                {/* Button to add new set */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handleAddSet(stationIndex, exerciseIndex)}
                    className="text-red-500"
                  >
                    + Add Set
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center">
          <button
            onClick={handleAddProgram}
            className="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition duration-200 "
          >
            Add Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
