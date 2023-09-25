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
    <div className="flex flex-col h-screen justify-between">
      <div className={`flex relative ${activeSong ? 'h-[85vh]' : 'h-screen'}`}>
        <div className="p-3 pl-6 w-36 overflow-y-auto overflow-x-hidden bg-[#1E1E1E] scrollbar-hide">
          <Sidebar />
        </div>
        <div className="py-8 px-5 overflow-auto w-full bg-[#1E1E1E]">
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
      {activeSong && <div
        className="h-[15vh] flex animate-slideup backdrop-blur-lg"
        style={{ background: 'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)' }}
      >
        <MusicPlayer />
      </div>}
    </div>
  );
};

export default Layout;
