import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CategoriesList.module.css";
import SkeletonCategories from "../SkeletonCategories";
import { setCategories } from "../../../Reducers/applicationService/applicationSlice";
import { getAllCategories } from "../../../Reducers/applicationService/actions/applicationService";
import useFontFamily from "../../../Utilities/useFontFamily";
import ResponsiveIcon from "../../../Components/Utilities/ResponsiveIcon";
import { Button } from "antd";
import dateFormat from "dateformat";
import { useTranslation } from "react-i18next";
import SwipeableComponent from "../../../Components/Utilities/SwipeableComponent";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const access_Token = useSelector((state) => state.auth.accessToken);
  const isGettingCategories = useSelector(
    (state) => state.application.isGettingCategories
  );
  const categories = useSelector((state) => state.application.categories);
  const pagination = useSelector((state) => state.application.pagination);
  const { t } = useTranslation();
  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyBold = useFontFamily("SemiBold");

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
      <div className={`${style.box} shadow-md`}>
        <div>
          {categories.map((category) => (
            <SwipeableComponent
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              isValid={category?.isConfirmed}
            >
              <div
                key={category._id}
                className={`${style.categoryItem} px-5 shadow-sm py-2 `}
              >
                <div>
                  <div
                    className={`${style.rect} w-full flex items-center`}
                    style={{
                      fontFamily: fontFamilyBold,
                      fontSize: "var(--font-small-size)",
                    }}
                  >
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
                    <h2>{category.name}</h2>
                  </div>
                  <div
                    className={`${style.desc} w-full`}
                    style={{ fontFamily: fontFamilyLight }}
                  >
                    {dateFormat(new Date(category.createdAt), "fullDate")}
                  </div>
                </div>
                <div className={`${style.icons}`}>
                  <div
                    className={`${style.circle}`}
                    style={{ fontFamily: fontFamilyBold }}
                  >
                    60
                  </div>
                  <div
                    className={`${style.circle}`}
                    style={{ fontFamily: fontFamilyLight }}
                  >
                    Centres
                  </div>
                  <div
                    className={`${style.circle}`}
                    style={{
                      fontFamily: fontFamilyLight,
                      fontSize: "var(--font-tiny-size)",
                    }}
                  >
                    affiliés
                  </div>
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
              ? "var(--color-primary)"
              : "gray",
          }}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
        >
          {pagination.currentPage + "/" + pagination.totalPages} {t("Suivant")}
        </Button>
      </div>
    </>
  );
};

export default CategoriesList;
