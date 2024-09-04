import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import UsersTable from "./UsersTable";
import { getUsers } from "../../Api/Users";
import SkeletonLoader from "./SkeletonLoader";

export const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const getUsersData = async () => {
    try {
      const response = await getUsers();
      // console.log(response);
      setUsersData(response);
    } catch (error) {
      // console.error("Error", error);
      toast.error("Failed to fetch users. Please try again later.");
    }
    finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-4 h-auto w-full">
        <Sidebar />
        <div className="pt-10 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] h-auto">
          <h2 className="text-[#FF2800] font-bold text-2xl md:text-3xl px-4">
            Users
          </h2>
          <div className="w-full px-4 bg-white py-4 mt-5 md:mt-7 rounded-3xl">
          {isLoading ? (
              <SkeletonLoader count={10} /> // Show skeleton loader when loading
            ) : usersData.length > 0 ? (
              <UsersTable users={usersData} />
            ) : (
              <p>No users found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Users;
