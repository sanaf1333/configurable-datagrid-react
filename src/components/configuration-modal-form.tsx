import React from "react";
import { Button, Input, Row, Col, Select, Form } from "antd";
import { ConfigurationModalFormComponentProps } from "../types/configuration-modal-form-type";

const ConfigurationModalFormComponent: React.FC<
  ConfigurationModalFormComponentProps
> = ({
  setTitle,
  setSubtitle,
  setApiURL,
  handleAddColumn,
  renderConfigurationRows,
  columnKeys,
  selectOptions,
  handleSetConfigurations,
}) => {
  return (
    <>
      <Row justify="center" align="middle" style={{ marginBottom: "10px" }}>
        <Col span={8}>
          <span> * Enter API URL: </span>
        </Col>
        <Col span={16}>
          <Input
            placeholder="API URL"
            required
            onChange={(e) => setApiURL(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={handleAddColumn}
            style={{ marginBottom: "10px", width: "100%" }}
          >
            Add Column
          </Button>
        </Col>
      </Row>
      {renderConfigurationRows()}

      {columnKeys.length > 0 && (
        <>
          <Form layout="vertical">
            <Form.Item
              label="Title"
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              style={{ marginBottom: "10px" }}
            >
              <Select
                placeholder="Select Title"
                style={{ width: "100%" }}
                options={selectOptions}
                onChange={(value) => setTitle(value)}
              />
            </Form.Item>
            <Form.Item
              label="Subtitle"
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              style={{ marginBottom: "10px" }}
            >
              <Select
                placeholder="Select Subtitle"
                style={{ width: "100%" }}
                options={selectOptions}
                onChange={(value) => setSubtitle(value)}
              />
            </Form.Item>
          </Form>
        <Col span={24}>
          <Button type="primary" onClick={handleSetConfigurations} style={{width: "100%"}}>
            Set Configurations
          </Button>
          </Col>
        </>
      )}
    </>
  );
};

export default ConfigurationModalFormComponent;
