import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import useFontFamily from "../../Utilities/useFontFamily";
import { FaCookieBite } from "react-icons/fa";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fontFamilyLight = useFontFamily("Light");

  return (
    <Modal
      title={
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCookieBite />
          <p>Consentement aux cookies</p>
        </h2>
      }
      open={isModalOpen}
      onOk={handleOk}
      centered
      onCancel={handleCancel}
      footer={[
        <Link to="/beom/aboutUs/privacy-policy">
          <Button
            key="link"
            type="link"
            style={{
              fontFamily: fontFamilyLight,
              fontSize: "13px",
            }}
            onClick={handleOk}
          >
            <u>Politique de confidentialité</u>
          </Button>
        </Link>,
        <Button
          key="submit"
          type="primary"
          style={{
            background: "var(--color-primary)",
            color: "white",
            fontFamily: fontFamilyLight,
            fontSize: "13px",
          }}
          onClick={handleOk}
        >
          Accepter
        </Button>,
        <Button
          key="back"
          style={{
            background: "var(--color-accent)",
            color: "black",
            fontFamily: fontFamilyLight,
            fontSize: "13px",
          }}
          onClick={handleCancel}
        >
          Refuser
        </Button>,
      ]}
    >
      <p
        style={{
          background: "var(--color-accent)",
          color: "black",
          fontFamily: fontFamilyLight,
          fontSize: "13px",
        }}
      >
        Ce site utilise des cookies pour vous garantir la meilleure expérience
        sur notre site web.
      </p>
    </Modal>
  );
};

export default CookieConsent;
