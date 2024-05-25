import React from "react";
import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import useFontFamily from "../../Utilities/useFontFamily";

const SocialMediaButton = ({ color, icon }) => {
  const { i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  return (
    <Button
      shape="circle"
      className="flex items-center justify-center border-none"
      style={{ color, fontFamily: fontFamilyLight }}
    >
      {icon}
    </Button>
  );
};

const SocialMediaButtons = ({ color, size = "default" }) => {
  return (
    <Space>
      {socialMediaData.map(({ platform, icon }) => (
        <SocialMediaButton
          key={platform}
          color={color}
          icon={icon({ size })}
          tooltip={platform.toLowerCase()}
        />
      ))}
    </Space>
  );
};

const socialMediaData = [
  { platform: "Facebook", icon: IoLogoFacebook },
  { platform: "Twitter", icon: IoLogoTwitter },
  { platform: "Instagram", icon: IoLogoInstagram },
];

export default SocialMediaButtons;
