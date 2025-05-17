import React, { useEffect, useRef } from 'react';
import './Player.css';

function Player({ song, isPlaying, setIsPlaying, onNext, onPrev }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, song]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      <div className="player-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
      <audio ref={audioRef} src={song.audioSrc} onEnded={onNext} />
      <div className="player-controls">
        <button onClick={onPrev}>Prev</button>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default Player;
