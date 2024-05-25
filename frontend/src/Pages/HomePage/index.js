import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFontFamily from "../../Utilities/useFontFamily";
import { Avatar, Breadcrumb, Button, Divider, Layout } from "antd";
import style from "./homepage.module.css";
import { logout } from "../../Reducers/authService/authSlice";

const { Content, Sider } = Layout;

const HomePage = ({ mainContent }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const navigate = useNavigate();
  const { t, ready, error } = useTranslation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const fontFamilyLight = useFontFamily("ExtraLight");

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
  const roleSelected = useSelector((state) => state.auth.userInfo?.mission);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);
  useEffect(() => {
    if (roleSelected === "boss") {
      navigate("/beom/adminPage");
    } else if (roleSelected === "editor") {
      navigate("/beom/editorPage");
    } else {
      navigate("/");
      // Redirect to home or a not authorized page if role is not matched
    }
  }, [navigate, roleSelected]);
  if (!isOnline) {
    return <div>{t("offline_message")}</div>;
  }

  if (error) {
    return <div>{t("translation_error_message")}</div>;
  }

  if (!ready) {
    return <div>{t("loading_message")}</div>;
  }

  return (
    <section style={{ flex: 1 }}>
      <MainContent
        userInfo={userInfo}
        fontFamilyLight={fontFamilyLight}
        mainContent={mainContent}
      />
    </section>
  );
};

const MainContent = ({ userInfo, fontFamilyLight, mainContent }) => (
  <section id="main-content" className="flex items-center flex-col">
    <section
      style={{
        margin: 0,
        height: "calc(100vh - 90px)",
        position: "relative",
      }}
      className={`${style.layout} bg-cover relative mb-5 flex items-center justify-center flex-col-reverse lg:flex-row w-full`}
    >
      <Layout
        className={`${style.layout}`}
        style={{ height: "100%", backgroundColor: "white" }}
      >
        <Content>
          <Layout style={{ height: "100%" }}>
            <CustomSider
              userInfo={userInfo}
              fontFamilyLight={fontFamilyLight}
            />
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
                {mainContent}
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </section>
  </section>
);

const CustomSider = ({ userInfo, fontFamilyLight }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //__ACTIONS
  const logoutAction = async () => {
    try {
      await dispatch(logout());
      navigate("/");
    } catch (error) {
      // Handle any errors if necessary
      console.log(error);
      navigate("/");
    }
  };
  return (
    <Sider
      className={`${style.sider}`}
      style={{ color: "white", fontFamily: fontFamilyLight }}
    >
      <Avatar
        size={50}
        className="mt-10"
        style={{
          border: "1px solid white",
          fontSize: "12px",
          fontFamily: fontFamilyLight,
          textTransform: "uppercase",
        }}
      >
        {userInfo?.role}
      </Avatar>
      <div>
        <small>{userInfo?.email}</small>
        <small>{userInfo?.phoneNumber}</small>
      </div>
      <div className="absolute" style={{ bottom: 0, color: "white" }}>
        <Divider
          style={{
            width: "100%",
            backgroundColor: "white",
            height: "2px",
          }}
        />
        <Button
          onClick={logoutAction}
          type="link"
          style={{ fontFamily: fontFamilyLight, color: "white" }}
        >
          {t("se déconnecter")}
        </Button>
      </div>
    </Sider>
  );
};

export default HomePage;
