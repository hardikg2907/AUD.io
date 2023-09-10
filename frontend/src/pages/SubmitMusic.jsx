import { useState, useCallback } from "react";
import { Basic } from "../components/FileUpload";
import Header from "../components/Header";
import WaveSurfer from "wavesurfer.js";
import WaveSurferPlayer from "../components/WaveSurferPlayer";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";

const SubmitMusic = () => {
  const [audioUrl, setAudioUrl] = useState(null);

  const onUpload = (files) => {
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
      <Header title={"Submit Music"} subTitle={"Submit music here"} />
      <Basic onUpload={onUpload} />
      <WaveSurferPlayer
        height={100}
        waveColor="red"
        progressColor="#383838"
        url={audioUrl}
        plugins={[TimelinePlugin.create()]}
      />
    </>
  );
};

export default SubmitMusic;
