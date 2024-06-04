import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

import useFontFamily from "../../../Utilities/useFontFamily";

import { Alert, Avatar, Button, Divider, Input, message } from "antd";
import { TagOutlined } from "@ant-design/icons";

import { Label } from "../../Utilities/Label";
import AnimatesIcon from "../../Utilities/AnimatedIcon";
import style from "./CategoryDetails.module.css";
import CenteredFlexComponent from "../../Utilities/CenteredFlexComponent";
//__users Icons
import users30x30 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_low.webp";
import users60x60 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_medium.webp";
import users120x120 from "../../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_high.webp";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const CategoryDetails = ({ onSave, flag }) => {
  const navigate = useNavigate();
  //__fonts
  const fontFamilyMedium = useFontFamily("Medium");
  const fontFamilyExtraLight = useFontFamily("ExtraLight");
  const access_Token = useSelector((state) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);
  //__hooks
  const { t } = useTranslation();
  const specificObject = useSelector(
    (state) => state.category.newEmptyCategory
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    comment: "",
  });

  useEffect(() => {
    setNewCategory({
      name: specificObject?.name,
      description: specificObject?.description,
      image1: specificObject?.image1,
      image2: specificObject?.image2,
      image3: specificObject?.image3,
      image4: specificObject?.image4,
      comment: specificObject?.comment,
    });
  }, [specificObject]);

  useEffect(() => {
    const isValid =
      newCategory?.name &&
      newCategory?.description &&
      newCategory?.comment &&
      newCategory?.image1 &&
      newCategory?.image2 &&
      newCategory?.image2 &&
      newCategory?.image4;
    setIsFormValid(isValid);
  }, [newCategory]);

  //__handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];

    if (file && file.size / 1024 > 50) {
      message.error(`La taille du fichier dépasse la limite maximale de 50 Ko`);
      e.target.value = null;
      return;
    }
    setNewCategory({
      ...newCategory,
      [fieldName]: file,
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", newCategory.name);
      formData.append("description", newCategory.description);
      formData.append("comment", newCategory.comment);
      Object.entries(newCategory).forEach(([key, value]) => {
        if (key.startsWith("image") && value) {
          formData.append(key, value);
        }
      });

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_Token}`,
          },
        }
      );

      console.log("Upload successful", response.data);
      setNewCategory({
        ...newCategory,
        comment: "",
      });
      setIsLoading(false);
      onSave(response.data);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      message.error(error.response?.data?.message);
      navigate("/");
      console.error("Upload failed", error);
    }
  };
  const inputs = [
    {
      label: (
        <>
          {t("Icône basse résolution (x1)")}
          <RedStar />
        </>
      ),
      iconSize: 10,
      fieldName: "image1",
    },
    {
      label: (
        <>
          {t("Icône moyenne résolution (x2)")}
          <RedStar />
        </>
      ),
      iconSize: 15,
      fieldName: "image2",
    },
    {
      label: (
        <>
          {t("Icône haute résolution (x3)")}
          <RedStar />
        </>
      ),
      iconSize: 20,
      fieldName: "image3",
    },
    // Add more inputs as needed
  ];
  return (
    <>
      <Label>
        {t("Nom")} <RedStar />
      </Label>
      <Input
        disabled
        name="name"
        style={{ fontFamily: fontFamilyMedium }}
        value={newCategory.name}
        onChange={handleChange}
      />
      &nbsp;
      <Alert
        message={
          <h2
            style={{
              fontFamily: fontFamilyMedium,
              fontSize: "var(--font-tiny-size)",
            }}
          >
            {t("Le Pouvoir d'une Description Captivante")}
          </h2>
        }
        showIcon
        type="info"
        closable
        description={
          <p
            style={{
              fontFamily: fontFamilyExtraLight,
              fontSize: "var(--font-tiny-size)",
            }}
          >
            Une description bien élaborée est essentielle pour capturer
            l'attention des clients, servant de porte d'entrée à l'engagement et
            à la conversion
          </p>
        }
      />
      <div className={`flex flex-col gap-5 mt-5 shadow-lg ${style.coloredBox}`}>
        <Label>
          {t("Description")}
          <RedStar />
        </Label>
        <TextArea
          name="description"
          rows={4}
          allowClear
          value={newCategory.description}
          style={{ fontFamily: fontFamilyMedium }}
          onChange={handleChange}
        />
      </div>
      <Divider
        style={{
          fontFamily: fontFamilyMedium,
          marginTop: "var(--spacing-medium)",
        }}
      >
        {t("Icônes")}
      </Divider>
      <CustomAlert
        title={
          <h2
            style={{
              fontFamily: fontFamilyMedium,
              fontSize: "var(--font-tiny-size)",
            }}
          >
            {t(
              "Maximiser l'Expérience Visuelle: Pourquoi Trois Icônes sont Essentielles pour la Fonctionnalité d'Images Adaptatives"
            )}
          </h2>
        }
        body={
          <>
            <p
              style={{
                fontFamily: fontFamilyExtraLight,
                fontSize: "var(--font-tiny-size)",
              }}
            >
              {t(
                "En proposant plusieurs résolutions d'images, nous garantissons des visuels nets et clairs quel que soit l'appareil de l'utilisateur"
              )}
            </p>
            &nbsp;
            <CenteredFlexComponent className="gap-2">
              {avatars.map((avatar, index) => (
                <AvatarDisplay
                  key={index}
                  src={avatar.src}
                  label={avatar.label}
                />
              ))}
            </CenteredFlexComponent>
          </>
        }
      />
      <div className={`flex flex-col gap-5 mt-5 shadow-lg ${style.coloredBox}`}>
        {inputs.map((input, index) => (
          <div key={index}>
            <FileInput {...input} onChange={handleFileChange} />
          </div>
        ))}
      </div>
      <Divider
        style={{
          fontFamily: fontFamilyMedium,
          marginTop: "var(--spacing-medium)",
        }}
      >
        {t("Photo de couverture")}
      </Divider>
      <Label>
        {t("Couverture")}
        <RedStar />
      </Label>
      <input
        name="image4"
        className="flex w-full rounded-md border border-input bg-background p-2  text-sm shadow-sm transition-colors file:border-0 file:bg-customBlue file:rounded  file:text-foreground file:text-sm file:font-medium file:text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        id="file_input"
        style={{ fontFamily: fontFamilyExtraLight }}
        type="file"
        onChange={(info) => handleFileChange(info, "image4")}
        accept="image/webp,image/png" // Accepts only WebP and PNG image files
      />
      <Divider
        style={{
          fontFamily: fontFamilyMedium,
          marginTop: "var(--spacing-medium)",
        }}
      >
        {t("Extra")}
      </Divider>
      <div className={`flex flex-col gap-5 mt-5 shadow-lg ${style.coloredBox}`}>
        <Label>
          {t("Commentaire")}
          <RedStar />
        </Label>
        <TextArea
          placeholder="Rédigez de bons commentaires afin que la recherche de cette catégorie particulière soit simple et directe."
          name="comment"
          rows={4}
          allowClear
          value={newCategory.comment}
          style={{ fontFamily: fontFamilyMedium }}
          onChange={handleChange}
        />
      </div>
      <Button
        onClick={handleSave}
        disabled={!isFormValid}
        loading={isLoading}
        className="w-full mt-20 "
        type="primary"
        style={{
          fontFamily: fontFamilyMedium,
          background: "#1677ff",
          color: "white",
        }}
      >
        {flag !== 1 ? <>Mettre a jour catégorie</> : <>Ajouter la catégorie</>}
      </Button>
    </>
  );
};

export default CategoryDetails;

//__CustomAlert
export const CustomAlert = ({ title, body, ...rest }) => {
  //__fonts
  const fontFamilyMedium = useFontFamily("Medium");
  const fontFamilyExtraLight = useFontFamily("ExtraLight");

  return (
    <Alert
      message={
        <p
          style={{
            fontFamily: fontFamilyMedium,
            fontSize: "var(--font-small-size)",
          }}
        >
          {title}
        </p>
      }
      showIcon
      type="info"
      closable
      description={
        <p
          style={{
            fontFamily: fontFamilyExtraLight,
            fontSize: "var(--font-small-size)",
          }}
        >
          {body}
        </p>
      }
      {...rest}
    />
  );
};
CustomAlert.defaultProps = {
  title: "Default Title",
  body: "Default Body",
};
CustomAlert.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

//__FileInput
export const FileInput = ({ label, iconSize, fieldName, onChange }) => {
  const fontFamilyExtraLight = useFontFamily("ExtraLight");
  return (
    <div>
      <div className="flex justify-content items-center gap-2">
        <div style={{ width: "fit-content" }}>
          <AnimatesIcon
            icon={<TagOutlined style={{ fontSize: `${iconSize}px` }} />}
            animation={"tada"}
          />
        </div>
        <Label>{label}</Label>
      </div>

      <input
        name={fieldName}
        className="flex w-full rounded-md border border-input bg-background p-2  text-sm shadow-sm transition-colors file:border-0 file:bg-customBlue file:rounded  file:text-foreground file:text-sm file:font-medium file:text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        id="file_input"
        style={{ fontFamily: fontFamilyExtraLight }}
        type="file"
        onChange={(info) => onChange(info, fieldName)}
        accept="image/webp,image/png" // Accepts only WebP and PNG image files
      />
    </div>
  );
};
FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
//__AvatarDisplay
const avatars = [
  { src: users30x30, label: "x1" },
  { src: users60x60, label: "x2" },
  { src: users120x120, label: "x3" },
];
const AvatarDisplay = ({ src, label }) => {
  return (
    <div className="flex flex-col justify-center items-center shadow-lg">
      <Avatar
        src={<img src={src} alt="avatar" />}
        style={{ border: "1px solid white", background: "white" }}
      />
      {label}
    </div>
  );
};
AvatarDisplay.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const RedStar = () => {
  return <span style={{ color: "red" }}>*</span>;
};
