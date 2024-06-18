import React, { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";

const SocketContext = createContext();
const SubscriptionContext = createContext();

export const useSocket = () => useContext(SocketContext);
export const useSubscriptions = () => useContext(SubscriptionContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token, not connecting to Socket.io server.");
      return;
    }
    localStorage.debug = "socket.io-client:socket";
    console.log("Connecting to Socket.io server...");

    const fetchData = async (retryCount = 0) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/subscriptions`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSubscriptions(response.data);
        console.log("Fetched initial subscription data:", response.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        if (retryCount < 3) {
          console.log(`Retrying fetch data (attempt ${retryCount + 1})...`);
          setTimeout(() => fetchData(retryCount + 1), 2000);
        }
      }
    };

    fetchData();
    const newSocket = io.connect(process.env.REACT_APP_BASE_API_URI_DEV, {
      transports: ["websocket", "polling"],
      query: { token: accessToken },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
    });
    newSocket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from Socket.io server:", reason);
      if (reason === "io server disconnect") {
        newSocket.connect();
      }
    });

    newSocket.on("reconnect", (attemptNumber) => {
      console.log(`Reconnected to Socket.io server (attempt ${attemptNumber})`);
    });

    newSocket.on("reconnect_attempt", (attemptNumber) => {
      console.log(
        `Attempting to reconnect to Socket.io server (attempt ${attemptNumber})`
      );
    });

    newSocket.on("reconnect_failed", () => {
      console.log("Reconnection to Socket.io server failed");
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    newSocket.on("newSubscription", (subscription) => {
      console.log("Received new subscription:", subscription);
      setSubscriptions((prevSubscriptions) => [
        ...prevSubscriptions,
        subscription,
      ]);
    });

    setSocket(newSocket);

    // Clean up on component unmount
    return () => {
      console.log("Disconnecting from Socket.io server...");
      newSocket.disconnect();
    };
  }, [accessToken]);

  return (
    <SocketContext.Provider value={socket}>
      <SubscriptionContext.Provider value={subscriptions}>
        {children}
      </SubscriptionContext.Provider>
    </SocketContext.Provider>
  );
};

export default SocketProvider;
