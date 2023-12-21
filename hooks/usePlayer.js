import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/socket";

const usePlayer = (myId, roomId, peer) => {
  const leaveAudioURL = `https://res.cloudinary.com/dzbmc0pit/video/upload/v1703051749/vea2o3irg4so2f6lan0r.mp3`;
  
  const [leaveAudio,setLeaveAudio]=useState(null)

  const [frontFacing, setFrontFacing] = useState(true);
  const socket = useSocket();
  const [players, setPlayers] = useState({});
  const router = useRouter();
  const playersCopy = cloneDeep(players);
  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];
  const playerNonHighlighted = playersCopy;

  // function stopBothVideoAndAudio(stream) {
  //   stream.getTracks().forEach((track) => {
  //     if (track.readyState == "live") {
  //       track.stop();
  //     }
  //   });
  // }

  // useEffect(()=>{
  //   setLeaveAudio(new Audio(leaveAudioURL));
   
  // },[])
  const leaveRoom = () => {
    socket.emit("leave", myId, roomId);
    console.log("leaving room", roomId);
    // leaveAudio.play();
    peer?.disconnect();
    // stopBothVideoAndAudio(players[myId].url);
    router.push("/");
  };



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
    leaveRoom,
    setFrontFacing,
  };
};

export default usePlayer;
