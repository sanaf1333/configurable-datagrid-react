import { dataArray } from "./data-array";

export interface ConfigurationModalFormProps {
  setFetchedData: (data: Record<string, any[]>) => void;
  setConfigurationData: (data: dataArray[]) => void;
  setTitle: (value: string) => void;
  setSubtitle: (value: string) => void;
  setDisplayTable: (value: boolean) => void;
}

export interface ConfigurationModalFormComponentProps {
  setApiURL: (value: string) => void;
  setTitle: (value: string) => void;
  setSubtitle: (value: string) => void;
  handleAddColumn: () => void;
  renderConfigurationRows: () => void;
  columnKeys: number[];
  selectOptions: any;
  handleSetConfigurations: () => void;
}
