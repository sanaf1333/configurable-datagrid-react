import React from "react";
import { Col, Row, Button, Form, Input, Select } from "antd";
import { ConfigurationDataRowComponentProps } from "../types/configuration-data-row-type";
import { dataTypes } from "../utils/data-types";
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
      <Row gutter={16} justify="center" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="label" label="Label" rules={[{ required: true }]}>
            <Input placeholder="Label" onChange={(e) => handleLabelChange(e.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="key" label="Key" rules={[{ required: true }]}>
            <Input placeholder="Key" onChange={(e) => handleKeyChange(e.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select
              onChange={(value) => handleTypeChange(value)}
              placeholder={<span style={{display: "flex", justifyContent: "left"}}>Data type</span>}
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
            style={{ backgroundColor: "gray" }}
          >
            Reset
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Button
            block
            htmlType="button"
            onClick={handleDelete}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ConfigurationDataRowComponent;
