import React from "react";
import { Tooltip } from "antd";

interface tooltipsProps {
  value: string;
}

const Tooltips: React.FC<tooltipsProps> = ({ value }) => {
  let title = "";

  switch (value) {
    case "Label":
      title = "It will be displayed as column header.";
      break;
    case "Type":
      title = "It will be used to match data type for columns.";
      break;
    case "Key":
      title = "It will be used as JSONPath for parsing data.";
      break;
    case "Enter API URL":
      title = "Enter the API Endpoint from which you want to fetch data.";
      break;
    case "Title":
      title =
        "It will be used as title for small screen. 1st label is used as title by default.";
      break;
    case "Subtitle":
      title =
        "It will be used as subtitle for small screen. 2nd label is used as subtitle by default.";
      break;

    default:
      title = "Default Title"; // Set a default title in case none of the cases match
      break;
  }

  return (
    <Tooltip title={title}>
      <span>{value}</span>
    </Tooltip>
  );
};

export default Tooltips;
