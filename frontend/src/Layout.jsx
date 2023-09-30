import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./context/AuthContext";
import MusicPlayer from "./components/MusicPlayer";
import { useMusicContext } from "./context/MusicContext";
import NotificationPanel from "./components/NotificationPanel";

const Layout = ({ children }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { activeSong, setActiveSong, isNotificationClicked, setIsNotificationClicked, isPlaying, setIsPlaying } = useMusicContext()

  useEffect(() => {
    const handleSpacebarPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setIsPlaying(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleSpacebarPress)
    return () => {
      window.removeEventListener('keydown', handleSpacebarPress)
    }
  }, [isPlaying, setIsPlaying])

  useEffect(() => { setActiveSong(null) }, [])

  return (
    <div className="flex flex-col h-screen justify-between custom-scrollbar overflow-hidden">
      <div className={`flex relative ${activeSong ? 'h-[85vh]' : 'h-screen'} overflow-hidden`}>
        <div className="p-3 pl-6 w-36 overflow-y-auto custom-scrollbar overflow-x-hidden bg-[#1E1E1E] scrollbar-hide">
          <Sidebar />
        </div>
        <div className="py-8 px-5 overflow-auto custom-scrollbar w-full bg-[#1E1E1E]">
          <div className="w-full flex justify-end gap-7 items-center">
            <div
              className="text-white text-2xl cursor-pointer rounded-full hover:bg-[#111111] p-3 transition-all duration-200 ease-in-out"
              onClick={() => setIsNotificationClicked(true)}
              title="Notifications"
            >
              <AiOutlineBell />
            </div>
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-gray-200 ">{user?.username}</h2>
              <FiLogOut
                className="text-red-600 cursor-pointer scale-110"
                onClick={logout}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
      {activeSong &&
        <div
          className="h-[15vh] flex animate-slideup backdrop-blur-lg"
          style={{ background: 'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)' }}
        >
          <MusicPlayer />
        </div>}
      <NotificationPanel />
      {isNotificationClicked && <div className='absolute top-0 h-screen w-screen bg-[#1E1E1E] bg-opacity-70 z-40' onClick={() => setIsNotificationClicked(false)} />}
    </div>
  );
};

export default Layout;
