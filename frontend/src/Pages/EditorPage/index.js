import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
  useTransition,
} from "react";
import HomePage from "../HomePage";
import { Alert, Button, Checkbox, ConfigProvider } from "antd";
import Skeleton from "react-loading-skeleton";

import useFontFamily from "../../Utilities/useFontFamily";
import CenteredFlexComponent from "../../Components/Utilities/CenteredFlexComponent";
import { AppstoreAddOutlined, FileAddOutlined } from "@ant-design/icons";
import { CiMenuKebab } from "react-icons/ci";
import Marquee from "react-fast-marquee";
import style from "./editorPage.module.css";
//__users Icons
//__Settings Icons
import { useTranslation } from "react-i18next";
import CategoryManager from "../../Components/CategoryManager";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnimatesIcon from "../../Components/Utilities/AnimatedIcon";
import CategoriesList from "./CategoriesList";
const AddCategoryComponent = lazy(() =>
  import("../../Components/AddCategoryComponent")
);

const EditorPage = () => {
  return <HomePage mainContent={<EditorContent />} />;
};

export default EditorPage;
const EditorContent = () => {
  const { t } = useTranslation();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const navigate = useNavigate();

  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyMedium = useFontFamily("Medium");

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleDrawer = (state) => {
    startTransition(() => {
      setIsOpenDrawer(state);
    });
  };
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  const pagination = useSelector((state) => state.application.pagination);
  const isGettingCategories = useSelector(
    (state) => state.application.isGettingCategories
  );
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0b57d0",
        },
        components: {
          List: {
            itemPadding: 20,
          },
        },
      }}
    >
      <div
        className={`flex gap-10 flex-col w-full `}
        style={{ overflow: "hidden" }}
      >
        <div
          className={`w-full flex justify-between align-center gap-10  ${style.topMenuBar}`}
        >
          <section>
            <h1
              style={{
                fontFamily: fontFamilyMedium,
                fontSize: "var(--font-small-size)",
                display: "flex",
                gap: "var(--gap-small)",
                color: "var(--color-text-secondary)",
              }}
            >
              {t("Catégories BeomCare")}
            </h1>
            <Alert
              banner
              type="info"
              message={
                <Marquee pauseOnHover gradient={false}>
                  <p
                    style={{
                      fontFamily: fontFamilyLight,
                      fontSize: "var(--font-tiny-size)",
                    }}
                  >
                    {t(
                      "Rappel : Le compte suivant a uniquement accès à la création de nouvelles catégories sous l'autorisation de l'administrateur. Aucune catégorie nouvellement créée ne sera partagée avec le public sans la confirmation de l'administrateur."
                    )}
                  </p>
                </Marquee>
              }
            />
          </section>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              loading={isPending}
              type="primary"
              onClick={() => toggleDrawer(true)}
              className="w-full  flex bg-white flex-row items-center justify-center shadow-lg border-black border rounded-lg h-12"
              style={{
                fontFamily: fontFamilyMedium,
                color: "var(--color-text-secondary)",
              }}
            >
              {t("Ajouter nouvelle catégorie")}
            </Button>
          </div>
        </div>
        <div className="w-full gap-5 flex flex-col">
          <div>
            <CenteredFlexComponent
              className="gap-1 "
              style={{ justifyContent: "flex-start" }}
            >
              {isGettingCategories ? (
                <Skeleton
                  height={15}
                  width={10}
                  borderRadius={50}
                  className="shadow-lg"
                />
              ) : (
                pagination?.totalItems
              )}

              <p
                style={{
                  fontFamily: fontFamilyLight,
                  fontSize: "var(--font-tiny-size)",
                }}
              >
                {t("Catégorie(s)")}
              </p>
            </CenteredFlexComponent>
            <CategoriesList />
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {isOpenDrawer && (
          <AddCategoryComponent
            isOpenDrawer={isOpenDrawer}
            onCloseHandler={() => toggleDrawer(false)}
          >
            <CategoryManager />
          </AddCategoryComponent>
        )}
      </Suspense>
    </ConfigProvider>
  );
};
