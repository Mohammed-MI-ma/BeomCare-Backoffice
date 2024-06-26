import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import App from "./App";
import Store from "./store";
import "react-loading-skeleton/dist/skeleton.css";
import { messaging } from "./Config/firebase-config";
import { getToken } from "firebase/messaging";
import axios from "axios";
import "animate.css";

import "react-phone-number-input/style.css";
import "./index.css";
import "leaflet/dist/leaflet.css";
import SocketProvider from "./context/SocketProvider";
import { registerServiceWorker } from "./serviceWorkerRegistration";

// Initialize i18n with proper error handling
try {
  i18n.use(Backend).init({
    fallbackLng: "fr",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ar: {
        translation: require("./i18n/ar/translation.json"),
      },
      fr: {
        translation: require("./i18n/fr/translation.json"),
      },
      en: {
        translation: require("./i18n/en/translation.json"),
      },
    },
  });
} catch (error) {
  console.error("Error initializing i18n:", error);
}

// Ensure the root element exists before rendering the app
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

// Render the app using createRoot
const root = createRoot(rootElement);

// Component to get userId from Redux state
const UserIdFetcher = () => {
  const userId = useSelector((state) => state?.auth?.userInfo?.id);
  const isUserLoggedIn = useSelector((state) => state?.auth?.isUserLoggedIn);
  const access_Token = useSelector((state) => state.auth.accessToken);

  // Function to request permission and send token
  const requestPermission = async (userId) => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const registration = await registerServiceWorker();
        const fcmToken = await getToken(messaging, {
          vapidKey:
            "BDKzVo1g_EOKmSU31ezL0KTEu3iDm4mXtIKKtLEBdNme7cqKKB11_W87DDBWo8jGDYg1cDiKbdRucfMqbBsfcJs",
          serviceWorkerRegistration: registration,
        });
        if (fcmToken) {
          console.log("FCM Token:", fcmToken);

          const storedToken = localStorage.getItem("fcmToken");
          if (storedToken !== fcmToken) {
            await sendTokenToServer(fcmToken, userId);
            localStorage.setItem("fcmToken", fcmToken);
          } else {
            console.log("Token is already up-to-date.");
          }
        } else {
          console.error(
            "No registration token available. Request permission to generate one."
          );
        }
      } else {
        console.error("Unable to get permission to notify.");
      }
    } catch (error) {
      console.error(
        "An error occurred while requesting notification permission:",
        error
      );
    }
  };

  // Function to send token to server
  const sendTokenToServer = async (token, userId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/allUses/save-fcm-token`,
        {
          token: token,
          userId: userId,
          deviceInfo: "web",
        },
        {
          headers: {
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );
      console.log("Token sent to server successfully.");
    } catch (error) {
      console.error("Error sending token to server:", error);
    }
  };

  React.useEffect(() => {
    if (isUserLoggedIn && userId) {
      requestPermission(userId);
    }
  }, [userId, isUserLoggedIn]);

  return null;
};
root.render(
  <I18nextProvider i18n={i18n}>
    {/*<React.StrictMode>*/}
    <Provider store={Store}>
      <Router>
        <SocketProvider>
          <App />
          <UserIdFetcher />
        </SocketProvider>
      </Router>
    </Provider>
    {/*</React.StrictMode>*/}
  </I18nextProvider>
);
