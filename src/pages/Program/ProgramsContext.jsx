// src/context/ProgramsContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import { getPrograms } from "../../Api/Programs";
const ProgramsContext = createContext();

export const ProgramsProvider = ({ children }) => {
  const [programData, setProgramData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrograms = async () => {
    try {
      const response = await getPrograms();
      setProgramData(response);
    } catch (error) {
      console.error("Failed to fetch programs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <ProgramsContext.Provider value={{ programData, isLoading, fetchPrograms }}>
      {children}
    </ProgramsContext.Provider>
  );
};

export const usePrograms = () => {
  return useContext(ProgramsContext);
};
