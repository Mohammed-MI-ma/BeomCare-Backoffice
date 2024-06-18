import React, { useEffect, useState } from "react";
import HomePage from "../HomePage";
import { Button, Divider, Avatar } from "antd";
import { useSubscriptions } from "../../context/SocketProvider";
import { MdQueryStats } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { FaMapMarked } from "react-icons/fa";

import useFontFamily from "../../Utilities/useFontFamily";
import style from "./editorPage.module.css";

import { useTranslation } from "react-i18next";
import RealTimeGraph from "../../Components/RealTimeGraph";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoriesBeomSection from "./CategoriesBeomSection";

const EditorPage = () => {
  return <HomePage mainContent={<EditorContent />} />;
};

export default EditorPage;
const EditorContent = () => {
  const { t } = useTranslation();
  const subscriptions = useSubscriptions();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const navigate = useNavigate();
  const [aggregatedData, setAggregatedData] = useState([]);

  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyMedium = useFontFamily("Medium");
  const fontFamilyBold = useFontFamily("SemiBold");

  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);
  useEffect(() => {
    if (subscriptions.length > 0) {
      const aggregated = subscriptions.reduce((acc, { timestamp }) => {
        const date = new Date(timestamp);
        const dateString = date.toISOString().split("T")[0];

        const existing = acc.find((d) => d.timestamp === dateString);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ timestamp: timestamp, count: 1 });
        }

        return acc;
      }, []);

      console.log("Aggregated Data:", aggregated); // Log aggregated data
      setAggregatedData(aggregated);
    }
  }, [subscriptions]);
  // Add some mock data to test rendering

  return (
    <div>
      <div>
        <section className="mb-9">
          <u>
            <h1
              style={{
                display: "flex",
                fontFamily: fontFamilyBold,
                fontSize: "var(--font-small-size)",
                gap: "var(--gap-small)",
                color: "var(--color-primary)",
              }}
            >
              <FaMapMarked />
              {t("Les 5 endroits les plus visités en ce moment")}
            </h1>
          </u>
          <h2
            style={{
              fontFamily: fontFamilyLight,
              fontSize: "var(--font-tiny-size)",
              display: "flex",
              gap: "var(--gap-small)",
              color: "var(--color-text-secondary)",
            }}
          >
            {t(
              "Graphique montrant l'evolution des abonnés BeomCare au fil du temps"
            )}
          </h2>
        </section>
      </div>
      <Divider />
      <div
        className={`${style.statisticsContainer} flex items-center`}
        style={{ backgound: "aliceblue" }}
      >
        <section className="mb-9">
          <u>
            <h1
              style={{
                display: "flex",
                fontFamily: fontFamilyBold,
                fontSize: "var(--font-small-size)",
                gap: "var(--gap-small)",
                color: "var(--color-primary)",
              }}
            >
              <MdQueryStats />
              {t("Statistiques Globales")}
            </h1>
          </u>
          <h2
            style={{
              fontFamily: fontFamilyLight,
              fontSize: "var(--font-tiny-size)",
              display: "flex",
              gap: "var(--gap-small)",
              color: "var(--color-text-secondary)",
            }}
          >
            {t(
              "Graphique montrant l'evolution des abonnés BeomCare au fil du temps"
            )}
          </h2>
          <div>
            <RealTimeGraph data={aggregatedData} />
          </div>
        </section>
        <section className="flex justify-center items-center border h-[300px] rounded-lg shadow-lg flex-col p-3 ">
          <Avatar
            size={100}
            style={{
              background: "var(--color-text-secondary)",
              border: "1px solid white",
              fontSize: "16px",
              fontFamily: fontFamilyLight,
              textTransform: "uppercase",
            }}
            className="shadow-lg"
          >
            {userInfo?.mission}
          </Avatar>
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
            {" "}
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
      </div>
      <Divider />
      <CategoriesBeomSection />
    </div>
  );
};
