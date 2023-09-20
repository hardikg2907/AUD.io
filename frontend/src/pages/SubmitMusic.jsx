import { useState, useCallback } from "react";
import { Basic } from "../components/FileUpload";
import Header from "../components/Header";
import WaveSurfer from "wavesurfer.js";
import WaveSurferPlayer from "../components/WaveSurferPlayer";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover";
import Slider from "../components/Slider";
import DropDown from "../components/DropDown";

const SubmitMusic = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "Untitled",
    audioFile: "",
    private: false,
    userId: "",
  });
  const [zoomLevel, setZoomLevel] = useState(0);
  const [audioRate, setAudioRate] = useState(1);
  // console.log(audioUrl);

  const onUpload = (files) => {
    console.log("upload");
    if (files) {
      // Use the FileReader API to read the file and convert it to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setAudioUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <>
      {!audioUrl ? (
        <div className="w-full h-full overflow-hidden">
          <div className="flex flex-col justify-center items-center scale-150 h-full">
            <Header title={"Submit Music"} subTitle={"Submit music here"} />
            <Basic onUpload={onUpload} />
          </div>
        </div>
      ) : (
        <div>
          <div className="">
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
          <button className="mt-10 bg-transparent text-red-600 px-2 py-1 rounded-md hover:bg-[#383838] duration-200 border border-red-600">
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default SubmitMusic;
