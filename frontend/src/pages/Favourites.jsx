import axios from "axios";
import React, { useEffect, useState } from "react";
import AudioTile from "../components/AudioTile";
import Loader from "../components/Loader";
import { useAuthContext } from "../context/AuthContext";

const Favourites = () => {
  const {user}=useAuthContext();
  const [submissions, setSubmissions] = useState([]);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(`submissions/favourites/${user._id}`);
    // console.log(res?.data);
    if (res) setSubmissions(res?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log(submissions.length);
    fetchData();
  }, [render]);

  if (isLoading) return <Loader title={"Loading Songs..."} />;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-200">My Favourites</h1>
      <div className="flex gap-4 flex-wrap animate-slideup">
        {submissions.map((submission, ind) => (
          <AudioTile
            key={ind}
            submission={submission}
            page="discover"
            allSongs={submissions}
            setRender={setRender}
            setIsLoading={setIsLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
