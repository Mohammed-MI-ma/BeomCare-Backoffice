import useFontFamily from "../../../Utilities/useFontFamily";

export const Label = ({ children }) => {
  const fontFamilyLight = useFontFamily("Medium");

  return (
    <p
      style={{
        textAlign: "left",
        width: "100%",
        fontSize: "var(--font-small-size)",

        fontFamily: fontFamilyLight,
      }}
    >
      {children}
    </p>
  );
};
