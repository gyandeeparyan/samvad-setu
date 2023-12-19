import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
const URL =
  process.env.NODE_ENV === "production"
    ? "https://samvad-setu-server.onrender.com"
    : "http://localhost:5000";
export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket
}

export const SocketProvider = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connection = io(URL);
    console.log("socket connection", connection)
    setSocket(connection);
  }, []);

  // socket?.on('connect_error', async (err) => {
  //   console.log("Error establishing socket", err)
  //   await fetch('/api/socket')
  // })

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};