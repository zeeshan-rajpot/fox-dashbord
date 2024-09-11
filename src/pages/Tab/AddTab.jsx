import React from "react";
import { useForm } from "react-hook-form";
import { addTab } from "../../Api/Tab";
import toast from "react-hot-toast";

const AddTab = ({ isOpen, onClose, getTabs }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addTab(data);
      console.log(response);
      reset();
      onClose();
      getTabs();
      toast.success("Tab added successfully");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleClose = () =>{
    onClose();
    reset();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
        <button
          className="text-red-500 text-xl absolute top-2 right-2"
          onClick={handleClose}
        >
          <img src="/ic_round-close.svg" alt="close_icon" />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Add Tab</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tab Id</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              {...register("tabId", { required: "Tab Id is required" })}
            />
            {errors.tabId && (
              <p className="text-red-500 text-sm">{errors.tabId.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Station</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              {...register("stationNumber", {
                required: "Station number is required",
              })}
            />
            {errors.station && (
              <p className="text-red-500 text-sm">{errors.station.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-8 rounded-full hover:bg-red-600 transition duration-200"
            >
              Add Tab
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTab;
