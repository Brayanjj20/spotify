import React, { useState } from 'react';

function Search({ apiKey, onResults }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=" +
          encodeURIComponent(query) +
          "&key=" +
          apiKey
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        onResults([]);
      } else {
        onResults(data.items);
      }
    } catch (err) {
      setError("Error al buscar videos");
      onResults([]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Buscar canciones en YouTube..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Search;
