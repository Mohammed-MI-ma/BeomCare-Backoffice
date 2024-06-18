import { createContext, useContext } from "react";

const SocketContext = createContext(null); // Initial value is null

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
