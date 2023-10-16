import { useState, useEffect } from "react";

const UseBackgroundMusic = () => {
  const [volume, setVolume] = useState(0); // Initial volume (between 0 and 1)
  const [isMuted, setIsMuted] = useState(true);
  const [audio] = useState(new Audio("/BookMusic.mp3")); // Replace with your music file URL

  useEffect(() => {
    audio.volume = volume;
    if (!isMuted) {
      audio.volume = 0.3;
    }
    audio.play().catch((error) => {
      // Handle any errors when attempting to play the audio
    });
  }, [volume, isMuted, audio]);

  const toggleMute = () => {
    if (isMuted) {
      // If currently muted, unmute the audio
      setVolume(0.5); // You can set it to your desired default volume
    } else {
      // If not muted, mute the audio
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="background-music-app">
      <div className={`volume-control ${isMuted ? "muted" : ""}`}>
        <div className="volume-icon" onClick={toggleMute}>
          <i
            className={`fa-solid ${
              isMuted ? "fa-volume-mute" : "fa-volume-up"
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default UseBackgroundMusic;
