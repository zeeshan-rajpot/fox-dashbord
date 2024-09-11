import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import AddTab from "./AddTab";
import ChangePasswordModal from "./ChangePasswordModal";
import { changeTabPassword, deleteTabs, getTabs } from "../../Api/Tab";
import toast from "react-hot-toast";
import ProgramSkeleton from "../Program/ProgramSkeleton";

function Tab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTabId, setSelectedTabId] = useState(null);
  const [tabData, setTabData] = useState([]);

  // Fetch tabs from API
  const fetchTabs = async () => {
    try {
      const response = await getTabs();
      setTabData(response);
    } catch (error) {
      console.error("Failed to fetch programs", error);
      toast.error("Some Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTabs();
  }, []);

  // Delete tab by id
  const deleteTab = async (id) => {
    try {
      await deleteTabs(id);
      toast.success("Tab deleted successfully");
      fetchTabs(); // Refetch tabs after deletion
    } catch (error) {
      console.error("Error Deleting tab", error);
      toast.error("Error Deleting tab");
    }
  };

  // Change password function
  const ChangePassword = async (newPassword, confirmPassword) => {
    if (!selectedTabId) return;
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await changeTabPassword(selectedTabId, newPassword, confirmPassword); 
      console.log(response);
      toast.success("Password changed successfully");
      setIsPasswordModalOpen(false); 
      fetchTabs(); // Refetch tabs after password change
    } catch (error) {
      console.error("Error Changing Password", error);
      toast.error("Error Changing Password");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPasswordModal = (id) => {
    setSelectedTabId(id);
    setDropdownOpen(null);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
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
          {isLoading ? (
            <ProgramSkeleton />
          ) : (
            <div className="flex flex-col px-4">
              {tabData.map((tab) => (
                <div
                  key={tab._id}
                  className="flex flex-col md:flex-row justify-between p-4 w-full bg-white rounded-2xl shadow mb-4 relative cursor-pointer"
                >
                  <div className="flex justify-between items-center w-full mb-4 md:mb-0">
                    <h1 className="text-sm md:text-base">{tab.tabId}</h1>
                    <div className="flex justify-end md:justify-center cursor-pointer relative">
                      <img
                        src="/iconamoon_menu-kebab-vertical-bold.png"
                        alt="Menu"
                        className="h-5 w-5 md:h-6 md:w-6"
                        onClick={() => toggleDropdown(tab._id)}
                      />
                      {dropdownOpen === tab._id && (
                        <div className="absolute right-0 mt-6 w-40 bg-white rounded-lg shadow-lg z-50">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => deleteTab(tab._id)}
                          >
                            Delete Tab
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-sky-600 hover:bg-gray-100"
                            onClick={() => openPasswordModal(tab._id)} 
                          >
                            Change Password
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Tab Modal */}
      <AddTab isOpen={isModalOpen} onClose={closeModal} getTabs= {fetchTabs} />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        handleChangePassword={ChangePassword} 
      />
    </>
  );
}

export default Tab;
