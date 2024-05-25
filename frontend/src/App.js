import { ConfigProvider, message } from "antd";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./Components/Loader";
import frFR from "antd/lib/locale/fr_FR";

import { loadFonts, loadImages } from "./Services";
import { FontsConfig } from "./fontsConfig";
import { routes } from "./routes";
//__framer_motion
import { AnimatePresence } from "framer-motion";
import style from "./App.module.css";
import NavigationBar from "./Components/NavigationBar";
import { General_Assets } from "./config.dev";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import SettingsAdminDrawer from "./Components/SettingsAdminDrawer";
import { setDrawerOpenSettings } from "./Reducers/applicationService/applicationSlice";

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const d = useDispatch();
  const openSettings = useSelector(
    (state) => state.application.drawerOpenSettings
  );
  //__settings_drawer
  const onClose = () => d(setDrawerOpenSettings(false));

  useEffect(() => {
    async function fetchData() {
      try {
        await Promise.all([loadFonts(FontsConfig)]);
        switch (location.pathname) {
          case "/":
            await Promise.all([loadImages(General_Assets)]);
            break;
          default:
            break;
        }
        setAppIsReady(true);
      } catch (error) {
        message.error("Error while preparing:", error);
      }
    }
    fetchData();
  }, [location.pathname]);

  if (!appIsReady) {
    return <Loader />;
  }

  return (
    <ConfigProvider
      locale={frFR}
      theme={{
        token: {
          colorPrimary: "white",
        },
        components: {
          Button: {
            defaultHoverColor: "gray",
            defaultActiveColor: "gray",
            defaultColor: "white",
          },
        },
      }}
    >
      <div className={style.wrapper}>
        <header className={style.bgHeader}>
          <NavigationBar />
        </header>
        {/**__content */}
        <AnimatePresence mode="wait">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </AnimatePresence>
      </div>
      <SettingsAdminDrawer
        openSettings={openSettings}
        onClose={onClose}
        t={t}
      />
    </ConfigProvider>
  );
}

export default App;
