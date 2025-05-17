import React, { useState } from 'react';
import Search from './components/Search';
import YouTube from 'react-youtube';
import './App.css';

const YOUTUBE_API_KEY = 'AIzaSyDR77dWWlS-YRPlilRsA0oy4RzVzo77BYc';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  const handleSearchResults = (results) => {
    const filteredResults = results.filter(item => item && item.id && item.id.videoId);
    setSearchResults(filteredResults);
  };

  const handleSaveSong = (song) => {
    if (!savedSongs.find((s) => s.id.videoId === song.id.videoId)) {
      setSavedSongs([...savedSongs, song]);
    }
  };

  const handlePlaySong = (videoId) => {
    setCurrentVideoId(videoId);
  };

  const opts = {
    height: '180',
    width: '320',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="App">
      <header>
        <h1>rumbamusic</h1>
      </header>
      <Search apiKey={YOUTUBE_API_KEY} onResults={handleSearchResults} />
      <div className="search-results">
        <h2>Resultados de búsqueda</h2>
        <ul>
          {searchResults.map((item) => (
            <li key={item.id.videoId}>
              <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
              <span>{item.snippet.title}</span>
              <button onClick={() => handleSaveSong(item)}>Guardar</button>
              <button onClick={() => handlePlaySong(item.id.videoId)}>Reproducir</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="saved-songs">
        <h2>Canciones guardadas</h2>
        <ul>
          {savedSongs.map((item) => (
            <li key={item.id.videoId}>
              <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
              <span>{item.snippet.title}</span>
              <button onClick={() => handlePlaySong(item.id.videoId)}>Reproducir</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="player">
        {currentVideoId ? <YouTube videoId={currentVideoId} opts={opts} /> : null}
      </div>
    </div>
  );
}

export default App;
