import Skeleton from "react-loading-skeleton";
import React from "react";
import CenteredFlexComponent from "../../../Components/Utilities/CenteredFlexComponent";
import style from "./SkeletonCategories.module.css";

const SkeletonCategories = () => {
  return (
    <div className={`${style.boxSkeleton} bg-white`}>
      {[...Array(3)].map((_, index) => (
        <div key={index}>
          <SkeletonDesign />
        </div>
      ))}
    </div>
  );
};

const SkeletonDesign = () => {
  return (
    <div className="shadow-sm w-full flex justify-between items-center px-5 py-2">
      <Skeleton className={`${style.rectSkeleton}`} />
      <CenteredFlexComponent
        style={{ gap: "var(--gap-small)", flexDirection: "column" }}
      >
        <Skeleton className={`${style.circleSkeleton}`} />
        <Skeleton className={`${style.circleSkeleton}`} />
        <Skeleton className={`${style.circleSkeleton}`} />
      </CenteredFlexComponent>
    </div>
  );
};

export default SkeletonCategories;
