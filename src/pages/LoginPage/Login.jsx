import React, { useState } from "react";
import { Link } from "react-router-dom";
import ForgetPassword from "./ForgetPassword"; // Ensure this path is correct

function Login() {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <section className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col items-center px-4 md:px-8 lg:px-12 rounded-xl">
          <div className="flex justify-center items-center">
            <img src="/image 12.png" alt="" className="h-12" />
          </div>
          <div className="gap-6 md:gap-8 lg:gap-10 pt-12 md:pt-16 lg:pt-20 flex flex-col justify-center items-center w-full">
            <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-[#272828]">
              Login
            </h1>
            <div className="flex flex-col gap-5 px-2">
              <div className="bg-[#FAFAFA] flex items-center p-2 md:p-3 rounded-full shadow-md h-[50px] md:h-[55px] lg:h-[59px] w-full md:w-[360px] lg:w-[460px]">
                <img src="/Frame 33.png" alt="" className="h-8 w-8" />
                <hr className="w-[1px] md:w-[2px] h-full bg-[#C2C3C3] border-0 mx-1 md:mx-2" />
                <input
                  type="text"
                  className="bg-transparent flex-1 text-nowrap h-full outline-none text-[#C2C3C3] text-sm md:text-base placeholder-[#C2C3C3] focus:bg-[#FAFAFA] focus:outline-none focus:fill-none"
                  placeholder="Email"
                />
              </div>

              <div className="bg-[#FAFAFA] flex items-center p-2 md:p-3 rounded-full shadow-md h-[50px] md:h-[55px] lg:h-[59px] w-full md:w-[360px] lg:w-[460px]">
                <img src="/Frame 34.png" alt="" className="h-8 w-8" />
                <hr className="w-[1px] md:w-[2px] h-full bg-[#C2C3C3] border-0 mx-1 md:mx-2" />
                <input
                  type="password"
                  className="flex-1 h-full outline-none bg-transparent text-[#C2C3C3] text-sm md:text-base"
                  placeholder="Password"
                />
                <img
                  src="/ion_eye-off.png"
                  alt=""
                  className="cursor-pointer h-5 w-5"
                />
              </div>
              <h1
                className="text-right font-normal text-sm md:text-base text-[#FF2800] cursor-pointer"
                onClick={handleModalOpen}
              >
                Forgot password?
              </h1>
            </div>

            <div className="p-3 md:p-5 w-full">
              <Link to="/dashboard" >
              <button className="h-[45px] md:h-[50px] lg:h-[55px] w-full text-sm md:text-base lg:text-lg text-white bg-[#FF2800] shadow-md rounded-full md:w-[320px] lg:w-[400px] xl:w-[459px] hover:bg-red-500">
                Login
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      <ForgetPassword show={showModal} onClose={handleModalClose} />
    </>
  );
}

export default Login;
