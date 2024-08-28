import React from "react";
import Sidebar from "../../components/SideBar";
import UsersTable from "./UsersTable";

export const Users = () => {

  const users = [
    {
      id: 'EL40012',
      name: 'Roselle Ehrman',
      email: 'roselle@gmail.com',
      avatar: '/Ellipse 12.svg', // Replace with actual avatar path
      lastActive: '15/08/2017',
      totalWorkouts: 561,
      weeklyWorkouts: 561,
      streaks: 561,
      personalBest: 561,
    },
    {
      id: 'EL40013',
      name: 'Andriana',
      email: 'andriana@gmail.com',
      avatar: '/Ellipse 12 (1).svg', // Replace with actual avatar path
      lastActive: '12/06/2020',
      totalWorkouts: 703,
      weeklyWorkouts: 703,
      streaks: 703,
      personalBest: 703,
    },
    {
      id: 'EL40014',
      name: 'Vacinzo',
      email: 'vacinzo@gmail.com',
      avatar: '/Ellipse 12 (2).svg', // Replace with actual avatar path
      lastActive: '15/08/2017',
      totalWorkouts: 583,
      weeklyWorkouts: 583,
      streaks: 583,
      personalBest: 583,
    },
    {
      id: 'EL40016',
      name: 'Leatrice Kulik',
      email: 'Kulik@gmail.com',
      avatar: '/Ellipse 12 (3).svg', // Replace with actual avatar path
      lastActive: '18/09/2016',
      totalWorkouts: 185,
      weeklyWorkouts: 185,
      streaks: 185,
      personalBest: 185,
    },
    {
      id: 'EL40017',
      name: 'Darron Handler',
      email: 'Darron@gmail.com',
      avatar: '/Ellipse 12 (4).svg', // Replace with actual avatar path
      lastActive: '16/08/2013',
      totalWorkouts: 130,
      weeklyWorkouts: 130,
      streaks: 130,
      personalBest: 130,
    },
    {
      id: 'EL40018',
      name: 'Alvaro',
      email: 'Alvaro@gmail.com',
      avatar: '/Ellipse 12 (5).svg', // Replace with actual avatar path
      lastActive: '07/05/2016',
      totalWorkouts: 540,
      weeklyWorkouts: 540,
      streaks: 540,
      personalBest: 540,
    },
    {
      id: 'EL40019',
      name: 'Clare',
      email: 'clare@gmail.com',
      avatar: '/Ellipse 12 (6).svg', // Replace with actual avatar path
      lastActive: '15/08/2017',
      totalWorkouts: 453,
      weeklyWorkouts: 453,
      streaks: 453,
      personalBest: 453,
    },
    {
      id: 'EL40020',
      name: 'Leandro',
      email: 'Leandro@gmail.com',
      avatar: '/Ellipse 12 (7).svg', // Replace with actual avatar path
      lastActive: '07/05/2016',
      totalWorkouts: 357,
      weeklyWorkouts: 357,
      streaks: 357,
      personalBest: 357,
    },
    {
      id: 'EL40021',
      name: 'Dario bust',
      email: 'Dario@gmail.com',
      avatar: '/Ellipse 12 (8).svg', // Replace with actual avatar path
      lastActive: '28/10/2012',
      totalWorkouts: 556,
      weeklyWorkouts: 556,
      streaks: 556,
      personalBest: 556,
    },
  ];
  
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <Sidebar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
          Users
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7 rounded-3xl">

          <UsersTable users={users} />
          </div>
        </div>
      </section>
    </>
  );
};
export default Users;
