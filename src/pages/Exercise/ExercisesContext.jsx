import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { getExercises, createExercise } from "../../Api/Programs";

const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
    const [exerciseData, setExerciseData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchExercises = useCallback(async () => {
        try {
            const response = await getExercises();
            setExerciseData(response.exercises);
        } catch (error) {
            console.error("Failed to fetch exercises", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const postExercise = async (newExercise) => {
        try {
            const response = await createExercise(newExercise);
            setExerciseData((prev) => [...prev, response]);
        } catch (error) {
            console.error("Failed to post exercise", error);
            throw error; // Re-throw the error to handle it in the modal
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <ExercisesContext.Provider value={{ exerciseData, isLoading, fetchExercises, postExercise }}>
            {children}
        </ExercisesContext.Provider>
    );
};

export const useExercises = () => {
    return useContext(ExercisesContext);
};
