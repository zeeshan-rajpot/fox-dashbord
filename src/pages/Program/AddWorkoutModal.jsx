import React, { useEffect, useState } from 'react';
import { addWorkoutModal } from '../../Api/Programs'; // Import your API function

const AddWorkoutModal = ({
  isOpen,
  onClose,
  workoutData,
  programId,
  weekNumber, // Accept weekNumber as a prop
  onAddProgram,
}) => {
  const [programTitle, setProgramTitle] = useState('');
  const [stations, setStations] = useState([
    { exercises: [{ sets: [{ lbs: '', reps: 10, previous: '--' }] }] },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Populate workout data when modal opens
  useEffect(() => {
    if (workoutData) {
      setProgramTitle(workoutData.title || '');
      setStations(
        workoutData.stations || [
          { exercises: [{ sets: [{ lbs: '', reps: 10, previous: '--' }] }] },
        ]
      );
      setSelectedImage(workoutData.image || null);
    }
  }, [workoutData]);

  // Handle image preview when an image is selected
  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreview(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [selectedImage]);

  if (!isOpen) return null;

  // API call to add workout to the program
  const handleAddProgram = async () => {
    if (!programTitle) {
      alert('Please enter a workout title');
      return;
    }

    // Logging programId and newWorkout for debugging
    console.log('programId:', programId);
    console.log('weekNumber:', weekNumber); // Log the week number for debugging
    console.log('workoutData:', workoutData);

    const newWorkout = {
      programId, // Include the program ID in the request
      weekNumber, // Ensure you're passing the correct week number
      workout: {
        image: selectedImage ? URL.createObjectURL(selectedImage) : '',
        name: programTitle,
        numberOfStations: stations.length,
        stations: stations.map((station, index) => ({
          stationNumber: index + 1,
          exerciseName: station.exercises[0]?.exerciseName || 'Unknown',
          sets:
            station.exercises[0]?.sets.map(set => ({
              lbs: set.lbs || '',
              reps: set.reps || 10,
              previous: set.previous || '--', // Ensure `previous` field is set
            })) || [],
        })),
        date: workoutData.date || new Date().toISOString().split('T')[0], // Use current date if not provided
      },
    };

    try {
      // Make the API call
      const response = await addWorkoutModal(newWorkout);
      console.log('Response:', response); // Log the API response
      alert('Workout added successfully');
      onAddProgram(response.program); // Use the response to update the program
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding workout:', error);
      alert('Failed to add workout');
    }
  };

  const handleAddStation = () => {
    setStations([
      ...stations,
      { exercises: [{ sets: [{ lbs: '', reps: 10, previous: '--' }] }] },
    ]);
  };

  const handleAddExercise = stationIndex => {
    const newStations = stations.map((station, index) => {
      if (index === stationIndex) {
        return {
          ...station,
          exercises: [
            ...station.exercises,
            { sets: [{ lbs: '', reps: 10, previous: '--' }] },
          ],
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
              sets: [...exercise.sets, { lbs: '', reps: 10, previous: '--' }], // Add a new set with `previous` field
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

  const handleSetChange = (
    stationIndex,
    exerciseIndex,
    setIndex,
    value,
    field
  ) => {
    const newStations = stations.map((station, index) => {
      if (index === stationIndex) {
        const updatedExercises = station.exercises.map((exercise, idx) => {
          if (idx === exerciseIndex) {
            const updatedSets = exercise.sets.map((set, sIndex) => {
              if (sIndex === setIndex) {
                return { ...set, [field]: value }; // Dynamically update `lbs`, `reps`, or `previous`
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

  const handleImageUpload = e => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-[90%] max-w-lg h-[95svh] overflow-y-auto relative scrollbar-custom'>
        <button
          className='text-red-500 text-xl absolute top-2 right-2'
          onClick={onClose}
        >
          <img src='/ic_round-close.svg' alt='close_icon' />
        </button>
        <div className='flex flex-col items-center mb-4'>
          <label className='w-full h-40 rounded-lg flex items-center justify-center cursor-pointer mb-4 mt-8 shadow-md'>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt='Selected'
                className='object-cover h-full w-full rounded-lg'
              />
            ) : (
              <>
                <div className='flex flex-col items-center'>
                  <img
                    src='/solar_upload-broken.png'
                    alt='upload_icon'
                    className='w-12 h-12'
                  />
                  <span className='text-gray-500 mt-2'>Add Image</span>
                </div>
              </>
            )}
            <input
              type='file'
              className='hidden'
              onChange={handleImageUpload}
              accept='image/*'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label htmlFor='workout_name'> Workout Name</label>
          <input
            type='text'
            placeholder='Workout Name'
            value={programTitle}
            onChange={e => setProgramTitle(e.target.value)}
            className='w-full p-2 border rounded-2xl focus:outline-none focus:ring focus:ring-red-500 mt-1'
          />
        </div>
        <div className='mb-4 flex items-center justify-between'>
          <label className='block text-sm font-medium'>
            Number of Stations
          </label>
          <button
            onClick={handleAddStation}
            className='text-white bg-red-500 px-4 py-1 rounded-full hover:bg-red-600 transition duration-200'
          >
            + Add Station
          </button>
        </div>
        {stations?.length > 0 &&
          stations.map((station, stationIndex) => (
            <div key={stationIndex} className='mb-4'>
              <h3 className='text-lg font-semibold'>
                Station {stationIndex + 1}
              </h3>
              {station.exercises?.length > 0 &&
                station.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className='mb-4'>
                    <div className='flex justify-between'>
                      <label htmlFor='exercise'>Exercise Name</label>
                      <button
                        onClick={() => handleAddExercise(stationIndex)}
                        className='text-red-500 px-4 py-1'
                      >
                        + Add Exercise
                      </button>
                    </div>
                    <input
                      type='text'
                      placeholder='Exercise Name'
                      className='w-full p-2 border rounded-2xl mb-2 focus:outline-none focus:ring focus:ring-red-500 mt-1'
                    />

                    <div className='flex justify-between items-center font-semibold text-gray-700 mt-4'>
                      <span className='w-10 text-center'>Set</span>
                      <span className='w-24 text-center'>Previous</span>
                      <span className='w-20 text-center'>Lbs</span>
                      <span className='w-10 text-center'>Reps</span>
                    </div>

                    <div>
                      {exercise.sets?.length > 0 &&
                        exercise.sets.map((set, setIndex) => (
                          <div
                            key={setIndex}
                            className='flex justify-between items-center mb-2'
                          >
                            <span className='w-10 text-center'>
                              {setIndex + 1}
                            </span>
                            <input
                              type='text'
                              className='w-24 p-2 border rounded-2xl text-center focus:outline-none'
                              placeholder='Previous'
                              value={set.previous || '--'}
                              onChange={e =>
                                handleSetChange(
                                  stationIndex,
                                  exerciseIndex,
                                  setIndex,
                                  e.target.value,
                                  'previous'
                                )
                              }
                            />
                            <input
                              type='number'
                              className='w-20 p-2 border rounded-2xl text-center focus:outline-none'
                              placeholder='Lbs'
                              value={set.lbs}
                              onChange={e =>
                                handleSetChange(
                                  stationIndex,
                                  exerciseIndex,
                                  setIndex,
                                  e.target.value,
                                  'lbs'
                                )
                              }
                            />
                            <span className='w-10 text-center'>10</span>
                          </div>
                        ))}
                    </div>

                    <div className='flex justify-center mt-4'>
                      <button
                        onClick={() =>
                          handleAddSet(stationIndex, exerciseIndex)
                        }
                        className='text-red-500'
                      >
                        + Add Set
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        <div className='flex justify-center'>
          <button
            onClick={handleAddProgram}
            className='text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition duration-200 '
          >
            Add Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
