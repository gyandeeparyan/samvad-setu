import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import {useSocket} from "@/context/socket";

const usePlayer = (myId, roomId, peer) => {
  const socket = useSocket();
  const [players, setPlayers] = useState({});
const router =useRouter()
  const playersCopy = cloneDeep(players);
  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];
  const playerNonHighlighted = playersCopy;

  const leaveRoom = () => {
    socket.emit('leave', myId, roomId)
    console.log("leaving room", roomId)
    peer?.disconnect();
    router.push('/')
}


  const toggleAudio = () => {
    console.log(`AUDIO TOGGLED`);
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].muted = !copy[myId].muted;
      return { ...copy };
    });

    socket.emit("toggle-audio", myId, roomId);
  };

  const toggleVideo = () => {
    console.log(`VIDEO TOGGLED`);
    setPlayers((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].playing = !copy[myId].playing;
      return { ...copy };
    });

    socket.emit("toggle-video", myId, roomId);
  };

  return {
    players,
    setPlayers,
    playerHighlighted,
    playerNonHighlighted,
    toggleAudio,
    toggleVideo,
    leaveRoom
  };
};

export default usePlayer;
