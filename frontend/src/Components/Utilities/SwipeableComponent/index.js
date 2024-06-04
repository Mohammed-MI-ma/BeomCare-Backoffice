import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { PiHandSwipeLeftThin } from "react-icons/pi";
import classNames from "classnames"; // Import classNames for dynamic class assignment
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { GrValidate } from "react-icons/gr";
import useFontFamily from "../../../Utilities/useFontFamily";

const SwipeableComponent = ({
  onSwipeLeft,
  onSwipeRight,
  children,
  isValid,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const fontFamilyLight = useFontFamily("Light");
  const { t } = useTranslation();
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

  const handleChangeIndex = (index, indexLatest) => {
    if (index < indexLatest) {
      onSwipeRight();
    } else if (index > indexLatest) {
      onSwipeLeft();
    }
  };

  return (
    <div className={classNames("relative", isMobile && "overflow-hidden")}>
      <SwipeableViews onChangeIndex={handleChangeIndex}>
        {children}
        {isMobile && (
          <div className="w-full h-full border flex">
            <div
              className="flex h-full items-center w-[50px] justify-center shadow rounded"
              style={{ background: "var(--color-text-secondary)" }}
            >
              <PiHandSwipeLeftThin size={30} style={{ color: "white" }} />
            </div>
            <div
              id="tools"
              className="flex-1 flex justify-between items-center px-10 gap-2"
            >
              <Button
                disabled={isValid}
                className="button w-full"
                style={{ fontFamily: fontFamilyLight, color: "black" }}
                icon={<GrValidate />}
              >
                {!isValid
                  ? t("Envoyer pour Validation")
                  : t("Catégorie déja validée")}
              </Button>
            </div>
          </div>
        )}
      </SwipeableViews>
    </div>
  );
};

export default SwipeableComponent;
