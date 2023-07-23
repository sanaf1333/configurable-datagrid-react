import React, { useState } from "react";
import { Table, List } from "antd";
import { dataArray } from "../types/data-array";
import { DatagridWidgetComponentProps } from "../types/datagrid-widget-type";

const DatagridWidgetComponent: React.FC<DatagridWidgetComponentProps> = ({
  columns,
  data,
  isSmallScreen,
  configurationData,
  title,
  subtitle,
}) => {
  const [sortedInfo, setSortedInfo] = useState<any>({});

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };

  const sortedData = React.useMemo(() => {
    if (!sortedInfo.columnKey || !sortedInfo.order) {
      return data;
    }

    const column = columns.find(
      (col) => col.dataIndex === sortedInfo.columnKey
    );
    if (!column) {
      return data;
    }

    const { dataIndex } = column;
    const compareFunction = (a: any, b: any) => {
      const aValue = a[dataIndex];
      const bValue = b[dataIndex];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue);
      }

      return aValue - bValue;
    };

    const sortedData = [...data].sort((a, b) => {
      if (sortedInfo.order === "ascend") {
        return compareFunction(a, b);
      } else {
        return compareFunction(b, a);
      }
    });

    return sortedData;
  }, [data, sortedInfo, columns]);

  if (isSmallScreen) {
    const dataList = sortedData.map((item, index) => ({
      title: item[title || configurationData[0]?.key],
      subtitle:
        item[
          subtitle
            ? subtitle
            : configurationData[1]
            ? configurationData[1].key
            : configurationData[0].key
        ],
      key: index,
    }));

    return (
      <List
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item key={item.key}>
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
        dataSource={sortedData}
        scroll={{ x: "max-content" }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default DatagridWidgetComponent;
