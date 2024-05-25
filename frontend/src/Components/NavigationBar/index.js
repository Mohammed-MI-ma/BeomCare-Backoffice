import React from "react";

import CenteredFlexComponent from "../Utilities/CenteredFlexComponent";
import style from "./navigationBar.module.css";
import { Link } from "react-router-dom";
import NavbarActionsButtons from "./NavbarActionsButtons";
//__users Icons
import logo91x47 from "../../Assets/images/BeomLogo/BeomLogo_l.webp";
import logo182x94 from "../../Assets/images/BeomLogo/BeomLogo_m.webp";
import logo364x188 from "../../Assets/images/BeomLogo/BeomLogo_h.webp";
import ResponsiveIcon from "../Utilities/ResponsiveIcon";
import { Avatar } from "antd";
//__users Icons
import users30x30 from "../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_low.webp";
import users60x60 from "../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_medium.webp";
import users120x120 from "../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_high.webp";

const iconBell = [
  { src: users30x30, width: 30 },
  { src: users60x60, width: 60, default: true },
  { src: users120x120, width: 120 },
];
const NavigationBar = () => {
  return (
    <nav>
      <CenteredFlexComponent
        className={`w-full flex-col ${style.navbarStyle} `}
      >
        <div
          className={`${style.navbarInnerStyle} w-full flex items-center justify-between  `}
        >
          <Link to={"/"}>
            <div className={`cursor-pointer`}>
              <div className={`flex justify-start relative flex-col }`}>
                <Logo />
              </div>
            </div>
          </Link>
          <div className={`${style.navBar_container} flex`}>
            <CenteredFlexComponent className={`gap-3`}>
              <NavbarActionsButtons />
            </CenteredFlexComponent>
          </div>
        </div>{" "}
      </CenteredFlexComponent>
      <nav id="navbar_mobile" className={`${style.navbarMobile}`}>
        <Avatar
          size={"default"}
          style={{
            background: "white",
          }}
        >
          <ResponsiveIcon alt="Bell icon" images={iconBell} />
        </Avatar>{" "}
      </nav>
    </nav>
  );
};

export default NavigationBar;
const logo = [
  { src: logo91x47, width: 91 },
  { src: logo182x94, width: 100, default: true },
  { src: logo364x188, width: 188 },
];
const Logo = () => {
  return <ResponsiveIcon alt="Logo Beom" images={logo} />;
};
