import { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

export default function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [audio, setAudio] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const songNames = [
      "Echoes of Eternity", "Midnight Serenade", "Waves of Tranquility", "Celestial Dance",
      "Golden Horizon", "Silent Whispers", "Aurora Symphony", "Melodic Mirage",
      "Harmony's Embrace", "Mystical Voyage", "Ethereal Dreams", "Sunset Reverie",
      "Velvet Nocturne", "Starlit Ballad", "Whispering Breeze", "Crimson Dawn",
      "Twilight Sonata", "Moonlit Waltz", "Gentle Rain", "Ember Glow"
    ];

    setSongs(songNames.map((title, i) => ({
      _id: i + 1,
      title,
      artist: `Artist ${i + 1}`,
      url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 10) + 1}.mp3`
    })));
  }, []);

  const playSong = (song) => {
    if (audio) audio.pause();
    const newAudio = new Audio(song.url);
    setAudio(newAudio);
    newAudio.play();
    setSelectedSong(song);
  };

  const stopSong = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setSelectedSong(null);
  };

  const toggleLike = (songId) => {
    setLikedSongs((prevLikes) => {
      const newLikes = new Set(prevLikes);
      if (newLikes.has(songId)) {
        newLikes.delete(songId);
      } else {
        newLikes.add(songId);
      }
      return newLikes;
    });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="music-library">
      <h1>Music Library</h1>
      <div className="music-grid">
        {songs.map(song => (
          <div key={song._id} className="song-card">
            <div className="song-thumbnail">🎵</div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <button className="play-button" onClick={() => playSong(song)}>▶ Play</button>
            <button className="stop-button" onClick={stopSong}>⏹ Stop</button>
            <button className={`like-button ${likedSongs.has(song._id) ? 'liked' : ''}`} onClick={() => toggleLike(song._id)}>
              {likedSongs.has(song._id) ? '❤️ Liked' : '♡ Like'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
