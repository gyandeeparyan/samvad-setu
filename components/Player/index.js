import ReactPlayer from "react-player";

const Player = (props) => {
    const {playerId,url,muted,playing}=props
    return (<div>
<ReactPlayer
    url={url}
    muted={muted}
    playing={playing}
    width="100%"
    height="100%"
    controls
    id={playerId}
    />
    </div>
    )
}

export default Player;