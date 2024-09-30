import api from './config';
// import axios from 'axios'; 
export const addProgram = async userData => {
  try {
    const response = await api.post('/programs/add', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPrograms = async () => {
  try {
    const response = await api.get('/programs/allPrograms');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExercises = async () => {
  try {
    const response = await api.get('/dashboard/all-exercise');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createExercise = async (exerciseData) => {
  const response = await api.post('/dashboard/add-exercise', exerciseData); // Replace with your actual API endpoint
  return response.data;
};

export const addWorkoutModal = async workoutData => {
  try {
    const response = await api.post('/programs/addWorkout', workoutData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExersice = async (id) => {
  try {
    const response = await api.delete(`/dashboard/delete-exercise/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExercise = async (id, updatedExercise) => {
  try {
    const response = await api.patch(`/dashboard/update-exercise/${id}`, updatedExercise);
    return response.data;
  } catch (error) {
    throw error;
  }
};