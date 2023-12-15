const { useState, useEffect, useRef } = require("react");
import { useSocket } from "@/context/socket";
import  { useRouter } from "next/router";
const usePeer = () => {
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState(null);
  const roomId=useRouter().query.roomId
 const isPeerSet=useRef(false);
 const socket=useSocket();
  useEffect(() => {
    if(isPeerSet.current || !roomId || !socket) return
    isPeerSet.current=true;
    
    (async function initPeer() {
    let  myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer.on("open", (id) => {
        console.log(`your peer id is ${id}`);
        setMyId(id);
        socket?.emit('join-room' ,roomId,id)
      });
    })();
  }, [roomId,socket]);
  return {
    peer,
    myId
  }
};

export default usePeer;
