import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { useMusicContext } from '../../context/MusicContext';

const MusicPlayer = () => {
  // const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const { isPlaying, setIsPlaying, activeSong, setActiveSong, currentSongs, currentIndex, setCurrentIndex, handleShuffle } = useMusicContext()
  // const [isPlaying, setIsPlaying] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);  

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev)
  };

  const handleNextSong = () => {
    // console.log(currentSongs);
    if (currentIndex === currentSongs.length - 1) {
      setCurrentIndex(0)
      setActiveSong(currentSongs[0])
    }
    else {
      setCurrentIndex(currentIndex + 1)
      // console.log(currentSongs[currentIndex + 1]);
      setActiveSong(currentSongs[currentIndex + 1])
    }
  };

  const handlePrevSong = () => {
    // console.log(currentSongs);
    if (currentIndex === 0) {
      setCurrentIndex(0)
      setActiveSong(currentSongs[currentSongs.length - 1])
    }
    else {
      setCurrentIndex(currentIndex - 1)
      setActiveSong(currentSongs[currentIndex - 1])
    }
  };

  return (
    <div className="relative sm:px-12 px-5 w-full flex items-center justify-between scale-90">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
          handleShuffle={handleShuffle}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
