import React, { useState, useEffect } from "react";
import { dataArray } from "../types/data-array";
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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Process configurationData to create columns for the table
    const tableColumns = configurationData.map((config) => ({
      title: config.label,
      dataIndex: config.key,
      key: config.key,
    }));
    setColumns(tableColumns);

    // Process fetchedData to set data for the table
    const tableData: any[] = [];
    const dataLength = fetchedData[configurationData[0]?.key]?.length || 0;
    for (let i = 0; i < dataLength; i++) {
      const rowData: any = {};
      configurationData.forEach((config) => {
        const { key } = config;
        rowData[key] = fetchedData[key][i];
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