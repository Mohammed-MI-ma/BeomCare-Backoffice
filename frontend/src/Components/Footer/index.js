//__React
import React, { useEffect, useMemo } from "react";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import { setLanguage } from "../../Reducers/applicationService/applicationSlice";

//31kb
import FooterItem from "./FooterItem";

//_utils

//_styling
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
import { beom_care_medium_dark } from "../../images";
import useFontFamily from "../../Utilities/useFontFamily";
import SocialMediaButtons from "../SocialMediaLinks";

const RIGHT = "right";
const LEFT = "left";
const AR = "ar";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.application.language);
  const fontFamilyLight = useFontFamily("Light");

  const items = [
    {
      key: "1",
      label: <p style={{ fontFamily: fontFamilyLight }}>{t("french")}</p>,
    },
  ];

  //Internationalization
  const handleChange = (value) => {
    switch (value) {
      case "fr":
        changeLanguage("fr");
        break;
      case "ar":
        changeLanguage("ar");
        break;
      default:
        changeLanguage("fr");
        break;
    }
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        changeLanguage("fr");
        break;
      case "2":
        changeLanguage("ar");
        break;
      default:
        changeLanguage("fr");
        break;
    }
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
  };

  //MEMO

  //__ContactUsBloc
  const memoizedContactUsBloc = useMemo(() => {
    try {
      if (!language || !t) return [];
      return [
        {
          id: "Ajoutez votre établissement",
          component: (
            <Link to="/web/guest/eat">{t("Ajoutez votre établissement")}</Link>
          ),
        },
        {
          id: "Rejoignez-nous",
          component: <Link to="/web/guest/eat">{t("Rejoignez-nous")}</Link>,
        },
        {
          id: "Politique de confidentialité",
          component: (
            <Link to="/beom/aboutUs/privacy-policy">
              {t("Politique de confidentialité")}
            </Link>
          ),
        },
        {
          id: "Support Beom",
          component: (
            <Link to="/beom/aboutUs/privacy-policy">{t("Support Beom")}</Link>
          ),
        },
      ];
    } catch (error) {
      console.error("Error occurred while memoizing ContactUsBloc:", error);
      return [];
    }
  }, [language, t]);
  //__ExploreBeomBloc
  const memoizedExploreBeomBloc = useMemo(() => {
    try {
      if (!language || !t) return [];
      return [
        {
          id: "coiffure",
          component: <Link to="/web/guest/eat">{t("coiffure")}</Link>,
        },
        {
          id: "INSTITUT DE BEAUTÉ",
          component: (
            <Link to="/web/guest/market"> {t("INSTITUT DE BEAUTÉ")}</Link>
          ),
        },
        {
          id: "SALON DE MAQUILLAGE",
          component: <> {t("SALON DE MAQUILLAGE")}</>,
        },
        {
          id: "MANUCURE",
          component: <>{t("MANUCURE")}</>,
        },
        {
          id: "SPA",
          component: <>{t("SPA")}</>,
        },
      ];
    } catch (error) {
      console.error("Error occurred while memoizing ContactUsBloc:", error);
      return [];
    }
  }, [language, t]);
  //__ExploreBeomBloc
  const memoizedFAQBloc = useMemo(() => {
    try {
      if (!language || !t) return [];
      return [
        {
          id: "coiffure RABAT",
          component: <Link to="/web/guest/eat">{t("coiffure RABAT")}</Link>,
        },
        {
          id: "coiffure SALÉ",
          component: <Link to="/web/guest/market"> {t("coiffure SALÉ")}</Link>,
        },
        {
          id: "coiffure TEMARA",
          component: <> {t("coiffure TEMARA")}</>,
        },
      ];
    } catch (error) {
      console.error("Error occurred while memoizing FAQBloc:", error);
      return [];
    }
  }, [language, t]);

  const linksStyle = {
    textAlign: language === AR ? RIGHT : LEFT,
    fontFamily: fontFamilyLight,
    color: "var(--color-primary)",
  };
  const getContent = (id) => {
    switch (id) {
      case 2:
        return (
          <ListItemsBloc
            language={language}
            s={linksStyle}
            memoizedBloc={memoizedContactUsBloc}
          />
        );
      case 3:
        return (
          <ListItemsBloc
            language={language}
            s={linksStyle}
            memoizedBloc={memoizedExploreBeomBloc}
          />
        );

      case 4:
        return (
          <ListItemsBloc
            language={language}
            s={linksStyle}
            memoizedBloc={memoizedFAQBloc}
          />
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 3);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <footer
      className={`bg-cover absolute w-full flex items-center flex-col bg-white mt-10`}
    >
      <div
        className={`grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 ${style.grid}`}
      >
        <div className="w-full">
          <img
            src={beom_care_medium_dark}
            alt="YOKO Company Logo"
            width={"130px"}
          />
          <div>
            <div className="flex flex-row items-center gap-2 mb-5">
              <SocialMediaButtons color={"var(--color-primary)"} />
            </div>
            <div>
              <Dropdown
                menu={{
                  items,
                  onClick,
                }}
                onChange={handleChange}
              >
                <Space
                  style={{
                    fontFamily: fontFamilyLight,
                    border: "1px solid var(--color-primary)",
                    padding: "15px",
                    width: 146,
                    height: 47,
                    borderRadius: "10px",
                  }}
                >
                  {t("french")}
                  <DownOutlined />
                </Space>
              </Dropdown>
            </div>
          </div>
        </div>

        {[2, 3, 4].map((id) => (
          <FooterItem
            header={getHeader(id, t)}
            descriptionContent={getContent(id)}
            key={id}
            language={language}
          />
        ))}
      </div>
    </footer>
  );
};

const ListItemsBloc = React.memo(({ memoizedBloc, s }) => {
  return (
    <nav>
      <ul className={style.listItemsBloc}>
        {memoizedBloc.map((blocItem) => (
          <li key={blocItem.id} style={s}>
            {blocItem.component}
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Footer;
export const getHeader = (id, t) => {
  switch (id) {
    case 2:
      return t("À propos de BEOM CARE");
    case 3:
      return t("Trouvez votre prestation");
    case 4:
      return t("Recherches fréquentes");
    default:
      return "";
  }
};
