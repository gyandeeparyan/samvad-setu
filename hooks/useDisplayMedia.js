import { useState, useEffect, useRef } from "react";

const useDisplayMedia = () => {
  const [screenStream, setScreenStream] = useState(null);
  const isScreenStreamSet = useRef(false);
  const screenStreamRef = useRef(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // Add a state for button click

  useEffect(() => {
    const initScreenStream = async () => {
        console.log(`BUTTON CLICKED IS ${isButtonClicked}`)
      try {
        const displayMediaOptions = {
          video: {
            displaySurface: "browser",
          },
          audio: {
            suppressLocalAudioPlayback: false,
          },
          preferCurrentTab: false,
          selfBrowserSurface: "exclude",
          systemAudio: "include",
          surfaceSwitching: "include",
          monitorTypeSurfaces: "include",
        };

        console.log(
          "Trying to get display media with options:",
          displayMediaOptions
        );

        // Stop the current screen stream if it exists
        if (screenStreamRef.current) {
          const tracks = screenStreamRef.current.getTracks();
          tracks.forEach((track) => track.stop());
        }

        // Get a new screen stream
        const displayMediaStream = await navigator.mediaDevices.getDisplayMedia(
          displayMediaOptions
        );

        console.log("SETTING SCREEN STREAM");
        setScreenStream(displayMediaStream);

        // Save the screen stream reference for cleanup
        screenStreamRef.current = displayMediaStream;
      } catch (error) {
        console.error("ERROR IN DISPLAY MEDIA NAVIGATOR", error);
      }
    };

    if (
      typeof window !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getDisplayMedia &&
      isButtonClicked // Only run the hook if the button is clicked
    ) {
      console.log("getDisplayMedia is supported on this device");
      initScreenStream();
      console.log("SCREEN SHARED SUCESSFULLY")
    } else {
      console.error("getDisplayMedia is not supported on this device");
    }

    return () => {
      // Stop the current screen stream when the component unmounts
      if (screenStreamRef.current) {
        const tracks = screenStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isButtonClicked]); // Add isButtonClicked as a dependency

  return {
    screenStream,
    setIsButtonClicked,
    isButtonClicked, // Return the function to set the button click state
  };
};

export default useDisplayMedia;
