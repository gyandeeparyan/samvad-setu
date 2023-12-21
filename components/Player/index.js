import ReactPlayer from "react-player";
import styles from "./index.module.css";
import cx from "classnames";
import { Mic, MicOff, UserSquare2 } from "lucide-react";
import { useRouter } from "next/router";
const Player = (props) => {
  const { playerId, url, muted, playing, isActive,peer } = props;
  const router=useRouter()
  return (
    <div className="grid-cols-2 md:grid-cols-1">
 <div
    className={cx(styles.playerContainer, {
      [styles.notActive]: !isActive,
      [styles.active]: isActive,
      [styles.notPlaying]: !playing,
    })}>
      {playing ? (
        <ReactPlayer
          
          url={url}
          muted={muted}
          playing={playing}
          width='100%'
          height='100%'
        />
      ) : (
        <UserSquare2 className={styles.user} size={isActive ? 400 : 100} />
      )}

      {!isActive ? (
        muted ? (
          <MicOff className={styles.icon} size={20} />
        ) : (
          <Mic className={styles.icon} size={20} />
        )
      ) : undefined}
    </div>
    </div>
   
  );
};

export default Player;
