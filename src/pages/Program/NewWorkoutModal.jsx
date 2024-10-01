import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

import { usePrograms } from '../Program/ProgramsContext';
const NewWorkoutModal = ({
    isOpen,
    onClose,
    workoutData,
    programId,
    weekNumber,
    workoutDate,
    onWorkoutAdded
}) => {


    
    const { fetchPrograms } = usePrograms();
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(null);
    const [programTitle, setProgramTitle] = useState('');
    const [stations, setStations] = useState([
        {
            id: 1,
            exercises: [{
                id: 1,
                exerciseName: '',
                levels: [] // Start with no levels
            }]
        } // Initially one station with no exercises
    ]);
    const [exerciseTemplate] = useState({
        exerciseName: '',
        levels: [] // Start with no levels
    });

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Add station and a default exercise
    const handleAddStation = () => {
        setStations([...stations, {
            id: stations.length + 1, exercises: [{
                id: 1,
                exerciseName: '',
                levels: [] // Start with no levels
            }]
        }]); // Add a new station with an empty exercises array
    };

    // Add a new exercise to a specific station
    const handleAddExercise = (stationIndex) => {
        const newStations = [...stations];
        newStations[stationIndex].exercises.push({ ...exerciseTemplate, id: newStations[stationIndex].exercises.length + 1 });
        setStations(newStations);
    };

    // Handle exercise name input change
    const handleExerciseNameChange = (stationIndex, exerciseIndex, event) => {
        const newStations = [...stations];
        newStations[stationIndex].exercises[exerciseIndex].exerciseName = event.target.value;
        setStations(newStations);
    };

    // Handle level input change
    const handleInputChange = (stationIndex, exerciseIndex, levelIndex, event) => {
        const newStations = [...stations];
        const exercise = newStations[stationIndex].exercises[exerciseIndex];
        if (event.target.name === 'measurementType') {
            exercise.levels[levelIndex].measurementType = event.target.value;
        } else {
            exercise.levels[levelIndex][event.target.name] = event.target.value;
        }
        setStations(newStations);
    };

    // Add level to specific exercise
    const handleAddLevel = (stationIndex, exerciseIndex) => {
        const newStations = [...stations];
        const exercise = newStations[stationIndex].exercises[exerciseIndex];
        if (exercise.levels.length < 3) {
            const levelTypes = [
                { type: 'Level 1', measurementType: 'Reps' },
                { type: 'Level 2', measurementType: 'Reps' },
                { type: 'Level 3', measurementType: 'Reps' }
            ];
            const newLevel = {
                id: exercise.levels.length + 1,
                ...levelTypes[exercise.levels.length],
                value: ''
            };
            exercise.levels.push(newLevel);
            setStations(newStations);
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        const workout = {
            date: workoutDate, // Use the provided workout date
            duration: 60, // Assuming you will set this appropriately, you might want to get this from a state or input
            name: programTitle || "Workout", // Use the program title
            image: imagePreview || "https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon.png", // Use the uploaded image preview
            numberOfStations: stations.length,
            stations: stations.map((station, index) => ({
                stationNumber: index + 1,
                exercises: station.exercises.map(exercise => ({
                    exerciseName: exercise.exerciseName,
                    sets: exercise.levels.map(level => ({
                        level: level.type,
                        value: level.value,
                        measurementType: level.measurementType
                    }))
                }))
            }))
        };

        const payload = {
            programId: programId,
            weekNumber: weekNumber,
            workout: workout,
        };

        const token = sessionStorage.getItem("token");

        try {
            const response = await axios.post('https://fox-training-f2fph3abhfgbb4hv.eastus-01.azurewebsites.net/programs/addWorkout', payload, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                    'Content-Type': 'application/json' // Optional: Set content type to JSON
                }
            });
            console.log('Workout added successfully:', response.data);
            await fetchPrograms();
            onWorkoutAdded(weekNumber, new Date(workoutDate), response.data);
            onClose(); // Close the modal on success
            navigate('/program');
        } catch (error) {
            console.error('Error adding workout:', error);
            alert(error.response.data.message)
        }
    };

    return (
        <div>
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
                                <img src={imagePreview} alt="Selected" className="object-cover h-full w-full rounded-lg" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <img src="/solar_upload-broken.png" alt="upload_icon" className="w-12 h-12" />
                                    <span className="text-gray-500 mt-2">Add Image</span>
                                </div>
                            )}
                            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                        </label>
                    </div>

                    <div className="mb-4 flex items-center ">
                        <div className='me-2'>
                            <label htmlFor="workout_name" className='font-semibold'>Workout Name</label>
                            <input
                                type="text"
                                placeholder="Workout Name"
                                value={programTitle}
                                onChange={(e) => setProgramTitle(e.target.value)}
                                className="w-full p-2 border rounded-2xl focus:outline-none focus:ring focus:ring-red-500 mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="workout_duration" className='font-semibold'>Workout Time duration</label>
                            <input
                                type="number"
                                placeholder="Duration in minutes"
                                value={60} // Update accordingly or use a state
                                onChange={(e) => {/* Handle duration change if needed */ }}
                                className="w-full p-2 border rounded-2xl focus:outline-none focus:ring focus:ring-red-500 mt-1"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <h2 className='font-bold text-lg'>Station</h2>
                        {stations.length < 4 && (
                            <button onClick={handleAddStation} className="text-white bg-red-500 px-4 py-1 rounded-full hover:bg-red-600 transition duration-200">
                                + Add Station
                            </button>
                        )}
                    </div>

                    {/* Render stations */}
                    {stations.map((station, stationIndex) => (
                        <div key={station.id} className="mt-4">
                            {/* <h3 className="font-bold text-lg">Station {stationIndex + 1}</h3> */}
                            {/* Exercises section for this station */}
                            {station.exercises.map((exercise, exerciseIndex) => (
                                <div key={exercise.id} className="mt-5">
                                    <div className="flex items-center justify-between font-semibold">
                                        <label className="block text-lg font-medium text-gray-700">Exercise Name</label>
                                        {exercise.levels.length < 3 && (
                                            <p onClick={() => handleAddLevel(stationIndex, exerciseIndex)} className="cursor-pointer text-[#FF2800]">
                                                + Add Level
                                            </p>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                        value={exercise.exerciseName}
                                        onChange={(e) => handleExerciseNameChange(stationIndex, exerciseIndex, e)}
                                        placeholder="Exercise Name"
                                    />
                                    {exercise.levels.map((level, levelIndex) => (
                                        <div key={level.id} className="mt-4 flex items-center justify-between">
                                            <label className="text-md font-medium text-gray-700">{level.type}</label>
                                            <div>
                                                <input
                                                    type="number"
                                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none w-20"
                                                    placeholder={level.measurementType}
                                                    name="value"
                                                    value={level.value}
                                                    onChange={(e) => handleInputChange(stationIndex, exerciseIndex, levelIndex, e)}
                                                />
                                                <select
                                                    className="ml-2 py-2 border border-gray-300 rounded-md text-gray-600"
                                                    name="measurementType"
                                                    value={level.measurementType}
                                                    onChange={(e) => handleInputChange(stationIndex, exerciseIndex, levelIndex, e)}
                                                >
                                                    <option value="Reps">Reps</option>
                                                    <option value="Time">Time</option>
                                                    <option value="Distance">Distance</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <div className="flex justify-center mt-6">
                                <button onClick={() => handleAddExercise(stationIndex)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full">
                                    Add Exercise
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center mt-6  ">
                        <button
                            onClick={handleSubmit} // Call handleSubmit on click
                            className="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition duration-200 w-[50%]"
                        >
                            Add Workout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewWorkoutModal;
