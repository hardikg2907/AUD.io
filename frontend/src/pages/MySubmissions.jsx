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
            className="hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer rounded-lg overflow-hidden w-32 h-32 flex justify-center items-center bg-[#3f3f3f]"
          >
            {/* <div className=""> */}
            <BsFillFileEarmarkMusicFill className="scale-[300%] text-[#c7c7c7]" />
            <div className="absolute self-end z-10">
              <h2 className="text-lg font-semibold mb-2">{submission.name}</h2>
              <BsFillPlayFill className="scale-[200%]" />
            </div>
            {/* <p className="text-gray-600 mb-1">{submission.artist}</p>
              <p className="text-gray-600">{submission.genre}</p> */}
            {/* Add more details as needed */}
            {/* </div> */}
            <button className="absolute"></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySubmissions;
