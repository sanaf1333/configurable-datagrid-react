import React from "react";
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
  

  if (isSmallScreen) {
    const dataList = data.map((item, index) => ({
      title: item[title || configurationData[0]?.key],
      subtitle:
        item[
          subtitle || configurationData[1]
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
        dataSource={data}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default DatagridWidgetComponent;
