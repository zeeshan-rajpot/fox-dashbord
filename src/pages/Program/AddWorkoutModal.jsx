import React, { useEffect, useState } from "react";
import { addWorkoutModal } from "../../Api/Programs";
import toast from "react-hot-toast";

const AddWorkoutModal = ({
  isOpen,
  onClose,
  workoutData,
  programId,
  weekNumber,
  workoutDate,
}) => {
  const [programTitle, setProgramTitle] = useState("");
  const [stations, setStations] = useState([
    {
      exercises: [
        { exerciseName: "", sets: [{ lbs: "", reps: 10, previous: "" }] },
      ],
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (workoutData) {
      setProgramTitle(workoutData.name || "");
      setStations(
        workoutData.stations || [
          {
            exercises: [
              {
                exerciseName: "",
                sets: [{ lbs: "", reps: 10, previous: "" }],
              },
            ],
          },
        ]
      );
      setSelectedImage(workoutData.image || null);
    }
  }, [workoutData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleAddStation = () => {
    if (stations.length >= 4) {
      toast.error("You can only add up to 4 stations.");
      return;
    }

    setStations([
      ...stations,
      {
        exercises: [
          { exerciseName: "", sets: [{ lbs: "", reps: 10, previous: "" }] },
        ],
      },
    ]);
  };

  const handleAddExercise = (stationIndex) => {
    const newStations = [...stations];
    newStations[stationIndex].exercises.push({
      exerciseName: "",
      sets: [{ lbs: "", reps: 10, previous: "" }],
    });
    setStations(newStations);
  };

  const handleAddSet = (stationIndex, exerciseIndex) => {
    const newStations = [...stations];
    newStations[stationIndex].exercises[exerciseIndex].sets.push({
      lbs: "",
      reps: 10,
      previous: "",
    });
    setStations(newStations);
  };

  const handleSetChange = (
    stationIndex,
    exerciseIndex,
    setIndex,
    value,
    field
  ) => {
    const newStations = [...stations];
    newStations[stationIndex].exercises[exerciseIndex].sets[setIndex][field] =
      value;
    setStations(newStations);
  };

  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedImage]);

  if (!isOpen) return null;

  const handleAddProgram = async () => {
    if (stations.length === 0) {
      toast.error("At least one station is required.");
      return;
    }
    if (stations.length > 4) {
      toast.error("You can only add up to 4 stations.");
      return;
    }

    const newWorkout = {
      programId,
      weekNumber,
      workout: {
        image: selectedImage ? URL.createObjectURL(selectedImage) : "",
        name: programTitle,
        numberOfStations: stations.length,
        date: workoutDate || new Date().toISOString().split("T")[0],
        stations: stations.map((station, index) => ({
          stationNumber: index + 1,
          exerciseName: station.exercises[0]?.exerciseName || "Unknown",
          sets:
            station.exercises[0]?.sets.map((set) => ({
              lbs: set.lbs || "",
              reps: set.reps || 10,
              previous: set.previous || 0,
            })) || [],
        })),
      },
    };

    try {
      const response = await addWorkoutModal(newWorkout);
      console.log(response);
      toast.success("Workout added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding workout:", error);
      console.log(newWorkout);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg h-[95svh] overflow-y-auto relative">
        <button
          className="text-red-500 text-xl absolute top-2 right-2"
          onClick={onClose}
        >
          <img src="/ic_round-close.svg" alt="close_icon" />
        </button>
        <div className="flex flex-col items-center mb-4">
          <label className="w-full h-40 rounded-lg flex items-center justify-center cursor-pointer mb-4 mt-8 shadow-md">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Selected"
                className="object-cover h-full w-full rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src="/solar_upload-broken.png"
                  alt="upload_icon"
                  className="w-12 h-12"
                />
                <span className="text-gray-500 mt-2">Add Image</span>
              </div>
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
          <label className="block text-sm font-medium">
            Number of Stations
          </label>
          {stations.length < 4 && (
            <button
              onClick={handleAddStation}
              className="text-white bg-red-500 px-4 py-1 rounded-full hover:bg-red-600 transition duration-200"
            >
              + Add Station
            </button>
          )}
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
                  value={exercise.exerciseName || ""}
                  onChange={(e) => {
                    const newStations = [...stations];
                    newStations[stationIndex].exercises[
                      exerciseIndex
                    ].exerciseName = e.target.value;
                    setStations(newStations);
                  }}
                  className="w-full p-2 border rounded-2xl mb-2 focus:outline-none focus:ring focus:ring-red-500 mt-1"
                />

                <div className="flex justify-between items-center font-semibold text-gray-700 mt-4">
                  <span className="w-10 text-center">Set</span>
                  <span className="w-24 text-center">Previous</span>
                  <span className="w-20 text-center">Lbs</span>
                  <span className="w-10 text-center">Reps</span>
                </div>

                {exercise.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className="flex justify-between items-center mb-2"
                  >
                    <span className="w-10 text-center">{setIndex + 1}</span>
                    <input
                      type="text"
                      className="w-24 p-2 border rounded-2xl text-center focus:outline-none"
                      placeholder="Previous"
                      value={set.previous || ""}
                      onChange={(e) =>
                        handleSetChange(
                          stationIndex,
                          exerciseIndex,
                          setIndex,
                          e.target.value,
                          "previous"
                        )
                      }
                    />
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
                          e.target.value,
                          "lbs"
                        )
                      }
                    />
                    <input
                      type="number"
                      className="w-10 p-2 border rounded-2xl text-center focus:outline-none"
                      placeholder="Reps"
                      value={set.reps}
                      onChange={(e) =>
                        handleSetChange(
                          stationIndex,
                          exerciseIndex,
                          setIndex,
                          e.target.value,
                          "reps"
                        )
                      }
                    />
                  </div>
                ))}

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
