import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useSelector } from "react-redux";

//__ANTD
import { Alert, Button, ConfigProvider, Skeleton } from "antd";

//__HOOKS
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../Utilities/useFontFamily";

//__ICONS
import { BiSolidCategory } from "react-icons/bi";
import { GrFormViewHide } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

//__CUSTOM_COMPONENTS
import CenteredFlexComponent from "../../../Components/Utilities/CenteredFlexComponent";
import AddCategoryComponent from "../../../Components/AddCategoryComponent";
import CategoryManager from "../../../Components/CategoryManager";
import CategoriesList from "../CategoriesList";
import Marquee from "react-fast-marquee";

//STYLING
import style from "./categoriesBeomSection.module.css";

const CategoriesBeomSection = () => {
  const { t } = useTranslation();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pagination = useSelector((state) => state.application.pagination);
  const isGettingCategories = useSelector(
    (state) => state.application.isGettingCategories
  );
  const toggleDrawer = (state) => {
    startTransition(() => {
      setIsOpenDrawer(state);
    });
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //__FONTS
  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyMedium = useFontFamily("Medium");
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
      <main
        className={`flex gap-10 flex-col w-full `}
        style={{ overflow: "hidden" }}
      >
        <header
          className={`w-full flex justify-between align-center gap-10  ${style.topMenuBar}`}
        >
          <section>
            <h1
              style={{
                fontFamily: fontFamilyMedium,
                fontSize: "var(--font-small-size)",
                display: "flex",
                gap: "var(--gap-small)",
                color: "var(--color-primary)",
              }}
            >
              <BiSolidCategory />
              <u> {t("Catégories BeomCare")}</u>
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
              onClick={() => toggleDrawer(true)}
              className="w-full  flex bg-white flex-row items-center justify-center shadow-lg rounded-lg h-12"
              style={{
                fontFamily: fontFamilyMedium,
                color: "var(--color-text-secondary)",
              }}
            >
              {t("Ajouter catégorie?")}
            </Button>
          </div>
        </header>
        <section className="w-full gap-5 flex flex-col">
          <div>
            {!isMobile && (
              <div style={{ overflow: "auto" }}>
                <div
                  className={`${style.scrollableContent} w-full flex justify-start items-center gap-3 mb-2`}
                >
                  <p
                    className="mr-3"
                    style={{
                      fontFamily: fontFamilyLight,
                    }}
                  >
                    {t("Outils")}
                  </p>
                  <Button
                    className="shadow-lg"
                    icon={<MdEdit />}
                    style={{
                      fontFamily: fontFamilyLight,
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--font-tiny-size)",
                    }}
                  >
                    {t("Modifier")}
                  </Button>
                  <Button
                    className="shadow-lg"
                    style={{
                      fontFamily: fontFamilyLight,
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--font-tiny-size)",
                    }}
                    icon={<GrFormViewHide />}
                  >
                    {t("Masquer")}
                  </Button>
                  <Button
                    className="shadow-lg"
                    icon={<FaTrash />}
                    danger
                    style={{
                      fontFamily: fontFamilyLight,
                      fontSize: "var(--font-tiny-size)",
                    }}
                  >
                    {t("Supprimer")}
                  </Button>
                </div>
              </div>
            )}
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
                <p
                  style={{
                    fontFamily: fontFamilyLight,
                    fontSize: "var(--font-tiny-size)",
                  }}
                >
                  {pagination?.totalItems}
                </p>
              )}

              <p
                style={{
                  fontFamily: fontFamilyLight,
                  fontSize: "var(--font-tiny-size)",
                }}
              >
                {t("Catégorie(s) que vous avez créée(s).")}
              </p>
            </CenteredFlexComponent>
            <CategoriesList />
          </div>
        </section>
      </main>

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

export default CategoriesBeomSection;
