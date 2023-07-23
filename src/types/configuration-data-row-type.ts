import { dataArray } from "./data-array";
import { FormInstance } from "antd/lib/form";
export interface ConfigurationDataRowProps {
    columnId: number;
    onDeleteColumn: (id: number) => void;
    onChangeColumn: (value: dataArray) => void;
    setDisplayTable: (value: boolean) => void;
  }

export interface ConfigurationDataRowComponentProps {
    columnId: number;
    form: FormInstance;
    handleLabelChange: (value: string) => void;
    handleTypeChange: (value: string) => void;
    handleKeyChange: (value: string) => void;
    onReset: () => void;
    handleDelete: () => void;
  }