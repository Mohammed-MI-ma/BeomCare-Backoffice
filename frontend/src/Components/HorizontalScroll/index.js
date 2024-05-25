import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./horizontalScroll.module.css";
import useFontFamily from "../../Utilities/useFontFamily";
import { Button } from "antd";
import { CustomDivider } from "../../Pages/LoginPage";
import { useTranslation } from "react-i18next";
import { GrUserAdmin, GrArticle } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setRoleSelected } from "../../Reducers/applicationService/applicationSlice";

export const partners = [
  {
    id: "boss",
    title: "Administarteur Beom",
    icon: <GrUserAdmin size={40} />,
    missions: [
      {
        id: 1,
        desc: "Gérer les utilisateurs et leurs autorisations",
      },
      { id: 2, desc: "Surveiller la sécurité du système" },
    ],
  },
  {
    id: "editor",
    title: "Rédacteur Beom",
    icon: <GrArticle size={40} />,
    missions: [
      {
        id: 1,
        desc: "Réviser le contenu",
      },
      {
        id: 2,
        desc: "Développer des idées de contenu.",
      },
    ],
  },
  {
    id: "partner",
    title: "Partenaire Beom",
    icon: <TbUsers size={40} />,
    missions: [
      {
        id: 1,
        desc: "Entretenir des relations avec les partenaires",
      },
      {
        id: 2,
        desc: "Coordonner des événements de marketing conjoints.",
      },
    ],
  },
];

const HorizontalScroll = ({ style }) => {
  const roleSelected = useSelector((state) => state.application.roleSelected);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const fontFamilyBold = useFontFamily("SemiBold");
  const fontFamilyLight = useFontFamily("Light");

  const { t } = useTranslation();

  useEffect(() => {
    // Scroll the selected card into view when roleSelected changes
    if (scrollRef.current && roleSelected) {
      const selectedCard = scrollRef.current.querySelector(
        `#${roleSelected.id}`
      );
      if (selectedCard) {
        selectedCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [roleSelected]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <motion.section
      className={styles.horizontalScrollContainer}
      style={{ ...style }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <motion.button
          className={styles.scrollButton}
          onClick={() => scroll("left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ❮
        </motion.button>
        <motion.button
          className={styles.scrollButton}
          onClick={() => scroll("right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ❯
        </motion.button>
      </div>
      <div className={styles.scrollableContent} ref={scrollRef}>
        {partners.map((partner, index) => (
          <motion.div
            id={partner.id}
            key={partner.id}
            className={styles.item}
            style={{
              cursor: "pointer",
              border: partner.id === roleSelected?.id ? "1px solid black" : "",
            }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }} // Add scaling effect on hover
            onClick={() => {
              dispatch(
                setRoleSelected({
                  id: partner.id,
                  title: partner.title,
                  role: partner.id,
                  missions: partner?.missions ? partner?.missions : null,
                  icon: partner?.icon ? partner?.icon : null,
                })
              );
            }}
          >
            {partner.icon}
            <div style={{ maxWidth: "230px" }}>
              <h1 style={{ fontFamily: fontFamilyLight }}>{partner.title}</h1>
              <Button
                type="link"
                style={{
                  fontFamily: fontFamilyBold,
                  textTransform: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  color: "black",
                }}
              >
                <p>{t("Sélectionner")}</p>
                <CustomDivider color="#001529" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HorizontalScroll;
