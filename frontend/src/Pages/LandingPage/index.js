import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFontFamily from "../../Utilities/useFontFamily";
import HorizontalScroll from "../../Components/HorizontalScroll";
import { FaCheck } from "react-icons/fa";
import { ActionButton } from "../../Components/NavigationBar/NavbarActionsButtons";
import style from "./landingPage.module.css";
const LandingPage = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const roleSelected = useSelector((state) => state.application.roleSelected);

  const navigate = useNavigate();
  const fontFamilyBold = useFontFamily("SemiBold");
  const fontFamilyLight = useFontFamily("Light");

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
        <h3 style={{ fontSize: "20px" }}>Veuillez sélectionner votre</h3>{" "}
        <h1
          style={{ fontFamily: fontFamilyBold }}
          className={`${style.userType} `}
        >
          TYPE D'UTILISATEUR
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
              <h3 style={{ fontSize: "12px", fontFamily: fontFamilyLight }}>
                {mission.desc}
              </h3>
            </div>
          ))}
          <ActionButton
            style={{
              background: "transparent",
              marginTop: "20px",
              fontFamily: fontFamilyLight,
            }}
          >
            <u>
              <Link to="/beom/account/log-in">Y accéder</Link>
            </u>
          </ActionButton>
        </div>
      </div>
      <HorizontalScroll style={{ position: "absolute" }} />
    </section>
  );
};

export default LandingPage;
