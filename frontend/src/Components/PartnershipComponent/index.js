import React from "react";
import { CustomDivider } from "../../Pages/LoginPage";
import useFontFamily from "../../Utilities/useFontFamily";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import CenteredFlexComponent from "../Utilities/CenteredFlexComponent";
import {
  ActionButton,
  AddInstituteButton,
} from "../NavigationBar/NavbarActionsButtons";
import ResponsiveIcon from "../Utilities/ResponsiveIcon";
//__users Icons
import users43x43 from "../../Assets/images/BeomPartner/streamline_information-desk-customer/streamline_information-desk-customer_low.png";
import users85x85 from "../../Assets/images/BeomPartner/streamline_information-desk-customer/streamline_information-desk-customer_medium.png";
import users170x170 from "../../Assets/images/BeomPartner/streamline_information-desk-customer/streamline_information-desk-customer_high.png";
//__laptop Icons
import laptop55x55 from "../../Assets/images/BeomPartner/ph_laptop-thin/ph_laptop-thin_low.png";
import laptop109x109 from "../../Assets/images/BeomPartner/ph_laptop-thin/ph_laptop-thin_medium.png";
import laptop217x217 from "../../Assets/images/BeomPartner/ph_laptop-thin/ph_laptop-thin_high.png";
//__notes Icons
import notes39x39 from "../../Assets/images/BeomPartner/grommet-icons_plan/grommet-icons_plan_low.png";
import notes77x77 from "../../Assets/images/BeomPartner/grommet-icons_plan/grommet-icons_plan_medium.png";
import notes153x153 from "../../Assets/images/BeomPartner/grommet-icons_plan/grommet-icons_plan_high.png";
import MembershipCard from "./MembershipCard";

const iconImages_users = [
  { src: users43x43, width: 43 },
  { src: users85x85, width: 85, default: true },
  { src: users170x170, width: 170 },
];
const iconImages_laptop = [
  { src: laptop55x55, width: 55 },
  { src: laptop109x109, width: 109, default: true },
  { src: laptop217x217, width: 217 },
];
const iconImages_notes = [
  { src: notes39x39, width: 39 },
  { src: notes77x77, width: 77, default: true },
  { src: notes153x153, width: 153 },
];
const guide = [
  {
    id: 1,
    icon: <ResponsiveIcon alt="Example Icon" images={iconImages_users} />,
    description:
      "Rencontrez des nouveaux clients à la recherche de prestations beauté et bien-être en ligne",
  },
  {
    id: 2,
    icon: <ResponsiveIcon alt="Example Icon" images={iconImages_laptop} />,
    description:
      "Profitez de notre solution tout-en-un pour faciliter la gestion et le développement de votre activité",
  },
  {
    id: 3,
    icon: <ResponsiveIcon alt="Example Icon" images={iconImages_notes} />,
    description:
      "Bénéficiez de nos conseils personnalisés et adaptés à vos besoins",
  },
];
const PartnershipComponent = () => {
  const fontFamilyLight = useFontFamily("Light");

  const { t } = useTranslation();

  return (
    <section
      className="bg-cover relative mb-5  flex items-center justify-center flex-col-reverse lg:flex-row items-center w-full"
      style={{
        width: "99vw",
      }}
    >
      <div
        className="container p-5 flex flex-col items-center gap-3"
        style={{
          textAlign: "center",
          maxWidth: "900px",
          textTransform: "uppercase",
          marginTop: "70px",
          marginBottom: "70px",
        }}
      >
        <CustomDivider style={{ marginBottom: "10px" }} />
        <h1
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "20px",
            letterSpacing: "0.13em",
          }}
        >
          {t("Ensemble, faisons briller votre salon")}
        </h1>
        <h3
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "10px",
            letterSpacing: "0.13em",
          }}
        >
          {t(
            "Découvrez comment commencer à travailler en beauté avec BEOM CARE"
          )}
        </h3>
        <MembershipGrid guide={guide} />

        <ActionButton
          style={{
            color: "var(--color-accent)",
            fontFamily: fontFamilyLight,
            backgroundColor: "var(--color-primary)",
            padding: "10px",
          }}
          to={AddInstituteButton.path}
        >
          {AddInstituteButton.label}
        </ActionButton>
      </div>
    </section>
  );
};

export default PartnershipComponent;

const MembershipGrid = ({ guide }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
    {guide.map((step) => (
      <MembershipCard key={step.id} step={step} />
    ))}
  </div>
);
