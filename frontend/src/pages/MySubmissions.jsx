import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { BsFillFileEarmarkMusicFill, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";

// Replace this with your API URL for fetching user submissions

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuthContext();

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/submissions/all/${user._id}`
    );
    if (res) setSubmissions(res?.data);
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
      <div className="grid grid-cols-8 gap-1">
        {submissions.map((submission) => (
          <div
            key={submission._id}
            className="hover:shadow-lg transition transform hover:-translate-y-2 cursor-pointer rounded-lg overflow-hidden w-32 h-32 flex justify-center items-center bg-[#3f3f3f] group duration-300 ease-in-out opacity-80 hover:opacity-100 px-2"
          >
            <div className="absolute w-full flex justify-end">
              <button className="bg-gray-200 h-7 w-7 flex justify-center items-center p-4px rounded-full hover:h-8 hover:w-8 text-center duration-200 invisible group-hover:visible">
                <AiOutlineCloudDownload />
              </button>
            </div>
            {/* <div className=""> */}
            <BsFillFileEarmarkMusicFill className="scale-[300%] text-[#c7c7c7]" />
            <div className="bg-[#383838] absolute self-end z-10 flex justify-between shadow items-center w-full px-2 h-1/5">
              <p className="text-lg font-semibold mb-2 text-clip">
                {submission.name}
              </p>
              <button className="bg-[#1FDF64] h-7 w-7 flex justify-center items-center p-4px rounded-full hover:h-8 hover:w-8 text-center duration-200 invisible group-hover:visible">
                <BsFillPlayFill className="scale-[150%]" />
              </button>
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
