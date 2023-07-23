import React, { useState } from "react";
import { Form } from "antd";
import { dataArray } from "../types/data-array";
import ConfigurationDataRowComponent from "../components/configuration-data-row";
import { ConfigurationDataRowProps } from "../types/configuration-data-row-type";

const ConfigurationDataRow: React.FC<ConfigurationDataRowProps> = ({
  columnId,
  onDeleteColumn,
  onChangeColumn,
  setDisplayTable,
}) => {
  const [form] = Form.useForm();
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [key, setKey] = useState("");
  const onReset = () => {
    setDisplayTable(false);
    form.resetFields();
    setLabel("");
    setType("");
    setKey("");
    onChangeColumn({ columnId, label: "", type: "value", key: "" });
  };
  const handleDelete = () => {
    onDeleteColumn(columnId);
  };

  const handleLabelChange = (value: string) => {
    setLabel(value);
    onChangeColumn({ columnId, label: value, type, key });
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    onChangeColumn({ columnId, label, type: value, key });
  };

  const handleKeyChange = (value: string) => {
    setKey(value);
    onChangeColumn({ columnId, label, type, key: value });
  };

  return (
    <ConfigurationDataRowComponent
      columnId={columnId}
      handleLabelChange={handleLabelChange}
      handleTypeChange={handleTypeChange}
      handleKeyChange={handleKeyChange}
      handleDelete={handleDelete}
      form={form}
      onReset={onReset}
    />
  );
};

export default ConfigurationDataRow;
