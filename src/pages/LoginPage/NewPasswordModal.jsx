import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../Api/Auth";

function NewPasswordModal({ onClose }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordSubmit = async (data) => {
    try {
      // Call the reset password API
      const response = await resetPassword({
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      console.log("Password reset response:", response);

      navigate("/");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] max-w-md mx-4">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="hover:text-red-500 focus:outline-none text-[#FF2800] text-2xl md:text-3xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(handlePasswordSubmit)}>
          <div className="px-2 pt-7">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-[#181919]">
              Create a new password
            </h2>
            <p className="text-center mt-3 text-sm sm:text-base md:text-lg">
              Your new password must be different from previously used
              passwords.
            </p>
            <div className="bg-[#FAFAFA] flex items-center p-2 mt-5 md:p-3 rounded-full shadow-md h-[40px] md:h-[45px] lg:h-[50px] xl:h-[50px] 2xl:h-[50px] w-full ">
              <img src="/Frame 34.png" alt="" className="h-8 w-8" />
              <hr className="w-[1px] md:w-[2px] h-full bg-[#C2C3C3] border-0 mx-1 md:mx-2" />
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="flex-1 h-full outline-none bg-transparent text-[#C2C3C3] text-sm md:text-base"
                placeholder="Password"
              />
              <img
                src="/ion_eye-off.png"
                alt=""
                className="cursor-pointer h-5 w-5 sm:block hidden"
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <div className="bg-[#FAFAFA] flex items-center p-2 mt-4 md:p-3 rounded-full shadow-md h-[40px] md:h-[45px] lg:h-[50px] xl:h-[50px] 2xl:h-[50px] w-full">
              <img src="/Frame 34.png" alt="" className="h-8 w-8" />
              <hr className="w-[1px] md:w-[2px] h-full bg-[#C2C3C3] border-0 mx-1 md:mx-2" />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                className="flex-1 h-full outline-none bg-transparent text-[#C2C3C3] text-sm md:text-base"
                placeholder="Confirm Password"
              />
              <img
                src="/ion_eye-off.png"
                alt=""
                className="cursor-pointer h-5 w-5 sm:block hidden"
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}

            <button
              type="submit" // Trigger form submission
              className="bg-[#FF2800] shadow-md rounded-full font-semibold mt-8 text-lg text-white h-[35px] sm:h-[40px] md:h-[45px] lg:h-[50px] w-full hover:bg-red-500"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPasswordModal;
