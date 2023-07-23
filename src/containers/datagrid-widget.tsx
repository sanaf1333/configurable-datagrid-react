import React, { useState, useEffect } from "react";
import DatagridWidgetComponent from "../components/datagrid-widget";
import { DatagridWidgetProps } from "../types/datagrid-widget-type";

const DatagridWidget: React.FC<DatagridWidgetProps> = ({
  fetchedData,
  configurationData,
  title,
  subtitle,
}) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Filter out the keys that are present in fetchedData
    const keysPresentInFetchedData = configurationData.filter((config) => {
      const { key } = config;
      return fetchedData.hasOwnProperty(key);
    });

    // Process configurationData to create columns for the table
    const tableColumns = keysPresentInFetchedData.map((config) => ({
      title: config.label,
      dataIndex: config.key,
      key: config.key,
      sorter: true,
    }));
    setColumns(tableColumns);
    // Process fetchedData to set data for the table
    const tableData: any[] = [];
    const dataLength =
      fetchedData[keysPresentInFetchedData[0]?.key]?.length || 0;
    for (let i = 0; i < dataLength; i++) {
      const rowData: any = {};
      keysPresentInFetchedData.forEach((config) => {
        const { key } = config;
        if (fetchedData[key]?.[i]) {
          rowData[key] = fetchedData[key][i];
        } else {
          // Handle missing data for the key 
          rowData[key] = ""; 
        }
      });
      tableData.push(rowData);
    }
    setData(tableData);
  }, [fetchedData, configurationData]);

  return (
    <DatagridWidgetComponent
      columns={columns}
      data={data}
      isSmallScreen={isSmallScreen}
      configurationData={configurationData}
      title={title}
      subtitle={subtitle}
    />
  );
};

export default DatagridWidget;
