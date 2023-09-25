import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AudioTile from "../components/AudioTile";
import Loader from "../components/Loader";

// Replace this with your API URL for fetching user submissions

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [render, setRender] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const fetchData = async () => {
    setSubmissions([])
    const res = await axios.get(
      `http://localhost:5000/api/submissions/all/${user._id}`
    );
    console.log(res?.data);
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
  }, [render, user]);

  if (!submissions.length) return <Loader title={'Loading Your Songs...'} />

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-200">
        My Submissions
      </h1>
      <div className="flex gap-4 flex-wrap">
        {submissions.map((submission) => (
          <AudioTile
            key={submission._id}
            submission={submission}
            setRender={setRender}
            page="mySub"
            allSongs={submissions}
          />
        ))}
      </div>
    </div>
  );
};

export default MySubmissions;
