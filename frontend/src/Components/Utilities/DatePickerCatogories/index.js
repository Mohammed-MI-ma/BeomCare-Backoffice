import React from "react";
import { ConfigProvider, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const weekFormat = "MM/DD";
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;
const DatePickerCatogories = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#001529",
        },
      }}
    >
      <DatePicker
        defaultValue={dayjs()}
        format={customWeekStartEndFormat}
        picker="week"
      />
    </ConfigProvider>
  );
};

export default DatePickerCatogories;
