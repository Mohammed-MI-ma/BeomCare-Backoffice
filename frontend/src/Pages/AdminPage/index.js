import React, { useEffect } from "react";
import HomePage from "../HomePage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePickerCatogories from "../../Components/Utilities/DatePickerCatogories";
import useFontFamily from "../../Utilities/useFontFamily";
import TablePartners from "../../Components/Utilities/TablePartners";
const AdminPage = () => {
  const roleSelected = useSelector((state) => state.auth.userInfo?.mission);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin, and redirect if necessary
    if (roleSelected.role === "admin") {
      navigate("/beom/editorPage");
    }
  }, [roleSelected, navigate]);
  return <HomePage mainContent={<AdminContent />} />;
};

export default AdminPage;
const AdminContent = () => {
  const fontFamilyBold = useFontFamily("SemiBold");
  const fontFamilyMedium = useFontFamily("Medium");

  return (
    <div className="flex gap-10 flex-col" style={{ overflow: "hidden" }}>
      <div>
        <DatePickerCatogories />
      </div>
      <div>
        <h1 style={{ fontFamily: fontFamilyBold, fontSize: "20px" }}>
          Liste des Partenaires{" "}
        </h1>
        <h3 style={{ fontFamily: fontFamilyMedium, fontSize: "13px" }}>
          Affichez, ajoutez, modifiez et supprimez les informations concernant
          vos clients.
        </h3>
      </div>

      <TablePartners />
    </div>
  );
};
