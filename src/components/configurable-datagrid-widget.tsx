import React, { useState } from "react";
import { Collapse } from "antd";
import ConfigurationModalForm from "../containers/configuration-modal-form";
import { dataArray } from "../types/data-array";
import DatagridWidget from "../containers/datagrid-widget";
import '../styles/configurable-datagrid-widget.css';

const ConfigurationDatagridWidget = () => {
  const [fetchedData, setFetchedData] = useState<Record<string, any[]>>({});
  const [configurationData, setConfigurationData] = useState<dataArray[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [displayTable, setDisplayTable] = useState(false);
  const [activeKey, setActiveKey] = useState<string | string[]>(["1"]); 
  const handleCollapseChange = (keys: string | string[]) => {
    setActiveKey(keys);
  };
  return (
    <div>
      <Collapse
        size="large"
        className='collapseHeader'
        activeKey={activeKey}
        onChange={handleCollapseChange}
        items={[
          {
            key: "1",
            label: <span className='collapseHeaderText'>Set Datagrid Configurations</span>,
            children: (
              <ConfigurationModalForm
                setFetchedData={setFetchedData}
                setConfigurationData={setConfigurationData}
                setTitle={setTitle}
                setSubtitle={setSubtitle}
                setDisplayTable={setDisplayTable}
              />
            ),
          },
        ]}
      />
      {displayTable && (
        <DatagridWidget
          fetchedData={fetchedData}
          configurationData={configurationData}
          title={title}
          subtitle={subtitle}
        />
      )}
    </div>
  );
};

export default ConfigurationDatagridWidget;
