import { useState, useCallback, useEffect } from "react";
import { Basic } from "../components/FileUpload";
import Header from "../components/Header";
import WaveSurfer from "wavesurfer.js";
import WaveSurferPlayer from "../components/WaveSurferPlayer";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover";
import Slider from "../components/Slider";
import DropDown from "../components/DropDown";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { BiSolidCopy } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useMusicContext } from "../context/MusicContext";
import { handleFileUpload } from "../firebaseFunctions";
import { decode, encode } from "base64-arraybuffer";

const EditMusic = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "Untitled",
    audioFile: "",
    private: false,
    userId: "",
  });
  const [zoomLevel, setZoomLevel] = useState(0);
  const [audioRate, setAudioRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const params = useParams();
  const { setActiveSong } = useMusicContext();

  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `http://localhost:5000/api/submissions/${params?.id}/${user?._id}`
    );
    if (res?.data) {
      const response = await axios.get(res?.data?.audioFile);
      // console.log(response?.data);
      setFormData((prev) => ({
        ...prev,
        ...res?.data,
        audioFile: encode(decode(response?.data)),
      }));
      setAudioUrl(res?.data?.audioFile);
      setIsLoading(false);
    }
  };

  // console.log(audioUrl);

  useEffect(() => {
    fetchData();
  }, [params, user]);

  // useEffect(() => {
  //   // console.log(audioUrl);
  //   setFormData((prev) => ({ ...prev, audioFile: audioUrl }));
  //   console.log(formData);
  // }, [audioUrl]);

  useEffect(() => {
    setActiveSong(null);
  }, []);

  const submit = async () => {
    try {
      handleFileUpload(
        formData?.audioFile,
        `${formData?.name}${new Date().getTime()}.mp3`,
        "data_url"
      ).then(async (downloadUrl) => {
        let url = downloadUrl;
        const res = await axios.put(
          `http://localhost:5000/api/submissions/${params?.id}/${user?._id}`,
          {
            ...formData,
            audioFile: url,
          }
        );
        if (res?.data) navigate("/my-submissions");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpload = (files) => {
    // console.log("upload");
    if (files) {
      // Use the FileReader API to read the file and convert it to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const makeCopy = async () => {
    const res = await axios.post("http://localhost:5000/api/submissions/add", {
      audioFile: formData?.audioFile,
      name: `${formData?.name}(Copy)`,
      userId: user._id,
      private: formData?.private,
    });
    if (res?.data) {
      navigate(`/my-submissions/${res?.data?._id}`);
      // window.location.reload();
    }
  };

  const requestEditAccess = async () => {
    const res = await axios.put(
      `http://localhost:5000/api/submissions/${params?.id}/${user._id}`,
      {
        ...formData,
        requests: [...formData?.requests, user?._id],
      }
    );
  };

  if (isLoading) return <Loader title={"Loading song details..."} />;

  return (
    <div
      className={`w-full ${
        user?._id !== formData?.userId ? "h-[90hv]" : "h-full"
      }`}
    >
      <div className="w-full relative">
        {user?._id !== formData?.userId && (
          <div
            className={
              "w-full h-[75vh] bg-[#1E1E1E] bg-opacity-[0.85] z-[5] absolute overflow-hidden"
            }
          >
            <div className="flex flex-col w-full h-full items-center justify-center scale-125">
              <p className="text-2xl text-red-600 font-bold">
                You Don't have access to edit this music!
              </p>
              <div className="flex w-full p-5 justify-center items-center gap-5">
                <button
                  onClick={requestEditAccess}
                  className="flex gap-1 items-center justify-center bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600"
                >
                  Request Edit Access
                  <BsFillLockFill />
                </button>
                <button
                  onClick={() => makeCopy()}
                  className=" flex gap-1 items-center justify-center bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600"
                >
                  Make a Copy
                  <BiSolidCopy />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-3 justify-start items-start">
          <input
            type="text"
            placeholder="   Name"
            required
            className="bg-transparent focus:outline-none rounded-sm focus:outline-red-600 text-red-600 mb-10"
            value={formData?.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <button
            onClick={() =>
              setFormData((prev) => ({ ...prev, private: !prev.private }))
            }
            className="bg-transparen p-1 rounded-md hover:bg-[#383838] duration-200"
          >
            {formData?.private ? (
              <BsFillLockFill className="text-red-600" />
            ) : (
              <BsFillUnlockFill className="text-green-600" />
            )}
          </button>
        </div>
        {audioUrl && (
          <WaveSurferPlayer
            height={100}
            waveColor="red"
            progressColor="#383838"
            url={audioUrl}
            onUpload={onUpload}
            setAudioUrl={setAudioUrl}
            plugins={[
              TimelinePlugin.create(),
              HoverPlugin.create({
                lineColor: "#ff0000",
                lineWidth: 2,
                labelBackground: "#555",
                labelColor: "#fff",
                labelSize: "11px",
              }),
            ]}
            audioRate={audioRate}
            setFormData={setFormData}
            minPxPerSec={zoomLevel}
          />
        )}
        <div className="flex gap-2 text-white">
          <div>
            Zoom:{" "}
            <Slider sliderValue={zoomLevel} setSliderValue={setZoomLevel} />
          </div>
          <div>
            Rate:{" "}
            <DropDown
              dropValue={audioRate}
              setDropValue={setAudioRate}
              options={[0.25, 0.5, 1, 1.25, 1.5, 1.75, 2]}
            />
          </div>
        </div>
      </div>
      {user._id === formData?.userId ? (
        <button
          onClick={submit}
          className="mt-10 bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600"
        >
          Submit
        </button>
      ) : (
        // <div className="flex flex-col w-1/5 gap-3">
        //   <button
        //     onClick={submit}
        //     className="flex gap-1 items-center justify-center mt-10 bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600"
        //   >
        //     Request Edit Access
        //     <BsFillLockFill />
        //   </button>
        //   <button
        //     onClick={() => makeCopy()}
        //     className=" flex gap-1 items-center justify-center bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600"
        //   >
        //     Make A copy
        //     <BiSolidCopy />
        //   </button>
        // </div>
        <></>
      )}
    </div>
  );
};

export default EditMusic;
