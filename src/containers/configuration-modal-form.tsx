import React, { useState, useEffect } from "react";
import { notification } from "antd";
import ConfigurationDataRow from "./configuration-data-row";
import { dataArray } from "../types/data-array";
import FetchAPIData from "../services/fetch-API-data";
import ConfigurationModalFormComponent from "../components/configuration-modal-form";
import { ConfigurationModalFormProps } from "../types/configuration-modal-form-type";

const ConfigurationModalForm: React.FC<ConfigurationModalFormProps> = ({
  setFetchedData,
  setConfigurationData,
  setTitle,
  setSubtitle,
  setDisplayTable,
}) => {
  const [columnId, setColumnId] = useState(0);
  const [columnKeys, setColumnKeys] = useState<number[]>([]);
  const [columnsData, setColumnsData] = useState<dataArray[]>([]);
  const [apiURL, setApiURL] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading]= useState(false);
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

  const renderConfigurationRows = () => {
    const columnsForms = [];
    for (let i = 0; i < columnKeys.length; i++) {
      let key = columnKeys[i];
      columnsForms.push(
        <ConfigurationDataRow
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
      setErrorVisible(true);
      return;
    }
    try {
      setIsLoading(true);
      const fetchedData = await FetchAPIData({
        APIURL: apiURL,
        columns: columnsData,
      });
      setFetchedData(fetchedData);
      setDisplayTable(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
      setIsLoading(false);
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
    { value: "", label: "Not selected/Default" },
    ...columnsData
      .filter((data) => data.type && data.key && data.label)
      .map((data) => ({ value: data.key, label: data.key })),
  ];

  return (
    <ConfigurationModalFormComponent
      setApiURL={setApiURL}
      setTitle={setTitle}
      setSubtitle={setSubtitle}
      handleAddColumn={handleAddColumn}
      renderConfigurationRows={renderConfigurationRows}
      columnKeys={columnKeys}
      selectOptions={selectOptions}
      handleSetConfigurations={handleSetConfigurations}
      isLoading={isLoading}
    />
  );
};

export default ConfigurationModalForm;
