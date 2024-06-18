import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFontFamily from "../../Utilities/useFontFamily";
import HorizontalScroll from "../../Components/HorizontalScroll";
import { FaCheck } from "react-icons/fa";
import { DoubleRightOutlined } from "@ant-design/icons";

import { ActionButton } from "../../Components/NavigationBar/NavbarActionsButtons";
import style from "./landingPage.module.css";
const LandingPage = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const roleSelected = useSelector((state) => state.application.roleSelected);

  const navigate = useNavigate();
  const fontFamilyBold = useFontFamily("SemiBold");
  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyMedium = useFontFamily("Medium");

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/beom/homepage");
    }
  }, [isUserLoggedIn, navigate]);
  return (
    <section
      id="main-content"
      className={`${style.mainContent} flex items-center flex-col text-center justify-center relative`}
    >
      <div className="h-1/2 w-full flex items-center flex-col text-center justify-start p-20 ">
        <h3 style={{ fontSize: "14px", fontFamily: fontFamilyLight }}>
          Veuillez sélectionner votre
        </h3>
        <h1
          style={{ fontFamily: fontFamilyBold }}
          className={`${style.userType} `}
        >
          Type d'utilisateur
        </h1>
      </div>
      <div className="flex-grow h-1/2 w-full flex shadow-lg items-center flex-col text-center justify-end p-20 rounded relative ">
        <div style={{ position: "absolute", bottom: 10 }}>
          {roleSelected.missions.map((mission) => (
            <div
              key={mission.id}
              style={{
                display: "flex",
                fontFamily: fontFamilyBold,
                justifyContent: "center",
              }}
            >
              <FaCheck />
              &nbsp;
              <h3 style={{ fontSize: "12px", fontFamily: fontFamilyMedium }}>
                {mission.desc}
              </h3>
            </div>
          ))}
          <ActionButton
            to="/beom/account/log-in"
            style={{
              background: "rgba(11,87,208,0.07)",
              color: "rgba(4,30,73,0.7)",
              marginTop: "20px",
              fontFamily: fontFamilyBold,
            }}
          >
            <DoubleRightOutlined />Y accéder
          </ActionButton>
        </div>
      </div>
      <HorizontalScroll style={{ position: "absolute" }} />
    </section>
  );
};

export default LandingPage;
