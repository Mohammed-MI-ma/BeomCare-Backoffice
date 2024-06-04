import React, { useCallback, useEffect, useMemo } from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import useFontFamily from "../../Utilities/useFontFamily";
import { searchCategoryMeiliSearch } from "../../Reducers/applicationService/actions/category/categoryActions";
import { setIsAllowedToAddNewCategory } from "../../Reducers/applicationService/actions/category/categorySlice";

const CategorySearchEngine = ({ searchTerm, setSearchTerm }) => {
  const access_Token = useSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const fontFamilyLight = useFontFamily("SemiBold");

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      dispatch(
        searchCategoryMeiliSearch({ query: value, token: access_Token })
      );
    },
    [dispatch, setSearchTerm]
  );

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setIsAllowedToAddNewCategory(false));
    } else {
      dispatch(setIsAllowedToAddNewCategory(true));
    }
  }, [dispatch, searchTerm]); // searchTerm est une dépendance de l'effet useEffect

  const memoizedTranslations = useMemo(() => {
    return {
      placeholder: t("Rechercher une catégorie par nom, description"),
      poweredByMeiliSearch: t("poweredByMeiliSearch"),
    };
  }, [t]);
  return (
    <section className={"w-full"}>
      <Input
        allowClear
        placeholder={memoizedTranslations.placeholder}
        style={{
          fontFamily: fontFamilyLight,
        }}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchTerm}
      />
    </section>
  );
};

export default CategorySearchEngine;
