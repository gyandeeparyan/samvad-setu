import React, { createContext, useContext, useState } from "react";

import useDisplayMedia from './../hooks/useDisplayMedia';
const FrontFacingContext = createContext();

export const FrontFacingProvider = ({ children }) => {
  const [frontFacing, setFrontFacing] = useState(true);
  const { isButtonClicked, setIsButtonClicked } = useDisplayMedia();

  const [screenShare, setScreenShare] = useState(false);
  const toggleScreenShare = () => {
    setScreenShare(!screenShare);
    setIsButtonClicked(!isButtonClicked)
  };
  const toggleFrontFacing = () => {
    setFrontFacing(!frontFacing);
  };

  return (
    <FrontFacingContext.Provider
      value={{
        frontFacing,
        toggleFrontFacing,
        screenShare,
        toggleScreenShare,
      }}>
      {children}
    </FrontFacingContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(FrontFacingContext);
  if (!context) {
    throw new Error("useFrontFacing must be used within a FrontFacingProvider");
  }
  return context;
};
