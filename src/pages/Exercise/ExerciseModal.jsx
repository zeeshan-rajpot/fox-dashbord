import React, { useState, useEffect } from 'react';
import { useExercises } from './ExercisesContext';

const ExerciseModal = ({ closeModal, exerciseData, selectedExercise }) => {
  const { postExercise, editExercise } = useExercises();
  const [exerciseName, setExerciseName] = useState('');
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (selectedExercise) {
      setExerciseName(selectedExercise.exerciseName);
      setLevels(selectedExercise.sets.map((set, index) => ({
        id: index + 1,
        type: set.level,
        value: set.value,
        measurementType: set.measurementType
      })));
    }
  }, [selectedExercise]);

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
        { type: 'Advanced', measurementType: 'Reps' }
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
    alert(message);
  };

  const handleSubmit = async () => {
    const formattedData = {
      exerciseName: exerciseName,
    //   sets: levels.map(level => ({
    //     level: level.type,
    //     value: level.value,
    //     measurementType: level.measurementType
    //   })
    // )
    };

    try {
      if (selectedExercise) {
        await editExercise(selectedExercise._id, formattedData);
        showMessage('Exercise updated successfully!');
      } else {
        await postExercise(formattedData);
        showMessage('Exercise added successfully!');
      }
      closeModal();   // Close the modal
      exerciseData(); // Refresh data
    } catch (error) {
      console.error('Error saving exercise:', error);
      showMessage(error.response.data.error, true);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-end" onClick={closeModal}>
          <button className="text-red-500 text-3xl font-semibold">x</button>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between font-semibold">
            <label className="block text-lg font-medium text-gray-700">Exercise Name</label>
            {/* {levels.length < 3 && (
              <p onClick={handleAddLevel} className="cursor-pointer text-[#FF2800]">
                + Add Level
              </p>
            )} */}
          </div>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          {levels.map((level, index) => (
            <div key={`${level.type}-${selectedExercise ? selectedExercise._id : 'new'}-${index}`} className="mt-4 flex items-center justify-between">
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
              {selectedExercise ? 'Update Exercise' : 'Add Exercise'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;
