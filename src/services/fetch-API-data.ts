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
    const missingKeys: string[] = [];

    columns.forEach(({ key, type }) => {
      const jsonPathQuery = `$..${key}`; // JSONPath query for extracting data based on the key
      const extractedData = JSONPath({ json: data, path: jsonPathQuery });

      if (
        extractedData === null ||
        (Array.isArray(extractedData) && extractedData.length === 0)
      ) {
        missingKeys.push(key); // Store the key in the array if it is missing from the fetched data
      } else {
        // Check if the data types match
        const isDataTypeMatch =
          Array.isArray(extractedData) &&
          extractedData.every((value: string) => typeof value === type);
        if (!isDataTypeMatch) {
          mismatchedDataTypes.push(key); // Store the key in the array if there is a type mismatch
        }
        processedData[key] = extractedData;
      }
    });

    // Display the error message if there are type mismatch errors
    if (mismatchedDataTypes.length > 0) {
      const errorMessage = `${
        mismatchedDataTypes.length
      } type mismatch error(s) found for keys: ${mismatchedDataTypes.join(
        ", "
      )}. Please check the data types.`;
      message.error(errorMessage);
    }

    // Display the error message for missing keys
    if (missingKeys.length > 0) {
      const errorMessage = `The following keys are missing in the fetched data: ${missingKeys.join(
        ", "
      )}. Please check the keys in the configuration.`;
      message.error(errorMessage);
    }

    return processedData; // Return the processed data
  } catch (error) {
    console.error("Error fetching data:", error);
    message.error(`There was an error fetching data`);
    throw error;
  }
};

export default FetchAPIData;
