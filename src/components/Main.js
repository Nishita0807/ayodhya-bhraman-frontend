import React, { useState, useEffect } from 'react';
import Book from './Book';
import AyodhyaContent from './AyodhyaContent';
import hanumanchalisa from "../audio/hanumanchalisa.mp3";
import StopIcon from '@mui/icons-material/Stop';
import "../styles/main.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


function Main() {
  const [audio] = useState(new Audio(hanumanchalisa)); // Audio element
  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause(); // Pause audio if it's playing
    } else {
      audio.play(); // Start audio if it's paused
    }
    setIsPlaying(prevState => !prevState); // Toggle isPlaying state
  };

  useEffect(() => {
    // Cleanup function to stop audio when component unmounts
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <div>
      {/* Button to toggle audio playback */}
      <button className="stop-button" onClick={toggleAudio}>
        {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
      </button>

      <Book />
      <AyodhyaContent />
      

    </div>
  );
}

export default Main;
