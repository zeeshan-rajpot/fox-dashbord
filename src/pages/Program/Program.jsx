import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import AddProgramModal from "./AddProgramModal";
import { useNavigate } from "react-router-dom";
import ProgramSkeleton from "./ProgramSkeleton";
import { usePrograms } from "./ProgramsContext";
import { useLocation } from "react-router-dom"; 
import axios from 'axios';

function Program() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { programData, isLoading, fetchPrograms } = usePrograms();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleEdit = (index) => {
    console.log("Edit program at index:", index);
    // Implement your edit logic here
  };

  const handleDelete = async (index, programId) => {
    console.log("Delete program at index:", programId);

    try {
        const response = await axios.delete(`https://fox-training-f2fph3abhfgbb4hv.eastus-01.azurewebsites.net/programs/del/${programId}`);

        if (response.status === 200) {  // Check if the deletion was successful
            console.log(`Program with ID ${programId} deleted successfully`);

            fetchPrograms();

        } else {
            console.error(`Failed to delete program with ID ${programId}:`, response.statusText);
        }
    } catch (error) {
        console.error("Error deleting the program:", error.response ? error.response.data : error.message);
    }
};
  const handleProgramClick = (program) => {
    navigate("/program/programdetails", { state: { program } });
  };

  useEffect(() => {
    fetchPrograms();
  }, [location]);

  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <Sidebar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
            Programs
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7">
            <div className="flex flex-col md:flex-row justify-between items-center p-3 w-full bg-[#FF2800] rounded-2xl">
              <div className="flex justify-between items-center w-full md:w-[40%] text-white mb-4 md:mb-0">
                <h1 className="text-sm md:text-base">Start Date</h1>
                <h2 className="text-sm md:text-base ">Program Title</h2>
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
                  Add Program
                </button>
              </div>
            </div>
          </div>
          {isLoading ? (
            <ProgramSkeleton />
          ) : (
            <div className="flex flex-col px-4">
              {programData.map((program, index) => (
                <div
                  key={program._id}
                  className="flex flex-col md:flex-row justify-between p-4 w-full bg-white rounded-2xl shadow mb-4 relative cursor-pointer"
                  onClick={() => handleProgramClick(program)}
                >
                  <div className="flex justify-between items-center w-full mb-4 md:mb-0">
                    <h1 className="text-sm md:text-base">
                      {new Date(program.startDate).toLocaleDateString()}
                    </h1>
                    <h2 className="text-sm md:text-base md:mr-80">
                      {program.title}
                    </h2>
                    <div
                      className="flex justify-end md:justify-center cursor-pointer relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(index);
                      }}
                    >
                      <img
                        src="/iconamoon_menu-kebab-vertical-bold.png"
                        alt="Menu"
                        className="h-5 w-5 md:h-6 md:w-6"
                      />
                      {dropdownOpen === index && (
                        <div className="absolute right-0 mt-6 w-40 bg-white rounded-lg shadow-lg z-50">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleDelete(index, program._id)}
                          >
                            Delete
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

      {/* Add Program Modal */}
      <AddProgramModal
        isOpen={isModalOpen}
        onClose={closeModal}
        updateProgram={fetchPrograms}
      />
    </>
  );
}

export default Program;
