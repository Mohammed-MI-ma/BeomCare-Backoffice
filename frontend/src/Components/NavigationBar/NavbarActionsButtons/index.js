import React from "react";

import { Avatar, Badge, Button, ConfigProvider, Space } from "antd";
import { Link } from "react-router-dom";
import useFontFamily from "../../../Utilities/useFontFamily";
import style from "./NavbarActionsButtons.module.css";
import { useDispatch, useSelector } from "react-redux";
import CenteredFlexComponent from "../../Utilities/CenteredFlexComponent";
import ResponsiveIcon from "../../Utilities/ResponsiveIcon";
//__users Icons
import users30x30 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_low.webp";
import users60x60 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_medium.webp";
import users120x120 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_high.webp";
//__Settings Icons
import settings30x30 from "../../../Assets/images/BeomPartner/settings-icon/iconamoon_settings-thin_small.png";
import settings60x60 from "../../../Assets/images/BeomPartner/settings-icon/iconamoon_settings-thin_medium.png";
import settings120x120 from "../../../Assets/images/BeomPartner/settings-icon/iconamoon_settings-thin_medium_large.png";
import { setDrawerOpenSettings } from "../../../Reducers/applicationService/applicationSlice";
import CustomTooltip from "../../Utilities/CustomTooltip";

const iconBell = [
  { src: users30x30, width: 30 },
  { src: users60x60, width: 60, default: true },
  { src: users120x120, width: 120 },
];
const iconSettings = [
  { src: settings30x30, width: 30 },
  { src: settings60x60, width: 60, default: true },
  { src: settings120x120, width: 120 },
];

export const ActionButton = ({ children, style, to }) => {
  const fontFamilyMedium = useFontFamily("Medium");

  return (
    <Link to={to}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverColor: "gray",
              defaultActiveColor: "gray",
            },
          },
        }}
      >
        <Button
          className="text-white border-none"
          style={{
            fontFamily: fontFamilyMedium,
            ...style,
            fontSize: "var(--font-small-size)",
            height: "unset",
          }}
        >
          {children}
        </Button>
      </ConfigProvider>
    </Link>
  );
};

const NavbarActionsButtons = () => {
  const dispatch = useDispatch();
  const fontFamilyMedium = useFontFamily("Medium");
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const openSettings = () => {
    dispatch(setDrawerOpenSettings(true));
  };
  const fontFamilyLight = useFontFamily("Light");
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <Space>
      {!isUserLoggedIn ? (
        <></>
      ) : (
        <CenteredFlexComponent className={style.actionButtonsOnMode}>
          <Button
            type="default"
            shape="circle"
            style={{
              fontFamily: fontFamilyMedium,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Badge count="0">
              <CustomTooltip title={"Notifications"}>
                <Avatar
                  size={"default"}
                  style={{
                    fontFamily: fontFamilyMedium,
                    background: "white",
                  }}
                >
                  <ResponsiveIcon alt="Bell icon" images={iconBell} />
                </Avatar>
              </CustomTooltip>
            </Badge>
          </Button>

          <Button
            type="default"
            shape="circle"
            onClick={openSettings}
            style={{
              fontFamily: fontFamilyMedium,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CustomTooltip title={"Paramètres du compte"}>
              <Avatar
                size={"default"}
                style={{
                  fontFamily: fontFamilyMedium,
                  background: "white",
                }}
              >
                <ResponsiveIcon alt="Settings icon" images={iconSettings} />
              </Avatar>
            </CustomTooltip>
          </Button>
          <Avatar
            size={40}
            style={{
              background: "black",
              border: "1px solid white",
              fontSize: "8px",
              fontFamily: fontFamilyLight,
              textTransform: "uppercase",
            }}
          >
            {userInfo?.mission}
          </Avatar>
        </CenteredFlexComponent>
      )}
    </Space>
  );
};

export default NavbarActionsButtons;
