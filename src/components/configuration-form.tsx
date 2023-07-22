import React, {useState} from "react";
import { Collapse } from "antd";
import AddColumns from "./add-column";
import { dataArray } from "../types/data-array";
import DatagridTable from "./datagrid-table";

const ConfigurationForm = () => {
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
            children: <AddColumns setFetchedData={setFetchedData} setConfigurationData={setConfigurationData}
            setTitle={setTitle} setSubtitle={setSubtitle} setDisplayTable={setDisplayTable} />,
          },
        ]}
      />
      {displayTable && 
      <DatagridTable fetchedData={fetchedData} configurationData={configurationData} title={title} subtitle={subtitle} />
      }
      </div>
  );
};

export default ConfigurationForm;
