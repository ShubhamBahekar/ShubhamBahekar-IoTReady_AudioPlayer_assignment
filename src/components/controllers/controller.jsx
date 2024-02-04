import "./controller.css";
function controller(props) {
  return (
    <div>
      <button onClick={() => props.skipSong(false)}>Back</button>
      <button onClick={() => props.setIsPlaying(!props.isPlaying)}>
        {!props.isPlaying ? "Play" : "Pause"}
      </button>
      <button onClick={() => props.skipSong()}>Next</button>
    </div>
  );
}

export default controller;
