import { useState, useCallback, useEffect } from "react";
import { Basic, BasicImage } from "../components/FileUpload";
import Header from "../components/Header";
import WaveSurferPlayer from "../components/WaveSurferPlayer";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover";
import Slider from "../components/Slider";
import DropDown from "../components/DropDown";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { handleFileUpload } from "../firebaseFunctions";
import { useMusicContext } from "../context/MusicContext";

const SubmitMusic = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "Untitled",
    audioFile: "",
    private: false,
    userId: "",
    thumbnail: "",
  });
  const [zoomLevel, setZoomLevel] = useState(0);
  const [audioRate, setAudioRate] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { setActiveSong } = useMusicContext();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, audioFile: audioUrl }));
  }, [audioUrl]);
  // console.log(audioUrl);

  const submit = async () => {
    try {
      setIsSubmitting(true);
      handleFileUpload(
        formData?.audioFile,
        `${formData?.name}${new Date().getTime()}.mp3`,
        "data_url",
        "audioFiles"
      ).then(async (downloadUrl) => {
        let audioFileUrl = downloadUrl;
        // console.log(audioFileUrl);
        handleFileUpload(
          formData?.thumbnail,
          `${formData?.name}${new Date().getTime()}.webp`,
          "data_url",
          "thumbnails"
        ).then(async (url) => {
          const res = await axios.post("submissions/add", {
            ...formData,
            userId: user._id,
            audioFile: audioFileUrl,
            thumbnail: url,
          });
          // setIsSubmitting(false)
          if (res?.data) navigate("/my-submissions");
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpload = (files) => {
    // console.log(files[0]);
    if (files) {
      // Use the FileReader API to read the file and convert it to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  useEffect(() => {
    if (audioUrl) setActiveSong(null);
  }, [audioUrl]);

  return (
    <>
      {!audioUrl ? (
        <div className="w-full h-4/5 overflow-hidden">
          <div className="flex flex-col justify-center items-center scale-150 h-full">
            <Header title={"Submit Music"} subTitle={"Submit music here"} />
            <Basic onUpload={onUpload} />
          </div>
        </div>
      ) : (
        <div>
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
          <button
            onClick={submit}
            className="mt-10 bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600"
          >
            Submit
          </button>
          {isSubmitting && (
            <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#1E1E1E] bg-opacity-80 z-50">
              <Loader title={"Submitting music..."} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SubmitMusic;
