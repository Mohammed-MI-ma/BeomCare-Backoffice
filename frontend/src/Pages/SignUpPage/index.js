import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Checkbox,
  ConfigProvider,
  message,
} from "antd";
import { useFormik } from "formik";

import useFontFamily from "../../Utilities/useFontFamily";

//___COMPONENTS
import PhoneInput from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";

import { RECAPTCHA } from "../../config.dev";
import { signupSchema } from "../../Utilities/validationSchema";

//___style
import style from "./signUp.module.css";
import PolitiqueSecurite from "../../Components/Utilities/PolitiqueSecurite";
import RightContent from "../../Components/Utilities/RightContent";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Reducers/authService/actions/authAction";

const SignUpPage = () => {
  //__FONTS
  const phoneInputRef = useRef(null); // Create a ref for the phone input
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyBold = useFontFamily("SemiBold");
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);

  const { t } = useTranslation();
  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isRegistrationInProgress) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRegistrationInProgress]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    // Set focus on the phone input field when the component mounts
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }

    // Update button's disabled state based on form validity
  }, []); // Re-run effect when formik.isValid changes
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmedPassword: "",
      phoneNumber: "",
      termsOfServiceAccepted: true,
      privacyPolicyAccepted: true,
      recaptchaToken: null,
    },
    validationSchema: signupSchema,
  });
  const handleSubmit = async () => {
    // Validate the form
    const errors = await formik.validateForm();

    // If there are validation errors, do not submit the form
    if (Object.keys(errors).length !== 0) {
      return;
    }

    setIsRegistrationInProgress(true);

    try {
      const response = await dispatch(registerUser({ ...formik.values }));

      if (response && response.status) {
        message.success(t("Compte crée avec succes"));
        navigate("/beom/account/log-in");
      } else if (response && response.message) {
        message.warning(response?.message);
      } else {
        message.warning(t("Echec"));
      }
    } catch (e) {
      message.error(t("Error", e));
    } finally {
      setIsRegistrationInProgress(false);
    }
  };

  return (
    <main
      className={` ${style.formContainer} bg-cover flex-col-reverse lg:flex-row`}
    >
      <main className={`lg:w-1/2 h-full p-4 gap-1 `}>
        <section>
          <Form>
            {/**TODO: HEADLINE */}
            <h1
              className={style.header}
              style={{
                fontFamily: fontFamilyBold,
                textAlign: "center",
                marginBottom: "11px",
              }}
            >
              {t("Nouveau sur BEOM CARE ?")}
            </h1>
            {/**TODO: FORM */}
            <div
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/*******************TODO::: PHONE NUMBER */}
              <p
                style={{
                  fontFamily: fontFamilyLight,
                }}
              >
                {t("Téléphone portable *")}
              </p>
              <PhoneInput
                defaultCountry="MA"
                ref={phoneInputRef} // Attach the ref to the phone input field
                style={{ fontFamily: fontFamilyLight }}
                placeholder={t("Entrer votre numéro")}
                value={formik.values.phoneNumber}
                onChange={(value) => formik.setFieldValue("phoneNumber", value)}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <p style={{ fontFamily: fontFamilyLight, color: "red" }}>
                  {formik.errors.phoneNumber}
                </p>
              ) : (
                <p style={{ opacity: 0 }}>&nbsp;</p>
              )}
              {/*******************/}
              {/*******************/}
              {/*******************/}
              {/*******************/}
              {/*******************TODO::: EMAIL */}
              <p
                style={{
                  fontFamily: fontFamilyLight,
                }}
              >
                {t("Email *")}
              </p>
              <Input
                name="email"
                allowClear
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{ fontFamily: fontFamilyLight }}
              />
              {formik.touched.email && formik.errors.email ? (
                <p style={{ fontFamily: fontFamilyLight, color: "red" }}>
                  {formik.errors.email}
                </p>
              ) : (
                <p style={{ opacity: 0 }}>&nbsp;</p>
              )}
              {/*******************/}
              {/*******************/}
              {/*******************/}
              {/*******************/}
              {/*******************TODO::: PASSWORD */}
              <p style={{ fontFamily: fontFamilyLight }}>
                {t("Mot de passe *")}
              </p>
              <Input.Password
                name="password"
                allowClear
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                style={{ fontFamily: fontFamilyLight }}
              />
              {formik.touched.password && formik.errors.password ? (
                <p style={{ fontFamily: fontFamilyLight, color: "red" }}>
                  {formik.errors.password}
                </p>
              ) : (
                <p style={{ opacity: 0 }}>.</p>
              )}
              {/*******************/}
              {/*******************/}
              {/*******************/}
              {/*******************/}
              {/*******************TODO::: BUTTON NEXT */}
              <Button
                className="w-full"
                size="large"
                onClick={(e) => {
                  showModal();
                }}
                style={{
                  background: "var(--color-primary)",
                  fontFamily: fontFamilyLight,
                  fontSize: "13px",
                }}
              >
                {t("Suivant")}
              </Button>
              <ConfigProvider
                theme={{
                  token: {
                    colorBorder: "var(--color-primary)",
                    colorPrimary: "var(--color-primary)",
                  },
                }}
              >
                <Modal
                  title={null}
                  open={isModalOpen} // Changed from 'open' to 'visible'
                  onCancel={handleCancel}
                  centered
                  footer={
                    <>
                      <Button
                        type="submit"
                        disabled={!formik.isValid}
                        className="w-full"
                        loading={isRegistrationInProgress}
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
                        {t("S'inscrire")}
                      </Button>
                    </>
                  } // Removed footer buttons
                >
                  {/**********************/}
                  {/**********************/}
                  {/**********************/}
                  {/**********************/}
                  {/**********************/}
                  {/**********************/}
                  {/**********************/}
                  <h1
                    style={{
                      fontFamily: fontFamilyBold,
                      textAlign: "center",
                      marginBottom: "11px",
                    }}
                  >
                    {t("Nouveau sur BEOM CARE ?")}
                  </h1>
                  <ReCAPTCHA
                    sitekey={RECAPTCHA.RECAPTCHA_SITE_KEY}
                    theme="dark"
                    onChange={(token) =>
                      formik.setFieldValue("recaptchaToken", token)
                    }
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.recaptchaToken &&
                    formik.errors.recaptchaToken && (
                      <p style={{ fontFamily: fontFamilyLight, color: "red" }}>
                        {formik.errors.recaptchaToken}
                      </p>
                    )}
                  <Checkbox
                    name="termsOfServiceAccepted"
                    checked={formik.values.termsOfServiceAccepted}
                    onChange={formik.handleChange}
                    style={{
                      fontFamily: fontFamilyLight,
                      fontSize: "13px",
                    }}
                  >
                    {t("Vous accepter les conditions d'utilisation")}
                  </Checkbox>
                  {formik.touched.termsOfServiceAccepted &&
                    formik.errors.termsOfServiceAccepted && (
                      <p style={{ fontFamily: fontFamilyLight, color: "red" }}>
                        {formik.errors.termsOfServiceAccepted}
                      </p>
                    )}
                  <Checkbox
                    name="privacyPolicyAccepted"
                    checked={formik.values.privacyPolicyAccepted}
                    onChange={formik.handleChange}
                    style={{
                      fontFamily: fontFamilyLight,
                      fontSize: "13px",
                    }}
                  >
                    {t("Vous accepter la politique de confidentialité")}
                  </Checkbox>
                  {formik.touched.privacyPolicyAccepted &&
                    formik.errors.privacyPolicyAccepted && (
                      <p style={{ fontFamily: fontFamilyLight, color: "red" }}>
                        {formik.errors.privacyPolicyAccepted}
                      </p>
                    )}
                  <Divider />
                  <p style={{ fontFamily: fontFamilyLight }}>
                    {t("Confirmer le mot de passe *")}
                  </p>
                  <Input.Password
                    name="confirmedPassword"
                    allowClear
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmedPassword}
                    style={{
                      fontFamily: fontFamilyLight,
                      border: "1px solid black",
                    }}
                  />
                  {formik.touched.confirmedPassword &&
                    formik.errors.confirmedPassword && (
                      <p style={{ fontFamily: fontFamilyLight, color: "red" }}>
                        {formik.errors.confirmedPassword}
                      </p>
                    )}
                  <PolitiqueSecurite style={{ fontFamily: fontFamilyLight }} />
                </Modal>
              </ConfigProvider>
              {/* Button to submit the form */}

              <br></br>
              <Divider
                style={{
                  fontFamily: fontFamilyLight,
                }}
              >
                {t("Ou")}
              </Divider>
              <Link to="/beom/account/log-in">
                <Button
                  className={style.submitButton}
                  size="large"
                  style={{ fontFamily: fontFamilyLight }}
                >
                  {t("Se connecter")}
                </Button>
              </Link>
            </div>
          </Form>
        </section>
      </main>

      <RightContent />
    </main>
  );
};

export default SignUpPage;
