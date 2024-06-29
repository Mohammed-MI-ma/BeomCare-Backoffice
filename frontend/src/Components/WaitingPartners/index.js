import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FiMinimize2 } from "react-icons/fi";

import useFontFamily from "../../Utilities/useFontFamily";
//FramerMotion
import { AnimatePresence, motion } from "framer-motion";

// Icons
import { BsInfoCircle } from "react-icons/bs";

import { setActivePartnerOnHold } from "../../Reducers/applicationService/applicationSlice";
import { Avatar, Button } from "antd";
import GradientDiv from "../Utilities/GradientDiv";
import GradientWrapper from "../Utilities/GradientWrapper";
const LABEL = "Tinky funTinky funTinky fun";
const WaitingPartners = () => {
  const { t } = useTranslation();

  //__Fonts
  const fontFamilyBold = useFontFamily("SemiBold");
  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyMedium = useFontFamily("Medium");
  //__Hooks
  const activePartnerOnHold = useSelector(
    (state) => state.application.activePartnerOnHold
  );
  const [currentId, setCurrentId] = useState(activePartnerOnHold?.id);

  useEffect(() => {
    if (activePartnerOnHold?.id !== currentId) {
      setCurrentId(null);
      setTimeout(() => {
        setCurrentId(activePartnerOnHold?.id);
      }, 500);
    }
  }, [activePartnerOnHold?.id, currentId]);
  const d = useDispatch();
  const handleInteraction = (id) => {
    d(setActivePartnerOnHold({ id }));
  };
  return (
    <>
      <section
        className="border rounded p-5 shadow-lg relative"
        id="part-upComing_partners"
      >
        {" "}
        <Button
          type="default"
          shape="circle"
          className="shadow"
          style={{
            fontFamily: fontFamilyMedium,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translate(-25%,25%)",
          }}
        >
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
            <FiMinimize2 style={{ fontSize: "20px", color: "black" }} />
          </Avatar>
        </Button>
        <h1
          style={{
            textDecoration: "underline",
            fontFamily: fontFamilyBold,
            fontSize: "var(--font-small-size)",
            gap: "var(--gap-small)",
            color: "var(--color-text-secondary)",
          }}
        >
          {t(
            "Les centres/instituts de beauté souhaiteraient devenir partenaires de BeomCare."
          )}
        </h1>
        <h2
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "var(--font-tiny-size)",
            color: "var(--color-text-secondary)",
          }}
        >
          {t(
            "Voici la file d'attente de toutes les demandes que les centres / instituts font pour devenir partenaires."
          )}
        </h2>
        <div className="relative p-2 mt-3">
          <GradientWrapper />
          <div
            className="relative whitespace-nowrap overflow-x-scroll no-scrollbar "
            style={{ borderRadius: "50px" }}
          >
            {Array.from({ length: 25 }, (_, i) => i + 2).map((id) => (
              <motion.div
                onHoverStart={() => handleInteraction(id)}
                onClick={() => handleInteraction(id)}
                key={id}
                className="inline-flex justify-center items-center mx-1 "
                whileHover={{ scale: 0.8, transition: { duration: 0.5 } }}
                transition={{ type: "spring", stiffness: 50 }}
                whileTap={{ scale: 0.905 }}
                animate={{
                  background:
                    activePartnerOnHold.id === id
                      ? "white"
                      : "var(--color-text-secondary)",
                  borderColor:
                    activePartnerOnHold.id === id
                      ? "black"
                      : "var(--color-text-secondary)",
                  borderRadius: activePartnerOnHold.id === id ? "5%" : "50%",
                  color: activePartnerOnHold.id === id ? "black" : "white",
                }}
                style={{
                  border: "1px solid",
                  width: "40px",
                  height: "40px",
                  transition: "background 0.3s ease-in-out", // Smooth transition for background

                  color: "white",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    fontSize: "8px",
                    fontFamily: fontFamilyLight,
                    textTransform: "uppercase",
                  }}
                >
                  {LABEL.slice(0, 8)}.
                </p>{" "}
              </motion.div>
            ))}
          </div>
        </div>
        <div
          className="flex justify-around mt-5 pb-5"
          style={{ overflowX: "scroll", gap: "10px" }}
        >
          <div
            className="w-[200px] h-max-[100px] p-10 shadow-lg rounded-lg border"
            style={{
              display: "flex",
              fontFamily: fontFamilyLight,
              fontSize: "var(--font-small-size)",
              gap: "var(--gap-small)",
              color: "var(--color-primary)",
              textAlign: "center",
            }}
          >
            102 Demandes vérifiées jusqu'à présent
          </div>
          <div
            className="w-[200px] h-max-[100px] p-10 shadow-lg rounded-lg border"
            style={{
              display: "flex",
              fontFamily: fontFamilyLight,
              fontSize: "var(--font-small-size)",
              gap: "var(--gap-small)",
              color: "var(--color-primary)",
              textAlign: "center",
            }}
          >
            102 Demandes rejetées jusqu'à présent
          </div>{" "}
          <div
            className="w-[200px] h-max-[100px] p-10 shadow-lg rounded-lg border"
            style={{
              display: "flex",
              fontFamily: fontFamilyLight,
              fontSize: "var(--font-small-size)",
              gap: "var(--gap-small)",
              color: "var(--color-primary)",
              textAlign: "center",
            }}
          >
            102 Demandes en cours
          </div>
        </div>
      </section>
      <section
        className="flex justify-center items-center border h-[300px] rounded-lg shadow-lg flex-col p-3 "
        style={{ overflowX: "clip" }}
      >
        <AnimatePresence mode="wait">
          {currentId && (
            <motion.div
              key={currentId}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 500, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar
                size={100}
                style={{
                  border: "1px solid var(--color-text-secondary)",
                  fontSize: "16px",
                  fontFamily: fontFamilyLight,
                  textTransform: "uppercase",
                  color: "black",
                  background: "white",
                }}
                className="shadow-lg"
              >
                {currentId}
              </Avatar>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          style={{
            fontFamily: fontFamilyBold,
            textAlign: "center",
          }}
        >
          {t("BeomCare rédacteur")}
        </div>
        <div
          style={{
            fontFamily: fontFamilyLight,
            textAlign: "center",
            fontSize: "10px",
          }}
        >
          {t(
            "une plateforme exclusive dédiée à la gestion, révision et édition de contenu Beom Care"
          )}
        </div>
        <p
          style={{
            fontFamily: fontFamilyBold,
            textAlign: "center",
            fontSize: "10px",
          }}
        >
          {t(" y'en a d'autres plateformes?")}
        </p>
        <Button
          icon={<BsInfoCircle />}
          type="link"
          className="w-full flex bg-white flex-row items-center justify-center "
          style={{
            fontFamily: fontFamilyMedium,
            color: "var(--color-text-secondary)",
          }}
        >
          <u>{t("Centre d'aide")}</u>
        </Button>
      </section>
    </>
  );
};

export default WaitingPartners;
