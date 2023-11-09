import axios from "axios";
import React, { useEffect, useState } from "react";
import AudioTile from "../components/AudioTile";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

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
      <div className="flex justify-between items-center pb-5 pr-8">
        <h1 className="text-3xl font-semibold text-gray-200">Discover</h1>
        <div className="w-2/5 relative h-9">
          <AiOutlineSearch className="absolute mt-2 ml-2 text-white text-xl" />
          <input
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search songs..."
            className="outline-0 h-full w-full p-3 pl-10 rounded-md bg-[#424141] text-white"
          />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap animate-slideup">
        {!isLoading ? (
          submissions.length ? (
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
            <p className="text-white text-xl">No songs found</p>
          )
        ) : (
          <Loader title={"Loading Songs..."} />
        )}
      </div>
    </div>
  );
};

export default Discover;
