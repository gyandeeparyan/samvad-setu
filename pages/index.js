import {v4 as uuidv4} from 'uuid';
import {useRouter} from 'next/navigation'
import styles from '@/styles/home.module.css'
import { useState } from 'react';
import usePeer from '@/hooks/usePeer';
import { Antenna, AudioWaveform, Plus, Video } from 'lucide-react';

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
   
    <div className={styles.enterRoom}>
      <div className='flex align-middle mt-2'>
      <input type="text" placeholder='enter room code' value={roomId} onChange={(e)=>setRoomId(e?.target?.value)} />
      <button onClick={handleJoinRoom} className='mx-2'><Video/></button>
      </div>

      <div className='flex text-3xl mt-60 md:mt-56'> 
        <span className=''>
        <Antenna className='' size={40}/>
        </span>
       <span className='mx-3'>samvadsetu</span>
      

      </div>
      <span>vāgvai manasi pratiṣṭhitā</span>
      
    <div className='absolute bottom-8 right-6'>
    <button onClick={handleCreateRoom}><Plus/></button>
    </div>
  
    </div>
  </div>;
}
