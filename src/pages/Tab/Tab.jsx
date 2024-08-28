import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import AddTab from "./AddTab";
import ChangePasswordModal from "./ChangePasswordModal";

function Tab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [tabData, setTabData] = useState([
    { tabcount: "Tab 1" },
    { tabcount: "Tab 2" },
    { tabcount: "Tab 3" },
    { tabcount: "Tab 4" },
    { tabcount: "Tab 5" },
    { tabcount: "Tab 6" },
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPasswordModal = () => {
    // Close the dropdown
    setDropdownOpen(null);
    // Open the password modal
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <Sidebar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
            Tab
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7">
            <div className="flex flex-col md:flex-row justify-between p-3 w-full bg-[#FF2800] rounded-2xl">
              <div className="flex justify-between items-center w-full md:w-[40%] text-white mb-4 md:mb-0">
                <h1 className="text-sm md:text-lg font-semibold">Tab</h1>
              </div>
              <div
                className="flex justify-center items-center px-3 gap-3 md:gap-5 bg-[#111111] text-white rounded-2xl cursor-pointer"
                onClick={openModal}
              >
                <img
                  src="/uil_plus.png"
                  alt="Add Program"
                  className="h-5 w-5 md:h-7 md:w-7"
                />
                <button className="h-10 w-[90px] md:h-12 md:w-[100px] bg-[#111111] text-sm md:text-base">
                  Add Tab
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-4">
            {tabData.map((tab, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between p-4 w-full bg-white rounded-2xl shadow mb-4 relative cursor-pointer"
              >
                <div className="flex justify-between items-center w-full  mb-4 md:mb-0">
                  <h1 className="text-sm md:text-base">{tab.tabcount}</h1>
                  <div className="flex justify-end md:justify-center cursor-pointer relative">
                  <img
                    src="/iconamoon_menu-kebab-vertical-bold.png"
                    alt="Menu"
                    className="h-5 w-5 md:h-6 md:w-6"
                    onClick={() => toggleDropdown(index)}
                  />
                  {dropdownOpen === index && (
                    <div className="absolute right-0 mt-6 w-40 bg-white rounded-lg shadow-lg z-50">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-sky-600 hover:bg-gray-100"
                        onClick={openPasswordModal}
                      >
                        Change Password
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => handleDelete(index)}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Tab Modal */}
      <AddTab isOpen={isModalOpen} onClose={closeModal} />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
      />
    </>
  );
}

export default Tab;
