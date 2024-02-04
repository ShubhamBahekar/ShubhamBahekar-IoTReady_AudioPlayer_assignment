import "./App.css";
import { useEffect, useState } from "react";
import Player from "./components/player/player";
function App() {
  const [playList, setPlayList] = useState([
    {
      name: "Two Hearts - TrackTribe",
      url: "./songs/Two Hearts - TrackTribe.mp3",
    },
    {
      name: "El Billete - Edgar Lopez and Quincas Moreira",
      url: "./songs/El Billete - Edgar Lopez and Quincas Moreira.mp3",
    },
    {
      name: "Pioneers - TrackTribe",
      url: "./songs/Pioneers - TrackTribe.mp3",
    },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > playList.length - 1) return 0;
      else return currentSongIndex + 1;
    });
    localStorage;
  }, [currentSongIndex, playList.length]);

  return (
    <div>
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        playList={playList}
        setPlayList={setPlayList}
      />
    </div>
  );
}

export default App;
