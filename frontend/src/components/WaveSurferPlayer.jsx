import WaveSurfer from "wavesurfer.js";
import { useState, useEffect, useRef, useCallback } from "react";

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
    console.log(ws);

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

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
      wavesurfer.on("zoom", () => console.log('object'))
    ];

    wavesurfer.setPlaybackRate(props.audioRate)
    console.log(props.audioRate);
    console.log(props.minPxPerSec);
    const options = { minPxPerSec: props.minPxPerSec }
    wavesurfer.setOptions(options)

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer, props]);

  return (
    <div className="text-slate-200">
      <div ref={containerRef} style={{ minHeight: "120px" }} className="bg-black" />

      <button onClick={onPlayClick} style={{ marginTop: "1em" }}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <p>Seconds played: {currentTime}</p>
    </div>
  );
};

export default WaveSurferPlayer;
