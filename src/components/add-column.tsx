// AddColumns component
import React, { useState } from "react";
import { Button } from "antd";
import ColumnsForm from "./form";
import { dataArray } from "../types/data-array";
const AddColumns = () => {
  const [columnId, setColumnId] = useState(0);
  const [columnKeys, setColumnKeys] = useState<number[]>([]);
  const [columnsData, setColumnsData] = useState<dataArray[]>([]);
  console.log(columnsData)
  const handleAddColumn = () => {
    setColumnId((prevCount) => prevCount + 1);
    setColumnKeys((prevKeys) => [...prevKeys, columnId]);
    setColumnsData((prevData) => [...prevData, { columnId, label: "", type: "", key: "" }]);
  };

  const handleDeleteColumn = (columnId: number) => {
    setColumnKeys((prevKeys) => prevKeys.filter((key) => key !== columnId));
    setColumnsData((prevData) => prevData.filter((data) => data.columnId !== columnId));
  };

  const handleSetColumnData = (columnData: dataArray) => {
    setColumnsData((prevData) =>
      prevData.map((data) => (data.columnId === columnData.columnId ? columnData : data))
    );
  };

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
        />
      );
    }
    return columnsForms;
  };

  const handleSetConfigurations = () => {};

  return (
    <div>
      <Button type="primary" onClick={handleAddColumn}>
        Add Column
      </Button>
      {renderColumnsForms()}

      {columnKeys.length > 0 && <Button type="primary" onClick={handleSetConfigurations}>
        Set Configurations
      </Button>}
    </div>
  );
};

export default AddColumns;
