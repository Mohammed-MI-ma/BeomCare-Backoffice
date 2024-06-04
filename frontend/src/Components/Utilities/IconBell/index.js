import React from "react";
import users30x30 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_low.webp";
import users60x60 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_medium.webp";
import users120x120 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_high.webp";
import ResponsiveIcon from "../ResponsiveIcon";

const iconBell = [
  { src: users30x30, width: 30 },
  { src: users60x60, width: 60, default: true },
  { src: users120x120, width: 120 },
];
const IconBell = () => {
  return <ResponsiveIcon alt="Bell icon" images={iconBell} />;
};

export default IconBell;
