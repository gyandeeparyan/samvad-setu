import cx from "classnames";
import {
  Mic,
  Video,
  PhoneOff,
  MicOff,
  VideoOff,
  SwitchCamera,
  Cast,
} from "lucide-react";
import { useApp } from "@/context/appContext";
import styles from "./index.module.css";
const Bottom = ({
  muted,
  playing,
  toggleAudio,
  toggleVideo,
  leaveRoom,
 
 
}) => {

  const {toggleFrontFacing,frontFacing, screenShare,
    toggleScreenShare,}=useApp()
  return (
    <>
      <div className={styles.bottomMenu}>
        {muted ? (
          <MicOff
            className={cx(styles.icon, styles.active)}
            size={55}
            onClick={toggleAudio}
          />
        ) : (
          <Mic className={styles.icon} size={55} onClick={toggleAudio} />
        )}
        {playing ? (
          <Video className={styles.icon} size={55} onClick={toggleVideo} />
        ) : (
          <VideoOff
            className={cx(styles.icon, styles.active)}
            size={55}
            onClick={toggleVideo}
          />
        )}
        <PhoneOff size={55} className={cx(styles.icon)} onClick={leaveRoom} />
        // {screenShare ? (
        //   <Cast
            
        //     onClick={toggleScreenShare}
        //     className={cx(styles.icon, styles.active)}
        //     size={55}
        //   />
        // ) : (
        //   <Cast
        //     size={55}
        //     onClick={toggleScreenShare}
        //     className={cx(styles.icon)}
        //   />
        // )}
      </div>
    </>
  );
};

export default Bottom;
