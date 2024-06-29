import React, { useEffect } from "react";
import { Avatar, Badge, Button, ConfigProvider, Space, Divider } from "antd";
import { RiSpam2Line } from "react-icons/ri";

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

//__Settings Icons
import friends28x28 from "../../../Assets/images/BeomPartner/firends-icon/friends_low.png";
import friends56x56 from "../../../Assets/images/BeomPartner/firends-icon/friends_med.png";
import friends111x111 from "../../../Assets/images/BeomPartner/firends-icon/friends_high.png";

import { setDrawerOpenSettings } from "../../../Reducers/applicationService/applicationSlice";
import CustomTooltip from "../../Utilities/CustomTooltip";
import { useSocket, useSubscriptions } from "../../../context/SocketProvider";

const iconBell = [
  { src: users30x30, width: 30 },
  { src: users60x60, width: 60, default: true },
  { src: users120x120, width: 120 },
];
const iconFriends = [
  { src: friends28x28, width: 28 },
  { src: friends56x56, width: 60, default: true },
  { src: friends111x111, width: 120 },
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
  const subscriptions = useSubscriptions();
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("newSubscription", (subscription) => {
        console.log("Received new subscription:", subscription);
      });
    }
  }, [socket]);
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
            <Badge
              count={subscriptions.length}
              style={{
                background: "var(--color-text-secondary)",
                fontFamily: fontFamilyLight,
              }}
            >
              <CustomTooltip title={"Abonnées"}>
                <Avatar
                  size={"default"}
                  style={{
                    fontFamily: fontFamilyMedium,
                    background: "white",
                  }}
                >
                  <ResponsiveIcon alt="Bell icon" images={iconFriends} />
                </Avatar>
              </CustomTooltip>
            </Badge>
          </Button>
          <Divider type="vertical" />
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
                style={{
                  background: "black",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid white",
                  fontSize: "8px",
                  fontFamily: fontFamilyLight,
                  textTransform: "uppercase",
                }}
              >
                {userInfo?.mission}
              </Avatar>
            </CustomTooltip>
          </Button>
          <Button
            type="default"
            shape="circle"
            style={{
              fontFamily: fontFamilyMedium,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            danger
          >
            <CustomTooltip title={"Spameurs"}>
              <Badge count="10">
                <Avatar
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "8px",
                    fontFamily: fontFamilyLight,
                    background: "white",
                    textTransform: "uppercase",
                  }}
                >
                  <RiSpam2Line style={{ fontSize: "20px", color: "red" }} />
                </Avatar>
              </Badge>
            </CustomTooltip>
          </Button>
          <Avatar
            size={"default"}
            style={{
              fontFamily: fontFamilyMedium,
              background: "white",
            }}
          >
            <ResponsiveIcon alt="Settings icon" images={iconSettings} />
          </Avatar>
        </CenteredFlexComponent>
      )}
    </Space>
  );
};

export default NavbarActionsButtons;
