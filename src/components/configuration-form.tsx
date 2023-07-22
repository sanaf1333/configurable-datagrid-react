import React from "react";
import { Collapse } from "antd";
import ColumnsForm from "./form";
import AddColumns from "./add-column";
const ConfigurationForm = () => {
  return (
    <div>
      <Collapse
        size="large"
        items={[
          {
            key: "1",
            label: "This is large size panel header",
            children: <AddColumns />,
          },
        ]}
      />
    </div>
  );
};

export default ConfigurationForm;
