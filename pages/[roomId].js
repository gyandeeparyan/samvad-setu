import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import { useEffect } from "react";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/Player";
const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();

  useEffect(() => {
    if (!socket || !stream || !peer) return;
    const handleUserConnected = (newUser) => {
      console.log(`USER CONNECTED WITH USERID ${newUser}`);
      const call = peer.call(newUser,stream);
      call.on("stream", (userStream) => {
        console.log(`INCOMING STREAM FROM USER ${newUser}`);
      })
    };

    socket.on("user-connected", handleUserConnected);
    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer,stream,socket]);

  useEffect(()=>{
    if(!peer || !stream) return;
    peer.on('call',(call)=>{
        const {peer:callerId}=call;
        call.answer(stream)
        call.on('stream',(userStream)=>{
            console.log(`INCOMING STREAM FROM USER ${callerId}`);
        })
    })
    
  },[peer,stream])


  return (
    <>
      <div>
        <h1>MEDIA STREAM </h1>
        <Player url={stream} muted playing playerId={myId} />
      </div>
    </>
  );
};

export default Room;
