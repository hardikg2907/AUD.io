import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { BsFillFileEarmarkMusicFill, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import {useNavigate} from "react-router-dom"

// Replace this with your API URL for fetching user submissions

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuthContext();
  const navigate=useNavigate();

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/submissions/all/${user._id}`
    );
    if (res) setSubmissions(res?.data);
  };

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
  useEffect(() => {
    // Fetch user submissions from the API
    // fetch(API_URL, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your authentication token
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => setSubmissions(data))
    //   .catch((error) => console.error("Error fetching data:", error));
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-200">
        My Submissions
      </h1>
      <div className="flex gap-4 flex-wrap">
        {submissions.map((submission) => (
          <div
            key={submission._id}
            className="hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer rounded-lg overflow-hidden w-32 h-32 flex justify-center items-center bg-[#3f3f3f] group duration-300 ease-in-out opacity-80 hover:opacity-100 px-2"
            onClick={()=>navigate(`/my-submissions/${submission._id}`)}
          >
            <div className="absolute w-full flex justify-end top-2 mr-2">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  downloadMedia(submission?.audioFile, submission?.name);
                }}
              >
                <button className="bg-gray-200 h-7 w-7 flex justify-center items-center p-4px rounded-full hover:h-8 hover:w-8 text-center duration-200 invisible group-hover:visible">
                  <AiOutlineCloudDownload />
                </button>
              </a>
            </div>
            {/* <div className=""> */}
            <BsFillFileEarmarkMusicFill className="scale-[300%] text-[#c7c7c7]" />
            <div className="bg-[#383838] absolute self-end z-10 flex justify-between shadow items-center w-full px-2 py-1 h-1/5">
              <p className="text-lg font-semibold mb-2 text-clip">
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
        ))}
      </div>
    </div>
  );
};

export default MySubmissions;
