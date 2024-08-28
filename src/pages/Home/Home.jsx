import React from "react";
import SideBar from "../../components/SideBar";
import RecentAchievements from "./RecentAchievements";
import TopWinsUsersChart from "./TopWinsUsersChart";
import UsersWorkoutTable from "./UsersWorkoutTable";
const Home = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <SideBar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
            Dashboard
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TopWinsUsersChart />
              <RecentAchievements />
            </div>
            <div className="mt-8">
              <UsersWorkoutTable/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
