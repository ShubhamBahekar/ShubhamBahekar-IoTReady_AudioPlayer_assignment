import "./player.css";
import Player_Details from "../player_details/player_details";
import Controller from "../controllers/controller";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

function Player(props) {
  const audioState = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioState.current.play();
      audioState.current.addEventListener("ended", () => {
        skipSong(true);
      });
    } else {
      audioState.current.pause();
    }
  }, [isPlaying, props.currentSongIndex]);

  useEffect(() => {
    console.log("playList updated:", props.playList);
  }, [props.playList]);

  const skipSong = (forward = true) => {
    if (forward) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.playList.length - 1) temp = 0;

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) temp = props.playList.length - 1;

        return temp;
      });
    }
  };

  function handleData(event) {
    const files = event.target.files;
    const updatedList = [...props.playList];

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      const songNameWithoutExtension = fileName.split(".mp3")[0];
      updatedList.push({
        name: songNameWithoutExtension,
        url: URL.createObjectURL(files[i]),
      });
    }
    console.log("updatedList=>", updatedList);
    props.setPlayList(updatedList);
    console.log("playList=>", props.playList);
  }

  return (
    <div className="playerPage">
      <div className="player">
        <input type="file" accept="audio/*" onChange={handleData} multiple />
        <h4>Playing Now</h4>
        <Player_Details song={props.playList[props.currentSongIndex]} />
        <Controller
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          skipSong={skipSong}
        />
        <audio
          src={props.playList[props.currentSongIndex]?.url}
          ref={audioState}
          className=""
          controls
        />
        <p>Next Song: {props.playList[props.nextSongIndex]?.name}</p>
      </div>
    </div>
  );
}

Player.propTypes = {
  playList: PropTypes.array.isRequired,
  setPlayList: PropTypes.func.isRequired,
  currentSongIndex: PropTypes.number.isRequired,
  setCurrentSongIndex: PropTypes.func.isRequired,
  nextSongIndex: PropTypes.number.isRequired,
  // Add other prop types as needed
};

export default Player;
