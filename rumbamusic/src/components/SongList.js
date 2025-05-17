import React from 'react';
import './SongList.css';

function SongList({ songs, onSongSelect, currentSongIndex }) {
  return (
    <div className="song-list">
      <h2>Lista de Canciones</h2>
      <ul>
        {songs.map((song, index) => (
          <li
            key={song.id}
            className={index === currentSongIndex ? 'active' : ''}
            onClick={() => onSongSelect(index)}
          >
            <span className="song-title">{song.title}</span> - <span className="song-artist">{song.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
