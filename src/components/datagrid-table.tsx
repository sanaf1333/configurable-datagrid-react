import React, { useState, useEffect } from "react";
import { Table, List } from "antd";
import { dataArray } from "../types/data-array";

interface DatagridTableProps {
  fetchedData: any;
  configurationData: dataArray[];
  title: string;
  subtitle: string;
}

const DatagridTable: React.FC<DatagridTableProps> = ({
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


  if (isSmallScreen) {
    const dataList = data.map((item) => ({
      title: item[title || configurationData[0]?.key],
      subtitle:
        item[
          subtitle || configurationData[1]
            ? configurationData[1].key
            : configurationData[0].key
        ],
    }));

    return (
      <List
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.subtitle} />
          </List.Item>
        )}
      />
    );
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default DatagridTable;
