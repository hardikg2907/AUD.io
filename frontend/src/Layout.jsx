import React from "react";
import Sidebar from "./components/Sidebar";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./context/AuthContext";

const Layout = ({ children }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="flex h-screen">
      <div className="h-screen p-3 pl-6 w-36 overflow-y-auto overflow-x-hidden bg-[#1E1E1E]">
        <Sidebar />
      </div>
      <div className="py-8 px-5 overflow-auto h-full w-full bg-[#1E1E1E]">
        <div className="w-full flex justify-end gap-3 items-center">
          <h2 className="text-gray-200 ">{user?.username}</h2>
          <FiLogOut
            className="text-red-600 cursor-pointer scale-110"
            onClick={logout}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
