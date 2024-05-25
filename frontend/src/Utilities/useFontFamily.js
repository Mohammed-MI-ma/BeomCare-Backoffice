import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const fontFamilies = {
  fr: {
    ExtraLight: "Primary-ExtraLight",
    Light: "Primary-Light",
    Regular: "Primary-Regular",
    SemiBold: "Primary-SemiBold",
    Medium: "Primary-Medium",
  },

  ar: {
    Light: "Primary-Light_ar",
    Regular: "Primary-Regular_ar",
    SemiBold: "Primary-SemiBold_ar",
    Medium: "Primary-Medium_ar",
  },
  // Add more languages and font weights as needed
};

const useFontFamily = (fontWeight = "regular") => {
  const [fontFamily, setFontFamily] = useState("");
  const language = useSelector((state) => state.application.language);

  useEffect(() => {
    if (!language || !fontFamilies[language]) {
      console.error("Invalid language:", language);
      return;
    }

    const selectedFontFamily =
      fontFamilies[language][fontWeight] || fontFamilies[language]["Regular"];
    setFontFamily(selectedFontFamily);
  }, [fontWeight, language]);

  return fontFamily;
};

export default useFontFamily;
