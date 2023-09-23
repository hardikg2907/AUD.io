import React from "react";
import Sidebar from "./components/Sidebar";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./context/AuthContext";
import MusicPlayer from "./components/MusicPlayer";
import { useMusicContext } from "./context/MusicContext";

const Layout = ({ children }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { activeSong } = useMusicContext()
  return (
    <div className="flex h-screen relative">
      {activeSong && <div className="absolute h-24 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#09091f] backdrop-blur-lg rounded-t-3xl z-10">
        <MusicPlayer />
      </div>}
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
