import React from "react";
import { Col, Row, Button, Form, Input, Select } from "antd";
const { Option } = Select;
import { dataArray } from "../types/data-array";
interface ColumnsFormProps{
    columnId: number;
    onDeleteColumn: (id: number) => void;
}

const ColumnsForm: React.FC<ColumnsFormProps> = ({ columnId, onDeleteColumn }) => {
  const [form] = Form.useForm();
  const columnData: dataArray = { columnId, label: "", type: "", key: "" };
  const onReset = () => {
    form.resetFields();
  };
  const handleDelete = () => {
    onDeleteColumn(columnId);
  };

  const handleLabelChange = (label: string) =>{
    columnData.label=label;
  }
  const handleTypeChange = (type: string) =>{
    columnData.type=type;
  }
  const handleKeyChange = (key: string) =>{
    columnData.key=key;
  }
  return (
    <Form form={form} name="control-hooks" layout="horizontal">
      <Row gutter={16} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="label" label="Label" rules={[{ required: true }]}>
            <Input onChange={(e) => handleLabelChange(e.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input onChange={(e) => handleTypeChange(e.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item name="key" label="Key" rules={[{ required: true }]}>
            <Input onChange={(e) => handleKeyChange(e.target.value)} />
          </Form.Item>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Button block htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2}>
          <Button block htmlType="button" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
        
      </Row>
      
    </Form>
  );
};

export default ColumnsForm;
