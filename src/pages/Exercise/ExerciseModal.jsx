import React, { useState } from 'react';
import { useExercises } from './ExercisesContext';

const ExerciseModal = ({ closeModal  , exerciseData}) => {
    const { postExercise } = useExercises();
    const [exerciseName, setExerciseName] = useState('');
    const [levels, setLevels] = useState([]);

    const handleInputChange = (index, event) => {
        const newLevels = [...levels];
        if (event.target.name === 'measurementType') {
            newLevels.forEach(level => level.measurementType = event.target.value);
        } else {
            newLevels[index][event.target.name] = event.target.value;
        }
        setLevels(newLevels);
    };

    const handleAddLevel = () => {
        if (levels.length < 3) {
            const levelTypes = [
                { type: 'Beginner', measurementType: 'Reps' },
                { type: 'Intermediate', measurementType: 'Reps' },
                { type: 'Advance', measurementType: 'Reps' }
            ];
            const newLevel = {
                id: levels.length + 1,
                ...levelTypes[levels.length],
                value: ''
            };
            setLevels([...levels, newLevel]);
        }
    };

    const showMessage = (message, isError = false) => {
        alert(message); // You can customize this to show a toast or other UI message
    };

    const handleSubmit = async () => {
        const formattedData = {
            exerciseName: exerciseName,
            sets: levels.map(level => ({
                level: level.type,
                value: level.value,
                measurementType: level.measurementType
            }))
        };

        console.log(formattedData);
        try {
            await postExercise(formattedData);
            showMessage('Exercise added successfully!');
            exerciseData()
            closeModal(); // Close the modal after adding exercise
        } catch (error) {
            console.error('Error adding exercise:', error);
            showMessage(error.response.data.error, true);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-end" onClick={closeModal}>
                    <button className="text-red-500 text-3xl font-semibold">x</button>
                </div>
                <div className='mt-5'>
                    <div className='flex items-center justify-between font-semibold'>
                        <label className="block text-lg font-medium text-gray-700">Exercise Name</label>
                        {levels.length < 3 && (
                            <p onClick={handleAddLevel} className="cursor-pointer text-[#FF2800]">
                                + Add Level
                            </p>
                        )}
                    </div>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                    />
                    {levels.map((level, index) => (
                        <div key={level.id} className="mt-4 flex items-center justify-between">
                            <label className="text-md font-medium text-gray-700">{level.type}</label>
                            <div>
                                <input
                                    type="number"
                                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none w-20"
                                    placeholder={`${level.measurementType}`}
                                    name="value"
                                    value={level.value}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                                <select
                                    className="ml-2 py-2 border border-gray-300 rounded-md text-gray-600"
                                    name="measurementType"
                                    value={level.measurementType}
                                    onChange={(e) => handleInputChange(index, e)}
                                >
                                    <option value="Reps">Reps</option>
                                    <option value="Time">Time</option>
                                    <option value="Distance">Distance</option>
                                </select>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full"
                            onClick={handleSubmit}
                        >
                            Add Exercise
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExerciseModal;
