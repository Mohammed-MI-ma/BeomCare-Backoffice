import { Alert, Button, ConfigProvider, List, Tabs } from "antd";
import React, { useState } from "react";
import CategorySearchEngine from "../CategorySearchEngine";
import useFontFamily from "../../Utilities/useFontFamily";
import {
  DislikeOutlined,
  AlertOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AnimatesIcon from "../Utilities/AnimatedIcon";
import { searchCategoryMeiliSearch } from "../../Reducers/applicationService/actions/category/categoryActions";
import CategoryAddDrawer from "./CategoryAddDrawer";
import { setNewCategoryName } from "../../Reducers/applicationService/actions/category/categorySlice";

const CategoryManager = () => {
  const fontFamilyLight = useFontFamily("Light");
  const fontFamilyBold = useFontFamily("SemiBold");
  const access_Token = useSelector((state) => state.auth.accessToken);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const allowedToAddNewCategory = useSelector(
    (state) => state.category.isAllowedToAddNewCategory
  );
  const { data } = useSelector((state) => state.category.categories);
  const { name } = useSelector((state) => state.category.newEmptyCategory);

  const { t } = useTranslation();

  const items = [
    {
      key: "1",
      label: (
        <h1
          style={{
            fontFamily: fontFamilyLight,
          }}
        >
          {t("Recherche")}
        </h1>
      ),
      children: (
        <div
          className={"flex-col w-full gap-10 overflow-auto justify-start p-5 "}
        >
          <List
            pagination={{
              position: "bottom",
              align: "center",
              pageSize: 3,
            }}
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <h1
                      style={{
                        fontFamily: fontFamilyLight,
                      }}
                    >
                      {item?.name}
                    </h1>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
  ]; //____ADD
  const [childrenDrawerNewCategory, setChildrenDrawerNewCategory] =
    useState(false); //Handler For showing drawer add new product
  const showChildrenDrawerNewCategory = (e) => {
    window.history.replaceState(null, "", `/beom/editorPage/addCategory/`);
    setChildrenDrawerNewCategory(true);
  };

  //Handler For hiding drawer add new product
  const onChildrenDrawerNewCategoryClose = () => {
    window.history.replaceState(null, "", `/beom/editorPage`);
    setChildrenDrawerNewCategory(false);
  };
  const handleClearSearch = () => setSearchTerm("");

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "none",
          hoverBorderColor: "#1d3034",
        },
      }}
    >
      <div className={"h-full flex-col "}>
        <div className={"flex items-center justify-center flex-col gap-3"}>
          <div
            className={"flex items-start justify-center flex-row gap-3"}
            style={{
              fontFamily: fontFamilyLight,
            }}
          >
            <Alert
              message={
                <p
                  style={{
                    fontFamily: fontFamilyLight,
                    fontSize: "var(--font-tiny-size)",
                  }}
                >
                  <AlertOutlined />
                  &nbsp; Rappel: Pour des raisons de sécurité, nous vous
                  recommandons fortement de rechercher la catégorie avant de
                  l'insérer dans le système afin d'éviter des problèmes de
                  conflits.
                </p>
              }
              type="warning"
              closable
            />
          </div>
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <CategorySearchEngine
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Button
              type="link"
              onClick={() => {
                if (allowedToAddNewCategory && data?.length === 0) {
                  dispatch(setNewCategoryName(searchTerm));
                  showChildrenDrawerNewCategory();
                  handleClearSearch();
                  dispatch(
                    searchCategoryMeiliSearch({
                      query: "",
                      token: access_Token,
                    })
                  );
                } else {
                }
              }}
              icon={
                allowedToAddNewCategory && data?.length === 0 ? (
                  <AnimatesIcon
                    icon={
                      <LikeOutlined
                        style={{ color: "black", fontSize: "20px" }}
                      />
                    }
                  />
                ) : (
                  <AnimatesIcon
                    icon={
                      <DislikeOutlined
                        style={{
                          color: "black",
                          fontSize: "20px",
                          cursor: "not-allowed",
                        }}
                      />
                    }
                  />
                )
              }
              style={{
                fontFamily: fontFamilyLight,
                fontSize: "20px",
              }}
            />
          </div>
          <div className="flex-grow w-full ">
            <Tabs defaultActiveKey={1} items={items} />
          </div>
        </div>
      </div>
      <CategoryAddDrawer
        title={
          <h1 style={{ fontFamily: fontFamilyLight }}>
            {t("Renseigner plus d'informations sur") + ": "}
            <b style={{ fontFamily: fontFamilyBold }}>{name}</b>
          </h1>
        }
        open={childrenDrawerNewCategory}
        onClose={onChildrenDrawerNewCategoryClose}
      />
    </ConfigProvider>
  );
};

export default CategoryManager;
