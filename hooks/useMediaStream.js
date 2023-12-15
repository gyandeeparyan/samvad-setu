import { set } from "lodash";
import { useState, useEffect, useRef } from "react";

const useMediaStream = () => {
  const [state, setState] = useState(null);
  const isStreamSet = useRef(false);

  useEffect(() => {
    if(isStreamSet.current) return;
    isStreamSet.current=true;
    (async function initStream(){
        try {
            const stream=await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true,
            })
            console.log("SETTING YOUR STREAM");
            setState(stream);
        } catch (error) {
            console.log("ERROR IN MEDIA NAVIGATOR" ,error);
        }
    })()

  }, []);

  return {
    stream: state,
  }
};

export default useMediaStream;
