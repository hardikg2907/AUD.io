import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";

const Track = ({ isPlaying, isActive, activeSong }) => {
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    const res = await axios.patch(`submissions/like/${activeSong._id}`, {
      userId: user._id,
    });
    if (res?.data) {
      setLiked(!liked);
    }
  };

  useEffect(() => {
    if (activeSong?.likedByUser.includes(user._id)) setLiked(true);
    else setLiked(false);
    // console.log(sdfsd);
  }, [activeSong]);

  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={
            activeSong?.thumbnail ||
            "data:image/jpeg;base64,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"
          }
          alt="cover art"
          className="rounded-full h-16 w-16"
        />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.name ? activeSong?.name : "No active Song"}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.userId?.username
            ? activeSong?.userId?.username
            : user?.username
            ? user?.username
            : "No active Song"}
        </p>
      </div>
      {activeSong?.likedByUser.includes(user._id) ? (
        <AiFillHeart
          className="text-white text-3xl cursor-pointer"
          onClick={toggleLike}
        />
      ) : (
        <AiOutlineHeart
          className="text-white text-3xl cursor-pointer"
          onClick={toggleLike}
        />
      )}
    </div>
  );
};

export default Track;
