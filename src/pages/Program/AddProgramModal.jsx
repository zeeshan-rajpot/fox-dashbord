import React from "react";
import { useForm } from "react-hook-form";
import { addProgram } from "../../Api/Programs";

const AddProgramModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addProgram(data);
      console.log(response);
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!isOpen) return null;

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Program Title
            </label>
            <input
              {...register("title", { required: "Program title is required" })}
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
            />
            {errors.programTitle && (
              <span className="text-red-500 text-sm">
                {errors.programTitle.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <div className="flex items-center">
              <input
                {...register("startDate", {
                  required: "Start date is required",
                })}
                type="date"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              />
            </div>
            {errors.startDate && (
              <span className="text-red-500 text-sm">
                {errors.startDate.message}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-8 rounded-full hover:bg-red-600 transition duration-200"
            >
              Add Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProgramModal;
