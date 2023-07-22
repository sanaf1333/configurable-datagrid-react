import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Row,
  Col,
  Select,
  Alert,
  notification,
} from "antd";

import ColumnsForm from "./form";
import { dataArray } from "../types/data-array";
import FetchAPIData from "../services/fetch-API-data";

interface AddColumnsProps{
    setFetchedData: (data: Record<string, any[]>)=> void;
    setConfigurationData: (data: dataArray[])=> void;
    setTitle: (value: string)=> void;
    setSubtitle: (value: string)=> void;
    setDisplayTable: (value: boolean)=> void;
}

const AddColumns: React.FC<AddColumnsProps> = ({setFetchedData, setConfigurationData, setTitle, setSubtitle, setDisplayTable}) => {
  const [columnId, setColumnId] = useState(0);
  const [columnKeys, setColumnKeys] = useState<number[]>([]);
  const [columnsData, setColumnsData] = useState<dataArray[]>([]);
  const [apiURL, setApiURL] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const handleAddColumn = () => {
    setDisplayTable(false);
    setColumnId((prevCount) => prevCount + 1);
    setColumnKeys((prevKeys) => [...prevKeys, columnId]);
    setColumnsData((prevData) => [
      ...prevData,
      { columnId, label: "", type: "", key: "" },
    ]);
  };

  const handleDeleteColumn = (columnId: number) => {
    setColumnKeys((prevKeys) => prevKeys.filter((key) => key !== columnId));
    setColumnsData((prevData) =>
      prevData.filter((data) => data.columnId !== columnId)
    );
  };

  const handleSetColumnData = (columnData: dataArray) => {
    setDisplayTable(false);
    setColumnsData((prevData) =>
      prevData.map((data) =>
        data.columnId === columnData.columnId ? columnData : data
      )
    );
  };
  useEffect(() => {
    setConfigurationData(columnsData);
  }, [columnsData, setConfigurationData]);
  const renderColumnsForms = () => {
    const columnsForms = [];
    for (let i = 0; i < columnKeys.length; i++) {
      let key = columnKeys[i];
      columnsForms.push(
        <ColumnsForm
          key={key}
          columnId={key}
          onDeleteColumn={handleDeleteColumn}
          onChangeColumn={handleSetColumnData}
          setDisplayTable={setDisplayTable}
        />
      );
    }
    return columnsForms;
  };
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const handleSetConfigurations = async () => {
    const isEmptyColumnData = columnsData.some(
      (data) => data.label === "" || data.type === "" || data.key === ""
    );

    if (isEmptyColumnData || apiURL.trim() === "" || !urlRegex.test(apiURL)) {
        console.log("hello what")
      setErrorVisible(true);
      return;
    }
    try {
        const fetchedData = await FetchAPIData({ APIURL: apiURL, columns: columnsData });
        setFetchedData(fetchedData);
        setDisplayTable(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
  };

  useEffect(() => {
    if (errorVisible) {
      if (!urlRegex.test(apiURL)) {
        notification.info({
          message: "Error",
          description: "Please enter valid API URL",
          placement: "topRight",
        });
      } else {
        notification.info({
          message: "Error",
          description: "Please enter all the required fields",
          placement: "topRight",
        });
      }

      setErrorVisible(false);
    }
  }, [errorVisible]);
  const selectOptions = [
    { value: "", label: "Select" }, 
    ...columnsData
      .filter((data) => data.type && data.key && data.label)
      .map((data) => ({ value: data.key, label: data.key })),
  ];
  
  return (
    <>
      <Row justify="center" align="middle" style={{ marginBottom: "10px" }}>
        <Col span={4}>
          <span> * Enter API URL: </span>
        </Col>
        <Col span={20}>
          <Input
            placeholder="API URL"
            required
            onChange={(e) => setApiURL(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button type="primary" onClick={handleAddColumn}>
            Add Column
          </Button>
        </Col>
      </Row>
      {renderColumnsForms()}

      {columnKeys.length > 0 && (
        <>
          <Row justify="center" align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <span> Title: </span>
            </Col>
            <Col span={16}>
              <Select
                placeholder="Select Title"
                style={{ width: "100%" }}
                options={selectOptions}
                onChange={(value) => setTitle(value)}
              />
            </Col>
          </Row>
          <Row justify="center" align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <span>Subtitle: </span>
            </Col>
            <Col span={16}>
              <Select
                placeholder="Select Subtitle"
                style={{ width: "100%" }}
                options={selectOptions}
                onChange={(value) => setSubtitle(value)}
              />
            </Col>
          </Row>

          <Button type="primary" onClick={handleSetConfigurations}>
            Set Configurations
          </Button>
        </>
      )}
    </>
  );
};

export default AddColumns;
