import React, {useState} from "react";
import { Col, Row, Button, Form, Input, Select } from "antd";
import { dataArray } from "../types/data-array";

const { Option } = Select;


interface ColumnsFormProps {
  columnId: number;
  onDeleteColumn: (id: number) => void;
  onChangeColumn: (value: dataArray) => void;
}

const ColumnsForm: React.FC<ColumnsFormProps> = ({
  columnId,
  onDeleteColumn,
  onChangeColumn,
}) => {
  const [form] = Form.useForm();
  const [label, setLabel]= useState("");
  const [type, setType]= useState("");
  const [key, setKey]= useState("");
  const onReset = () => {
    form.resetFields();
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
