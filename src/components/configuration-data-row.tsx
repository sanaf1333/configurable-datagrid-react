import React from "react";
import { Col, Row, Button, Form, Input, Select } from "antd";
import { ConfigurationDataRowComponentProps } from "../types/configuration-data-row-type";
import { dataTypes } from "../utils/data-types";
import Tooltips from "../utils/tooltip";
import "../styles/configurable-datagrid-widget.css";

const ConfigurationDataRowComponent: React.FC<
  ConfigurationDataRowComponentProps
> = ({
  columnId,
  form,
  handleLabelChange,
  handleTypeChange,
  handleKeyChange,
  onReset,
  handleDelete,
}) => {
  return (
    <Form
      form={form}
      name={`configuration-form${columnId}`}
      layout="horizontal"
    >
      <Row gutter={16} justify="center" className="configurationRow">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="label" label={<Tooltips value="Label" />} rules={[{ required: true }]}>
            <Input
              placeholder="Label"
              onChange={(e) => handleLabelChange(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="key" label={<Tooltips value="Key" />} rules={[{ required: true }]}>
            <Input
              placeholder="Key"
              onChange={(e) => handleKeyChange(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="type" label={<Tooltips value="Type" />} rules={[{ required: true }]}>
            <Select
              onChange={(value) => handleTypeChange(value)}
              placeholder={
                <span className="selectTitle">
                  Data type
                </span>
              }
            >
              {dataTypes.map((dataType) => (
                <Select.Option key={dataType} value={dataType}>
                  {dataType}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Button
            block
            htmlType="button"
            onClick={onReset}
            className="resetButton"
          >
            Reset
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Button
            block
            htmlType="button"
            onClick={handleDelete}
            className="deleteButton"
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ConfigurationDataRowComponent;
