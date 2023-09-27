import WaveSurfer from "wavesurfer.js";
import { useState, useEffect, useRef, useCallback } from "react";
import { AiOutlinePause, AiOutlineScissor } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import { encode } from "base64-arraybuffer";
import { bufferToWav, blobToBase64 } from "../helperFunctions";

const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });
    // console.log(ws);

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [containerRef]);

  return wavesurfer;
};

const WaveSurferPlayer = (props) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);
  const [region, setRegion] = useState(null);
  const random = (min, max) => Math.random() * (max - min) + min;
  const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;
  const [loop, setLoop] = useState(false);
  const wsRegions = wavesurfer?.registerPlugin(RegionsPlugin.create());

  // On play button click
  // const onPlayClick = useCallback(() => {
  //   wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  // }, [wavesurfer]);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);
    // console.log(props);

    const subscriptions = [
      wavesurfer.on("play", () => {}),
      wavesurfer.on("pause", () => {}),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
      wavesurfer.on("zoom", () => {}),
      wavesurfer.on("hover", (e, f) => {}),
      wavesurfer.on("decode", (e) => {
        if (!region) {
          wsRegions.destroy();
          const r = wsRegions.addRegion({
            start: 0,
            end: e / 10,
            color: randomColor(),
            resize: true,
          });
          setRegion(r);
        }
      }),
    ];
    wavesurfer.setOptions(props);

    let activeRegion = null;
    wsRegions?.on("region-in", (region) => {
      // activeRegion = region;
    });
    wsRegions?.on("region-out", (region) => {
      // if (activeRegion === region) {
      //   if (loop) {
      //     region.play();
      //   } else {
      //     activeRegion = null;
      //   }
      // }
    });
    wsRegions?.on("region-clicked", (region, e) => {
      // e.stopPropagation(); // prevent triggering a click on the waveform
      // activeRegion = region;
      // region.play();
      // region.setOptions({ color: randomColor() });
      setIsPlaying(true);
    });
    wsRegions.on("region-updated", (e) => {
      setRegion(e);
    });
    // Reset the active region when the user clicks anywhere in the waveform
    wavesurfer.on("interaction", () => {
      // activeRegion = null
    });

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer, props?.url]);

  useEffect(() => {
    if (isPlaying) wavesurfer?.play();
    else wavesurfer?.pause();
  }, [isPlaying, wavesurfer]);

  const trim = () => {
    let originalAudioBuffer;
    originalAudioBuffer = wavesurfer?.getDecodedData();
    // console.log(originalAudioBuffer);
    let end = region.end;
    let start = region.start;
    let lengthInSamples = Math.floor(
      (end - start) * originalAudioBuffer.sampleRate
    );

    let offlineAudioContext = new OfflineAudioContext(
      1,
      2,
      originalAudioBuffer.sampleRate
    );
    let new_channel_data,
      empty_segment_data,
      original_channel_data,
      before_data,
      after_data;

    let emptySegment = offlineAudioContext.createBuffer(
      originalAudioBuffer.numberOfChannels,
      lengthInSamples,
      originalAudioBuffer.sampleRate
    );

    let newAudioBuffer = offlineAudioContext.createBuffer(
      originalAudioBuffer.numberOfChannels,
      start === 0
        ? originalAudioBuffer.length - emptySegment.length
        : originalAudioBuffer.length,
      originalAudioBuffer.sampleRate
    );

    for (
      let channel = 0;
      channel < originalAudioBuffer.numberOfChannels;
      channel++
    ) {
      new_channel_data = newAudioBuffer.getChannelData(channel);
      empty_segment_data = emptySegment.getChannelData(channel);
      original_channel_data = originalAudioBuffer.getChannelData(channel);

      before_data = original_channel_data.subarray(
        0,
        start * originalAudioBuffer.sampleRate
      );
      after_data = original_channel_data.subarray(
        Math.floor(end * originalAudioBuffer.sampleRate),
        originalAudioBuffer.length * originalAudioBuffer.sampleRate
      );

      if (start > 0) {
        new_channel_data.set(before_data);
        new_channel_data.set(
          empty_segment_data,
          start * newAudioBuffer.sampleRate
        );
        new_channel_data.set(after_data, end * newAudioBuffer.sampleRate);
      } else {
        new_channel_data.set(after_data);
      }
    }

    let arraybuffer = bufferToWav(newAudioBuffer, 0, newAudioBuffer?.length);
    wavesurfer?.load(arraybuffer);
    // props?.setAudioUrl(arraybuffer);
    fetch(arraybuffer)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "audio/wav" });
        // console.log(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          // props?.setAudioUrl(reader.result);
          props?.setFormData((prev) => ({
            ...prev,
            audioFile: reader.result,
          }));
        };
        reader.readAsDataURL(file);
        // props?.onUpload([file]);
        // console.log(file);
      });
  };
  return (
    <div className="text-slate-200">
      <div
        ref={containerRef}
        style={{ minHeight: "120px" }}
        className="bg-black rounded-lg overflow-hidden border-white border mt-4"
      />
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className={
            "rounded-sm bg-gray-100" +
            (isPlaying ? " text-black" : " text-red-600")
          }
        >
          {isPlaying ? <AiOutlinePause /> : <BsFillPlayFill />}
        </button>

        {/* <p>Seconds played: {currentTime}</p> */}
        <button
          onClick={() => {
            // console.log(region);
            trim();
          }}
          className="rounded-sm bg-gray-100 text-black"
        >
          <AiOutlineScissor />
        </button>
      </div>
    </div>
  );
};

export default WaveSurferPlayer;
