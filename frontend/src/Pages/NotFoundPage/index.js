// NotFoundPage.js

import React from "react";
import { Result } from "antd";
const NotFoundPage = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Désolé, la page que vous avez visitée n'existe pas"
      />
    </div>
  );
};

export default NotFoundPage;
