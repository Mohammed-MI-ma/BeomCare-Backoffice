import React from "react";
import style from "./loader.module.css";
const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        color: "var(--color-theme)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={style.sk_cube_grid}>
        <div className={`${style.sk_cube} ${style.sk_cube1}`} />
        <div className={`${style.sk_cube} ${style.sk_cube2}`} />
        <div className={`${style.sk_cube} ${style.sk_cube3}`} />
        <div className={`${style.sk_cube} ${style.sk_cube4}`} />
        <div className={`${style.sk_cube} ${style.sk_cube5}`} />
        <div className={`${style.sk_cube} ${style.sk_cube6}`} />
        <div className={`${style.sk_cube} ${style.sk_cube7}`} />
        <div className={`${style.sk_cube} ${style.sk_cube8}`} />
        <div className={`${style.sk_cube} ${style.sk_cube9}`} />
      </div>
    </div>
  );
};

export default Loader;
