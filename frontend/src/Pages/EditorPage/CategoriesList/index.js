import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CategoriesList.module.css";
import SkeletonCategories from "../SkeletonCategories";
import { setCategories } from "../../../Reducers/applicationService/applicationSlice";
import { getAllCategories } from "../../../Reducers/applicationService/actions/applicationService";
import useFontFamily from "../../../Utilities/useFontFamily";
import ResponsiveIcon from "../../../Components/Utilities/ResponsiveIcon";
import { Badge, Button, Divider, Empty } from "antd";
import { IoIosEye } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import SwipeableComponent from "../../../Components/Utilities/SwipeableComponent";
import CenteredFlexComponent from "../../../Components/Utilities/CenteredFlexComponent";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  const access_Token = useSelector((state) => state.auth.accessToken);
  const isGettingCategories = useSelector(
    (state) => state.application.isGettingCategories
  );
  const categories = useSelector((state) => state.application.categories);
  const pagination = useSelector((state) => state.application.pagination);
  const { t } = useTranslation();
  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyBold = useFontFamily("SemiBold");
  const fontFamilyMedium = useFontFamily("Medium");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await dispatch(
        getAllCategories({ accessToken: access_Token })
      );
      if (response.status) {
        dispatch(setCategories(response.categories));
      }
    };

    fetchCategories();
  }, [dispatch]);
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
  if (isGettingCategories) {
    return <SkeletonCategories />;
  }
  const handlePageChange = async (newPage) => {
    await dispatch(
      getAllCategories({
        page: newPage,
        limit: pagination.itemsPerPage,
        accessToken: access_Token,
      })
    );
  };
  const handleSwipeLeft = () => {
    console.log("Swiped left");
    // Add your action for swipe left
  };

  const handleSwipeRight = () => {
    console.log("Swiped right");
    // Add your action for swipe right
  };

  return (
    <>
      {categories.length === 0 ? (
        <Empty
          style={{
            fontFamily: fontFamilyBold,
            color: pagination.hasPrevPage ? "var(--color-primary)" : "gray",
          }}
          description="Aucune catégorie trouvée"
        ></Empty>
      ) : (
        <>
          <div className={`${style.box} shadow-md`}>
            <div>
              {categories.map((category, index) => (
                <SwipeableComponent
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  isValid={category?.isConfirmed}
                  key={index}
                >
                  <div
                    key={category._id}
                    className={`${style.categoryItem} px-5 shadow-sm py-2 `}
                    style={{
                      borderBottom: ".5px dashed var(--color-text-secondary)",
                    }}
                  >
                    <div>
                      <div
                        className={`${style.rect} w-full gap-3 flex items-center`}
                      >
                        <IoCopy />
                        <Divider type="vertical" />
                        <ResponsiveIcon
                          alt="Logo Beom"
                          images={[
                            { src: category?.images?.iconLow, width: 60 },
                            {
                              src: category?.images?.iconMedium,
                              width: 30,
                              default: true,
                            },
                            { src: category?.images?.iconHigh, width: 170 },
                          ]}
                        />
                        <Badge dot color={category.isActive ? "green" : "red"}>
                          <h2
                            style={{
                              fontFamily: fontFamilyMedium,
                              fontSize: "var(--font-small-size)",
                            }}
                          >
                            {category.name}
                          </h2>
                        </Badge>
                      </div>
                      <div
                        className={`${style.desc} w-full`}
                        style={{
                          fontFamily: fontFamilyLight,
                          fontSize: "var(--font-tiny-size)",
                        }}
                      >
                        Créee le&nbsp;
                        {new Intl.DateTimeFormat("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(new Date(category.createdAt))}
                      </div>
                    </div>
                    <div className={`${style.icons} flex gap-2 flex-row`}>
                      <CenteredFlexComponent>
                        <Button
                          className="flex items-center border"
                          style={{
                            fontFamily: fontFamilyLight,
                            fontSize: "var(--font-tiny-size)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          <p>Résumé</p>&nbsp;
                          <IoIosEye />
                        </Button>
                      </CenteredFlexComponent>
                      {!isMobile && (
                        <Button
                          type="primary"
                          className="flex items-center border"
                          style={{
                            fontFamily: fontFamilyLight,
                            fontSize: "var(--font-tiny-size)",
                          }}
                        >
                          {t("Envoyer pour validation?")} &nbsp;
                          <BsSendFill />
                        </Button>
                      )}
                    </div>
                    <div
                      className=" sm:hidden absolute right-0 top-0 h-full w-[10px]"
                      style={{ background: "var(--color-text-secondary)" }}
                    ></div>{" "}
                  </div>
                </SwipeableComponent>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <Button
              style={{
                fontFamily: fontFamilyBold,
                color: pagination.hasPrevPage ? "var(--color-primary)" : "gray",
              }}
              type="link"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
            >
              <u>{t("Précedent")}</u>
            </Button>

            <Button
              className="shadow-sm"
              style={{
                fontFamily: fontFamilyBold,
                color: "white",
                background: pagination.hasNextPage
                  ? "var(--color-text-secondary)"
                  : "gray",
              }}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              {pagination.currentPage + "/" + pagination.totalPages}{" "}
              {t("Suivant")}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default CategoriesList;
