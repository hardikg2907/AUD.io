import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { BsFillFileEarmarkMusicFill, BsFillPlayFill, BsTrash3 } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      a.download = media?.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })();
  };

const AudioTile=({submission, page, setRender})=>{
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const deleteMusic=async()=>{
        const res=await axios.delete(
            `http://localhost:5000/api/submissions/${submission?._id}/${user?._id}`
        );
        if(res?.data) {
            setRender(prev=>!prev);
        }
    }

    return(
        <div
            key={submission._id}
            className="mb-6 hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer rounded-lg overflow-hidden w-32 h-32 flex justify-center items-center bg-[#3f3f3f] group duration-300 ease-in-out opacity-80 hover:opacity-100 px-2"
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
                  <AiOutlineCloudDownload />
                </button>
              </a>
                {page==="mySub" &&
                    <button className="bg-red-600 h-7 w-7 flex justify-center items-center p-4px rounded-full hover:h-8 hover:w-8 text-center duration-200 opacity-0 group-hover:opacity-100"
                        onClick={(e)=>{
                            e.stopPropagation();
                            deleteMusic();
                        }}
                    >
                        <BsTrash3 />
                    </button>
                }
            </div>
            {/* <div className=""> */}
            <BsFillFileEarmarkMusicFill className="mb-2 scale-[300%] text-[#c7c7c7]" />
            <div className="bg-[#383838] absolute self-end z-10 flex justify-between shadow items-center w-full px-2 py-1 h-1/5">
              <p className="text-lg font-semibold truncate">
                {submission.name}
              </p>
              {/* <button className="bg-[#1FDF64] h-7 w-7 flex justify-center items-center p-4px rounded-full hover:h-8 hover:w-8 text-center duration-200 invisible group-hover:visible">
            <BsFillPlayFill className="scale-[150%]" />
          </button> */}
            </div>
            {/* <p className="text-gray-600 mb-1">{submission.artist}</p>
          <p className="text-gray-600">{submission.genre}</p> */}
            {/* Add more details as needed */}
            {/* </div> */}
          </div>
    );
}

export default AudioTile;