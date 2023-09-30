import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AudioTile from "../components/AudioTile";
import Loader from "../components/Loader";

// Replace this with your API URL for fetching user submissions

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(`submissions/all/${user._id}`);
    // console.log(res?.data);
    if (res) setSubmissions(res?.data);
    setIsLoading(false);
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

  if (isLoading) return <Loader title={"Loading Your Songs..."} />;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-200">
        My Submissions
      </h1>
      <div className="flex gap-4 flex-wrap animate-slideup">
        {submissions?.length ? (
          submissions.map((submission) => (
            <AudioTile
              key={submission._id}
              submission={submission}
              setRender={setRender}
              page="mySub"
              allSongs={submissions}
              setIsLoading={setIsLoading}
            />
          ))
        ) : (
          <>
            {/* <p>No Submissions</p> */}
            <p className="text-red-600 text-sm">
              Make your first submission{" "}
              <Link className="text-blue-400 hover:underline" to={"/submit"}>
                here
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
