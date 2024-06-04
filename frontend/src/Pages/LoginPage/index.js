/* eslint-disable no-template-curly-in-string */
import { Button, Divider, Form, Input, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import useFontFamily from "../../Utilities/useFontFamily";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { beom_care_medium, beom_care_small } from "../../images";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA } from "../../config.dev";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import style from "./loginPage.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { loginSchema } from "../../Utilities/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../Reducers/authService/actions/authAction";
import {
  setCredentials,
  setUserIsLoggedIn,
  setUserToken,
} from "../../Reducers/authService/authSlice";

const LoginPage = () => {
  const { t } = useTranslation();
  const roleSelected = useSelector((state) => state.application.roleSelected);

  //__Form items
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);

  //__Fonts
  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyBold = useFontFamily("SemiBold");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isLoginInProgress) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoginInProgress]);

  const recaptchaVariants = {
    hidden: {
      opacity: -10,
      x: "100%",
      ease: "anticipate",
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        delayChildren: 1,
      },
    },
  };

  const transitionProps = {
    duration: 1,
    ease: "anticipate",
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      recaptchaToken: null,
    },
    validationSchema: loginSchema,
  });
  const isFormFilled =
    formik.values.email !== "" || formik.values.password !== "";
  const handleSubmit = async () => {
    // Validate the form
    const errors = await formik.validateForm();

    // If there are validation errors, do not submit the form
    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsLoginInProgress(true);

    try {
      const response = await dispatch(
        loginAdmin({
          ...formik.values,
          role: "admin",
          mission: roleSelected.id,
        })
      );
      console.log("response", response);
      if (response && response.status) {
        dispatch(setUserIsLoggedIn(true));
        dispatch(
          setCredentials({
            ...response?.userData,
            accessToken: response?.accessToken,
            refreshToken: response?.refreshToken,
          })
        );
        dispatch(setUserToken(response?.accessToken));

        // Reset registerData after successful submission
        navigate("/beom/homepage");
      } else if (response && response.message) {
        message.error(response.message);
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoginInProgress(false);
    }
  };

  return (
    <main
      className={` ${style.formContainer} bg-cover flex-col-reverse lg:flex-row`}
    >
      <main className={`h-full p-4 gap-1 `} style={{ margin: "0 auto" }}>
        <section>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {roleSelected.icon}{" "}
            <h1
              className={style.header}
              style={{
                fontFamily: fontFamilyLight,
              }}
            >
              {t("Je suis un ")}
              {roleSelected.title},&nbsp;
              <Link
                to="/"
                style={{
                  fontFamily: fontFamilyBold,
                }}
              >
                <u>{t("modifier")}</u>
              </Link>
            </h1>
            <div
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <p
                style={{
                  fontFamily: fontFamilyLight,
                }}
              >
                {t("Email *")}
              </p>
              <Input
                allowClear
                required
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{ fontFamily: fontFamilyLight }}
              />

              {/**Password*/}

              <p
                style={{
                  fontFamily: fontFamilyLight,
                }}
              >
                {t("Mot de passe*")}
              </p>
              <Input.Password
                name="password"
                allowClear
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                style={{ fontFamily: fontFamilyLight }}
              />
              <AnimatePresence>
                {isFormFilled ? (
                  <motion.div
                    style={{ position: "reltive" }}
                    key="recaptcha"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={recaptchaVariants}
                    transition={{ ...transitionProps }}
                  >
                    <p
                      style={{
                        fontFamily: fontFamilyLight,
                      }}
                    >
                      {t("Google reCAPTCHA*")}
                    </p>
                    <ReCAPTCHA
                      size="compact"
                      onBlur={formik.handleBlur}
                      theme={"dark"}
                      style={{ fontFamily: fontFamilyBold }}
                      sitekey={RECAPTCHA.RECAPTCHA_SITE_KEY}
                      onChange={(token) =>
                        formik.setFieldValue("recaptchaToken", token)
                      }
                      className="mb-5"
                    />

                    <Button
                      type="submit"
                      disabled={!formik.isValid}
                      className="w-full"
                      loading={isLoginInProgress}
                      size="large"
                      style={{
                        background: formik.isValid
                          ? "var(--color-primary) "
                          : "gray",
                        fontFamily: fontFamilyLight,
                        fontSize: "13px",
                        color: "white",
                      }}
                      onClick={handleSubmit}
                    >
                      {t("Se connecter")}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-recaptcha"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={recaptchaVariants}
                    transition={{ ...transitionProps }}
                  >
                    <Button
                      className="w-full"
                      size="large"
                      htmlType="submit"
                      style={{
                        background: "var(--color-primary)",
                        fontFamily: fontFamilyLight,
                        fontSize: "13px",
                      }}
                    >
                      {t("Se connecter")}
                    </Button>

                    <FreeRegistration />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Form>{" "}
        </section>{" "}
      </main>
    </main>
  );
};

export default LoginPage;

//__components
export const LightLogoBeom = () => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          }
        />
      )}{" "}
      {/* Render Spinner while loading */}
      <img
        srcSet={`${beom_care_small} 308w, ${beom_care_medium} 182w`}
        sizes="(max-width: 768px) 110px, (max-width: 1200px) 308px, 308px"
        src={beom_care_small}
        alt="BeomCare Logo"
        onLoad={handleImageLoad} // Call handleImageLoad when the image loads
        style={{ display: loading ? "none" : "block" }} // Hide image while loading
      />
    </div>
  );
};
export const CustomDivider = ({
  color = "#E1B74A",
  height = "2px",
  width = "65px",
  minWidth = "inherit",
  style,
}) => {
  return (
    <Divider
      style={{
        ...style,
        background: color,
        height: height,
        width: width,
        minWidth: minWidth,
      }}
    />
  );
};

//__propTypes
CustomDivider.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  minWidth: PropTypes.string,
};
const FreeRegistration = ({ style }) => {
  const { t } = useTranslation();

  return (
    <p
      style={{
        ...style,
        fontSize: "var(--font-extra-small-size)",
        textAlign: "center",
      }}
    >
      {t("En cas de besoin, contactez le support BeomCare")}
    </p>
  );
};
