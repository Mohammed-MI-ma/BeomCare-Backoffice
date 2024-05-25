import React from "react";
import HomePage from "../HomePage";
import { Avatar, Button, ConfigProvider, List } from "antd";
import useFontFamily from "../../Utilities/useFontFamily";
import CenteredFlexComponent from "../../Components/Utilities/CenteredFlexComponent";
import ResponsiveIcon from "../../Components/Utilities/ResponsiveIcon";

//__users Icons
import users30x30 from "../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_low.webp";
import users60x60 from "../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_medium.webp";
import users120x120 from "../../Assets/images/BeomPartner/mage_notification-bell/mage_notification-bell_high.webp";
//__Settings Icons
import settings30x30 from "../../Assets/images/BeomPartner/settings-icon/iconamoon_settings-thin_small.png";
import settings60x60 from "../../Assets/images/BeomPartner/settings-icon/iconamoon_settings-thin_medium.png";
import settings120x120 from "../../Assets/images/BeomPartner/settings-icon/iconamoon_settings-thin_medium_large.png";

const iconBell = [
  { src: users30x30, width: 30 },
  { src: users60x60, width: 60, default: true },
  { src: users120x120, width: 120 },
];
const iconSettings = [
  { src: settings30x30, width: 30 },
  { src: settings60x60, width: 60, default: true },
  { src: settings120x120, width: 120 },
];

const EditorPage = () => {
  return <HomePage mainContent={<EditorContent />} />;
};

export default EditorPage;
const EditorContent = () => {
  const fontFamilyMedium = useFontFamily("ExtraLight");
  const fontFamilySemiBold = useFontFamily("SemiBold");

  const data = [];
  return (
    <ConfigProvider
      theme={{
        components: {
          List: {
            itemPadding: 20,
          },
        },
      }}
    >
      <div
        className="flex gap-10 flex-col w-full"
        style={{ overflow: "hidden" }}
      >
        <div className="w-full flex justify-between align-center">
          <h1
            style={{
              fontFamily: fontFamilySemiBold,
              fontSize: "20px",
            }}
          >
            Liste des Catégories{" "}
          </h1>
          <Button
            style={{
              fontFamily: fontFamilyMedium,
              background: "black",
              borderRadius: "10px",
            }}
          >
            Ajouter catégorie{" "}
          </Button>
        </div>
        <div className="w-full">
          <div id="pornp">
            <List
              itemLayout="horizontal"
              bordered
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <CenteredFlexComponent>
                    <Button
                      type="default"
                      shape="circle"
                      style={{
                        fontFamily: fontFamilyMedium,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        size={"default"}
                        style={{
                          fontFamily: fontFamilyMedium,
                          background: "#F0EFEF",
                        }}
                      >
                        <ResponsiveIcon alt="Bell icon" images={iconBell} />
                      </Avatar>{" "}
                    </Button>

                    <Button
                      type="default"
                      shape="circle"
                      style={{
                        fontFamily: fontFamilyMedium,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        size={"default"}
                        style={{
                          fontFamily: fontFamilyMedium,
                          background: "#F0EFEF",
                        }}
                      >
                        <ResponsiveIcon
                          alt="Settings icon"
                          images={iconSettings}
                        />
                      </Avatar>
                    </Button>
                  </CenteredFlexComponent>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
