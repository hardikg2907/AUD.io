import axios from "axios";
import React, { useEffect, useState } from "react";
import AudioTile from "../components/AudioTile";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const [submissions, setSubmissions] = useState([]);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  console.log(submissions);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(`submissions/discover`);
    // console.log(res?.data);
    if (res) setSubmissions(res?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log(submissions.length);
    fetchData();
  }, [render]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchSearchData = async (searchTerm) => {
      setIsLoading(true);
      const res = await axios.get(`submissions/discover?name=${searchTerm}`);
      // console.log(res?.data);
      if (res) setSubmissions(res?.data);
      setIsLoading(false);
    };

    if (searchTerm) {
      navigate(`/discover?search=${searchTerm}`);
      fetchSearchData(searchTerm);
    } else {
      navigate("/discover");
      fetchData();
    }
  }, [searchTerm]);

  // if (isLoading) return <Loader title={"Loading Songs..."} />;

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-4 text-gray-200">Discover</h1>
        <input
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className=""
        />
      </div>
      <div className="flex gap-4 flex-wrap animate-slideup">
        {!isLoading ? (
          submissions.map((submission, ind) => (
            <AudioTile
              key={ind}
              submission={submission}
              page="discover"
              allSongs={submissions}
              setSubmissions={setSubmissions}
              setRender={setRender}
              setIsLoading={setIsLoading}
            />
          ))
        ) : (
          <Loader title={"Loading Songs..."} />
        )}
      </div>
    </div>
  );
};

export default Discover;
