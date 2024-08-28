import React, { useState } from "react";
import OtpInput from "react-otp-input";
import NewPasswordModal from "./NewPasswordModal";

function NextModal() {
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(true); // Initially show OTP modal
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false); // Initially hide NewPasswordModal

  const handleChange = (otpValue) => {
    const numericValue = otpValue.replace(/[^0-9]/g, "");
    setOtp(numericValue);
  };

  const handleNextClick = () => {
    setShowOtpModal(false); // Hide OTP modal
    setShowNewPasswordModal(true); // Show NewPasswordModal
  };

  return (
    <>
      {showOtpModal && (
        <div className="fixed inset-0 bg-gray-900 bg-login-img bg-opacity-70 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 sm:p-8 md:p-10 w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-xl mx-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowOtpModal(false)} // Close the OTP modal
                className="hover:text-red-500 focus:outline-none text-[#FF2800] text-2xl md:text-3xl"
              >
                &times;
              </button>
            </div>
            <div className="px-2 pt-7">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-[#181919]">
                Enter the code
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#383939] mt-4 text-center">
                We have just sent you a 4-digit code to
              </p>
              <p className="text-[#FF2800] text-center text-base mt-1">
                example@gmail.com
              </p>
            </div>
            <div className="flex justify-around sm:gap-10 gap-5 items-center pt-5">
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={4}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      border: "1px solid #828387",
                      width: "50px",
                      height: "50px",
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "18px",
                      color: "#4D4F53",
                      margin: "8px",
                      boxShadow: "0px 4px 12px 0px #0000001A",
                      
                    }}
                  />
                )}
              />
            </div>
            <div className="py-10">
              <button
                onClick={handleNextClick} // Switch to the new password modal
                className="bg-[#FF2800] shadow-md rounded-full font-semibold text-sm md:text-lg text-white h-[35px] sm:h-[40px] md:h-[45px] lg:h-[50px] w-full hover:bg-red-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewPasswordModal && (
        <NewPasswordModal onClose={() => setShowNewPasswordModal(false)} />
      )}
    </>
  );
}

export default NextModal;
