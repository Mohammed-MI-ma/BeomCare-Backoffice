import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFontFamily from "../../Utilities/useFontFamily";
import { Avatar, Button, Divider, Layout } from "antd";
import style from "./homepage.module.css";
import { LuPlus } from "react-icons/lu";

import { logout } from "../../Reducers/authService/authSlice";
import { MailOutlined, RightOutlined } from "@ant-design/icons";
import { maskEmail } from "../../Utilities/emailMask";

const { Content, Sider } = Layout;

const HomePage = ({ mainContent }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const navigate = useNavigate();
  const { t, ready, error } = useTranslation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const fontFamilyLight = useFontFamily("ExtraLight");
  const fontFamilyMedium = useFontFamily("Medium");
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
    <div style={{ flex: 1 }}>
      <section id="partnersSection" className="w-full block md:hidden">
        <header
          className="flex items-center justify-between w-full"
          style={{
            fontSize: "var(--font-small-size)",
            fontFamily: fontFamilyMedium,
          }}
        >
          <h1 className="p-4" style={{ color: "var(--color-text-secondary)" }}>
            {t("Abonnés BeomCare")}
          </h1>
          <Link className="p-4 flex " style={{ color: "var(--color-blue)" }}>
            <p>{t("Voir Plus")}</p>
            <RightOutlined style={{ width: 10 }} />
          </Link>
        </header>
        <div className="flex ">
          <div className="inline-flex flex-col items-center">
            <div className="flex ">
              <div
                className="shadow-lg flex justify-center items-center"
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  background: "var(--color-text-secondary)",
                  color: "white",
                }}
              >
                <LuPlus />
              </div>
              <Divider
                type="vertical"
                style={{ background: "black", height: "100%" }}
              />
            </div>
          </div>
          <div
            className="w-screen min-h-[100px] overflow-x-auto whitespace-nowrap "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div
              className="shadow-lg inline-flex justify-center items-center"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                background: "var(--color-text-secondary)",
                color: "white",
              }}
            >
              <LuPlus />
            </div>
            <div
              className="shadow-lg inline-flex justify-center items-center"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                background: "var(--color-text-secondary)",
                color: "white",
              }}
            >
              <LuPlus />
            </div>
            <div
              className="shadow-lg inline-flex justify-center items-center"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                background: "var(--color-text-secondary)",
                color: "white",
              }}
            >
              <LuPlus />
            </div>
            <div
              className="shadow-lg inline-flex justify-center items-center"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                background: "var(--color-text-secondary)",
                color: "white",
              }}
            >
              <LuPlus />
            </div>
            <div
              className="shadow-lg inline-flex justify-center items-center"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                background: "var(--color-text-secondary)",
                color: "white",
              }}
            >
              <LuPlus />
            </div>
            <div
              className="shadow-lg inline-flex justify-center items-center"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                background: "var(--color-text-secondary)",
                color: "white",
              }}
            >
              <LuPlus />
            </div>
            <div
              className="shadow-lg inline-flex justify-center items-center border"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
              }}
            >
              <p
                style={{
                  height: "1em",
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--font-small-size)",
                  fontFamily: fontFamilyMedium,
                }}
              >
                +40
              </p>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <MainContent
        userInfo={userInfo}
        fontFamilyLight={fontFamilyLight}
        mainContent={mainContent}
      />
    </div>
  );
};

const MainContent = ({ userInfo, fontFamilyLight, mainContent }) => (
  <section id="main-content" className="flex items-center flex-col ">
    <section
      style={{
        margin: 0,
        height: "calc(100vh - 90px)",
        position: "relative",
        background: "#ffffff1c",
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
            <Content className={`${style.content} bg-white`}>
              <div className="flex flex-col md:flex-row rounded border space-y-4 md:space-y-0 md:space-x-4 p-4">
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
  const fontFamilyBold = useFontFamily("SemiBold");

  return (
    <>
      <Sider
        className={`${style.sider}`}
        style={{
          color: "white",
          fontFamily: fontFamilyLight,
        }}
      >
        <p style={{ textTransform: "capitalize" }}>{userInfo?.role}</p>

        <div style={{ fontFamily: fontFamilyBold, fontSize: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <MailOutlined />
            <p>{maskEmail(userInfo?.email)}</p>
          </div>
        </div>
      </Sider>
    </>
  );
};

export default HomePage;
