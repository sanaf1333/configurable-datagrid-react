import React, {useState} from "react";
import { Collapse } from "antd";
import ConfigurationModalForm from "../containers/configuration-modal-form";
import { dataArray } from "../types/data-array";
import DatagridWidget from "../containers/datagrid-widget";

const ConfigurationDatagridWidget = () => {
    const [fetchedData, setFetchedData]= useState<Record<string, any[]>>({});
    const [configurationData, setConfigurationData]= useState<dataArray[]>([]);
    const [title, setTitle]= useState("");
    const [subtitle, setSubtitle]= useState("");
    const [displayTable, setDisplayTable]= useState(false);
  return (
    <div>
      <Collapse
        size="large"
        items={[
          {
            key: "1",
            label: "This is large size panel header",
            children: <ConfigurationModalForm setFetchedData={setFetchedData} setConfigurationData={setConfigurationData}
            setTitle={setTitle} setSubtitle={setSubtitle} setDisplayTable={setDisplayTable} />,
          },
        ]}
      />
      {displayTable && 
      <DatagridWidget fetchedData={fetchedData} configurationData={configurationData} title={title} subtitle={subtitle} />
      }
      </div>
  );
};

export default ConfigurationDatagridWidget;
