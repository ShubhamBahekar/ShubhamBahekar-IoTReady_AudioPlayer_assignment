import "./player_details.css";
function player_details(props) {
  return (
    <div>
      <h2>{props.song && props.song.name}</h2>
    </div>
  );
}

export default player_details;
