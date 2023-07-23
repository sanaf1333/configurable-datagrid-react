import React from "react";
import { Button, Input, Row, Col, Select, Form } from "antd";
import { ConfigurationModalFormComponentProps } from "../types/configuration-modal-form-type";
import '../styles/configurable-datagrid-widget.css';

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
      <Row justify="center" align="middle" className="configurationRow">
        <Col span={24}>
          <span className="APIURLText"> <span className="requiredMark">*&nbsp;</span>Enter API URL </span>
        </Col>
        <Col span={24}>
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
            className="addColumnButton"
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
              label={<span className="titleLabel">Title</span>}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              className="configurationRow"
            >
              <Select
                placeholder={<span className="selectTitle">Select title</span>}
                className="select"
                options={selectOptions}
                onChange={(value) => setTitle(value)}
              />
            </Form.Item>
            <Form.Item
              label={<span className="titleLabel">Subtitle</span>}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              className="configurationRow"
            >
              <Select
                placeholder={<span className="selectTitle">Select subtitle</span>}
                className="select"
                options={selectOptions}
                onChange={(value) => setSubtitle(value)}
              />
            </Form.Item>
          </Form>
          <Col span={24}>
            <Button
              type="primary"
              onClick={handleSetConfigurations}
              className="addColumnButton"
            >
              Set Configurations
            </Button>
          </Col>
        </>
      )}
    </>
  );
};

export default ConfigurationModalFormComponent;
