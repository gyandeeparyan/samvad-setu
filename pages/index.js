import {v4 as uuidv4} from 'uuid';
import {useRouter} from 'next/navigation'
import styles from '@/styles/home.module.css'
import { useState } from 'react';
import usePeer from '@/hooks/usePeer';

export default function Home() {
 const router =useRouter();
 const [roomId,setRoomId]=useState('')
 usePeer();
 

 const handleCreateRoom =()=>{
  const roomId= uuidv4();
  router.push(`/${roomId}`)
 }

 const handleJoinRoom=()=>{
  if(roomId) router.push(`/${roomId}`)
  else{
alert('enter valid room id')
  }
 }



  return <div className={styles.homeContainer}>
    <h1>Samvad Setu</h1>
    <div className={styles.enterRoom}>
      <input type="text" value={roomId} onChange={(e)=>setRoomId(e?.target?.value)} />
      <button onClick={handleJoinRoom}>Join</button>
      <span>-------------------OR--------------------</span>
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  </div>;
}
