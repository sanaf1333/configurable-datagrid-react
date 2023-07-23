import { dataArray } from "./data-array";

export interface DatagridWidgetProps {
  fetchedData: any;
  configurationData: dataArray[];
  title: string;
  subtitle: string;
}

export interface DatagridWidgetComponentProps {
  columns: any[];
  data: any[];
  isSmallScreen: boolean;
  configurationData: dataArray[];
  title: string;
  subtitle: string;
}
