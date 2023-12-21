import { useState, useEffect, useRef } from "react";
import usePlayer from "./usePlayer";
import { useApp } from "@/context/appContext";

const useMediaStream = () => {
  const [stream, setStream] = useState(null);
  const isStreamSet = useRef(false);
  const mediaStreamRef = useRef(null);
  const { frontFacing } = useApp();

  useEffect(() => {
    const initStream = async () => {
      try {
        const constraints = {
          audio: true,
          video: true,
        };

        console.log("Trying to get user media with constraints:", constraints);

        // Stop the current stream if it exists
        if (mediaStreamRef.current) {
          const tracks = mediaStreamRef.current.getTracks();
          tracks.forEach((track) => track.stop());
        }

        // Get a new stream
        const userMediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );

        console.log("SETTING YOUR STREAM");
        console.log(frontFacing);
        setStream(userMediaStream);

        // Save the stream reference for cleanup
        mediaStreamRef.current = userMediaStream;
      } catch (error) {
        console.error("ERROR IN MEDIA NAVIGATOR", error);
      }
    };

    if (
      typeof window !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      console.log("getUserMedia is supported on this device");
      initStream();
    } else {
      console.error("getUserMedia is not supported on this device");
    }

    return () => {
      // Stop the current stream when the component unmounts
      if (mediaStreamRef.current) {
        const tracks = mediaStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [frontFacing]);

  return {
    stream,
  };
};

export default useMediaStream;
