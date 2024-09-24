import React , {useState } from 'react'
import SideBar from '../../components/SideBar'
import ExerciseModal from './ExerciseModal';

const Exercise = () => {
    const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div>
         <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <SideBar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
        <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
        Exercise
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7">
            <div className="flex flex-col md:flex-row justify-between items-center p-3 w-full bg-[#FF2800] rounded-2xl">
              <div className="flex justify-between items-center w-full md:w-[40%] text-white mb-4 md:mb-0">
                <h1 className="text-sm md:text-base">Exercise Name</h1>
                
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
                  Add Exercise
                </button>
              </div>
            </div>
          </div>
      
        </div>
      </section>
      {modalOpen && <ExerciseModal closeModal={closeModal} />}
    </div>
  )
}

export default Exercise
