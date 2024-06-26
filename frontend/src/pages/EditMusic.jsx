import { useState, useCallback, useEffect } from "react";
import { Basic, BasicImage } from "../components/FileUpload";
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
  const [accessable, setAccessable] = useState(false);
  const [audioRate, setAudioRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const params = useParams();
  const { setActiveSong } = useMusicContext();

  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(`submissions/${params?.id}/${user?._id}`);
    if (res?.data) {
      // const response = await axios.get(res?.data?.audioFile);
      // console.log(response?.data);
      setFormData((prev) => ({
        ...prev,
        ...res?.data,
        audioFile: res?.data?.audioFile,
      }));
      if (
        user?._id === res?.data?.userId ||
        res?.data?.editAccess?.includes(user?._id)
      )
        setAccessable(true);
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
      setIsSubmitting(true);
      handleFileUpload(
        formData?.audioFile,
        `${formData?.name}${new Date().getTime()}.mp3`,
        "data_url"
      ).then(async (downloadUrl) => {
        let url = downloadUrl;
        const res = await axios.put(`submissions/${params?.id}/${user?._id}`, {
          ...formData,
          audioFile: url,
        });
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
    setIsLoading(true);
    const res = await axios.post("submissions/add", {
      audioFile: audioUrl,
      name: `${formData?.name}(Copy)`,
      userId: user._id,
      private: formData?.private,
    });
    if (res?.data) {
      navigate(`/my-submissions/${res?.data?._id}`);
      // window.location.reload();
    }
    setIsLoading(false);
  };

  const requestEditAccess = async () => {
    const res = await axios.post(`submissions/request/${params?.id}`, {
      userId: user?._id,
    });
    console.log(res?.data);
  };

  if (isLoading) return <Loader title={"Loading song details..."} />;

  return (
    <div className={`w-full ${!accessable ? "h-[90hv]" : "h-full"}`}>
      <div className="w-full relative">
        {!accessable && (
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
                  disabled={formData?.requests?.includes(user?._id)}
                  className="flex gap-1 items-center justify-center bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600
                  disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  {formData?.requests?.includes(user?._id)
                    ? "Edit Access Requested..."
                    : "Request Edit Access"}
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
          <div>
            {formData?.thumbnail && (
              <img
                src={formData?.thumbnail}
                alt="thumbnail"
                className="w-16 h-16 absolute rounded-md"
              />
            )}
            <BasicImage
              style={{ opacity: 0 }}
              onUpload={(files) => {
                if (files) {
                  // Use the FileReader API to read the file and convert it to base64
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData((prev) => ({
                      ...prev,
                      thumbnail: reader.result,
                    }));
                  };
                  reader.readAsDataURL(files[0]);
                }
              }}
            />
          </div>
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
      {accessable && (
        <button
          onClick={submit}
          className="mt-10 bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600"
        >
          Submit
        </button>
      )}

      {isSubmitting && (
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#1E1E1E] bg-opacity-80 z-50">
          <Loader title={"Submitting music..."} />
        </div>
      )}
    </div>
  );
};

export default EditMusic;
