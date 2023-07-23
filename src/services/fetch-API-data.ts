import { JSONPath } from "jsonpath-plus";
import axios from "axios";
import { dataArray } from "../types/data-array";
import { message } from "antd";

interface FetchAPIDataProps {
  APIURL: string;
  columns: dataArray[];
}

const FetchAPIData = async ({ APIURL, columns }: FetchAPIDataProps) => {
  try {
    const response = await axios.get(APIURL);
    const data = response.data;
    const processedData: Record<string, any[]> = {};
    const mismatchedDataTypes: string[] = [];
    const mismatchedKeys: string[] = [];

    columns.forEach(({ key, type }) => {
      const jsonPathQuery = `$..${key}`;
      const extractedData = JSONPath({ json: data, path: jsonPathQuery });

      if (
        extractedData === null ||
        (Array.isArray(extractedData) && extractedData.length === 0)
      ) {
        mismatchedKeys.push(key);
      } else {
        const isDataTypeMatch =
          Array.isArray(extractedData) &&
          extractedData.every((value: string) => typeof value === type);
        if (!isDataTypeMatch) {
          mismatchedDataTypes.push(key);
        }
        processedData[key] = extractedData;
      }
    });

    if (mismatchedDataTypes.length > 0) {
      const errorMessage = `${
        mismatchedDataTypes.length
      } type mismatch error(s) found for keys: ${mismatchedDataTypes.join(
        ", "
      )}. Please check the data types.`;
      message.error(errorMessage);
    }

    if (mismatchedKeys.length > 0) {
      const errorMessage = `The following keys are missing in the fetched data: ${mismatchedKeys.join(
        ", "
      )}. Please check the keys in the configuration.`;
      message.error(errorMessage);
    }

    return processedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    message.error(`There was an error fetching data`);
    throw error;
  }
};

export default FetchAPIData;
