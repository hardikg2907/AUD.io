import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  BsFillFileEarmarkMusicFill,
  BsFillPlayFill,
  BsTrash3,
  BsFillPauseFill,
} from "react-icons/bs";
import { PiWaveformBold } from "react-icons/pi";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMusicContext } from "../context/MusicContext";
import { handleFileDelete } from "../firebaseFunctions";

const downloadMedia = (media, name) => {
  (async () => {
    let response = await fetch(media);
    let data = await response.blob();
    let metadata = {
      type: media?.type,
    };
    let file = new File([data], `${name}.mp3`, { type: "audio/mp3" });

    const url = window.URL.createObjectURL(file);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // the filename you want
    a.download = name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })();
};

const AudioTile = ({ submission, page, setRender, allSongs, setIsLoading }) => {
  const { user } = useAuthContext();
  const { handleSetSong, activeSong, isPlaying, setIsPlaying } =
    useMusicContext();
  const navigate = useNavigate();

  const deleteMusic = async () => {
    setIsLoading(true);
    await handleFileDelete(submission?.audioFile)
      .then(async () => {
        const res = await axios.delete(
          `submissions/${submission?._id}/${user?._id}`
        );
        if (res?.data) {
          setRender((prev) => !prev);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      key={submission._id}
      className={`mb-6 hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer rounded-lg overflow-hidden w-32 h-44 flex justify-center items-center bg-[#3f3f3f] group duration-300 ease-in-out opacity-80 hover:opacity-100 px-2 ${
        activeSong?._id === submission?._id
          ? "-translate-y-2 shadow-lg opacity-100"
          : ""
      }`}
      onClick={() => navigate(`/my-submissions/${submission._id}`)}
    >
      <div className="absolute w-full flex justify-between top-2 mr-2">
        <a
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            downloadMedia(submission?.audioFile, submission?.name);
          }}
        >
          <button className="ml-2 bg-gray-200 h-7 w-7 flex justify-center items-center rounded-full hover:h-8 hover:w-8 text-center duration-200 opacity-0 group-hover:opacity-100">
            <AiOutlineCloudDownload title="Download" />
          </button>
        </a>
        {(page === "mySub" || submission.userId._id === user._id) && (
          <button
            className="bg-[#f03a47] h-7 w-7 flex justify-center items-center p-4px rounded-full hover:h-8 hover:w-8 text-center duration-200 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              deleteMusic();
            }}
          >
            <BsTrash3 title="Delete" />
          </button>
        )}
      </div>
      {/* <div className=""> */}
      <BsFillFileEarmarkMusicFill className="mb-10 scale-[300%] text-[#c7c7c7]" />
      <div className="bg-[#383838] absolute self-end z-10 w-full px-2 py-1 h-1/3 shadow">
        <div className="flex justify-between items-center relative">
          <div
            className={`absolute right-1 rounded-full h-5 w-5 group-hover:opacity-100 transition-all duration-300 ease-in-out opacity-0 scale-150 -mt-8 text-lg text-gray-900 bg-gray-200 flex justify-center items-center hover:scale-[1.7] ${
              activeSong?._id === submission?._id ? "opacity-100" : ""
            }`}
            onClick={
              activeSong?._id === submission?._id && isPlaying
                ? (e) => {
                    setIsPlaying(false);
                    e.stopPropagation();
                  }
                : (event) => handleSetSong(submission, allSongs, event)
            }
          >
            {activeSong?._id === submission?._id && isPlaying ? (
              <BsFillPauseFill title="Pause" />
            ) : (
              <BsFillPlayFill title="Play" />
            )}
          </div>
          <p className="text-lg font-semibold truncate">{submission.name}</p>
          {/* <button className="bg-[#1FDF64] h-7 w-7 flex justify-center items-center p-4px rounded-full hover:h-8 hover:w-8 text-center duration-200 invisible group-hover:visible">
            <BsFillPlayFill className="scale-[150%]" />
          </button> */}
        </div>
        <div className="flex items-center">
          <PiWaveformBold className="scale-[150%]" />
          {page === "discover" && (
            <p className="ml-2 truncate">{submission.userId.username}</p>
          )}
          {page === "mySub" && <p className="ml-2 truncate">{user.username}</p>}
        </div>
      </div>
      {/* <p className="text-gray-600 mb-1">{submission.artist}</p>
          <p className="text-gray-600">{submission.genre}</p> */}
      {/* Add more details as needed */}
      {/* </div> */}
    </div>
  );
};

export default AudioTile;
