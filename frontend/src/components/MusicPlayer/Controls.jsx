import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({ isPlaying, repeat, setRepeat, currentSongs, handlePlayPause, handlePrevSong, handleNextSong, handleShuffle }) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    <BsArrowRepeat
      size={20}
      color={repeat ? 'red' : 'white'}
      onClick={() => setRepeat((prev) => !prev)}
      className="hidden sm:block cursor-pointer"
      title='Repeat'
    />
    {currentSongs?.length &&
      <MdSkipPrevious
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handlePrevSong}
        title='Previous song'
      />}
    {isPlaying ? (
      <BsFillPauseFill
        size={45}
        color="#FFF"
        onClick={handlePlayPause}
        className="cursor-pointer"
        title='Pause'
      />
    ) : (
      <BsFillPlayFill
        size={45}
        color="#FFF"
        onClick={handlePlayPause}
        className="cursor-pointer"
        title='Play'
      />
    )}
    {currentSongs?.length &&
      <MdSkipNext
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handleNextSong}
        title='Next song'
      />}
    <BsShuffle
      size={20}
      color='white'
      onClick={() => handleShuffle(currentSongs)}
      className="hidden sm:block cursor-pointer"
      title='Shuffle'
    />
  </div>
);

export default Controls;
