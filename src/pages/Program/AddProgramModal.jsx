import React, { useState } from "react";

const AddProgramModal = ({ isOpen, onClose, onAddProgram }) => {
  const [programTitle, setProgramTitle] = useState("");
  const [startDate, setStartDate] = useState("");

  if (!isOpen) return null;

  const handleAddProgram = () => {
    if (programTitle && startDate) {
      onAddProgram({ title: programTitle, date: startDate });
      onClose();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
        <button
          className="text-red-500 text-xl absolute top-2 right-2"
          onClick={onClose}
        >
          <img src="/ic_round-close.svg" alt="close_icon" />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Add Program</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Program Title
          </label>
          <input
            type="text"
            value={programTitle}
            onChange={(e) => setProgramTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <div className="flex items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAddProgram}
            className=" bg-red-500 text-white py-2 px-8 rounded-full hover:bg-red-600 transition duration-200 "
          >
            Add program
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProgramModal;
