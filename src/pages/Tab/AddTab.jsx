import React, { useState } from "react";

const AddTab = ({ isOpen, onClose }) => {
  const [tabId, setTabId] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleAddProgram = () => {
    if (tabId && password) {
      onAddProgram({ id: tabId, pass: password });
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
        <h2 className="text-2xl font-semibold text-center mb-4">Add Tab</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Tab Id
          </label>
          <input
            type="text"
            value={tabId}
            onChange={(e) => setTabId(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="flex items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            // onClick={handleAddProgram}
            className=" bg-red-500 text-white py-2 px-8 rounded-full hover:bg-red-600 transition duration-200 "
          >
            Add Tab
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTab;
